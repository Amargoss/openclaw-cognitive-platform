import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import type { ResponseEnvelope } from "../../shared/contracts/index.js";
import {
  MissionAnalyzeRequestSchema,
  MissionSpecResponseEnvelopeSchema,
} from "../../shared/contracts/index.js";
import type { MissionAnalyzerPort } from "./ports/mission-analyzer.js";

type ReadinessPayload = {
  status: "ok" | "not-ready";
  checks?: Record<string, boolean>;
  errors?: string[];
};

function writeJson(res: ServerResponse, statusCode: number, body: unknown) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function writeEnvelope<T>(res: ServerResponse, statusCode: number, body: ResponseEnvelope<T>) {
  writeJson(res, statusCode, body);
}

function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk: string) => {
      body += chunk;
    });
    req.on("end", () => {
      resolve(body);
    });
    req.on("error", reject);
  });
}

function resolveRequestIdCandidate(value: unknown): string {
  if (
    value &&
    typeof value === "object" &&
    "requestId" in value &&
    typeof (value as { requestId?: unknown }).requestId === "string"
  ) {
    return (value as { requestId: string }).requestId;
  }
  return "bootstrap-invalid-request";
}

export function createBootstrapHttpServer(params: {
  getReadyState: () => { ready: boolean; checks: Record<string, boolean>; errors: string[] };
  missionAnalyzer: MissionAnalyzerPort;
}): Server {
  return createServer((req: IncomingMessage, res: ServerResponse) => {
    void (async () => {
      const pathname = req.url ?? "/";
      if (pathname === "/health" || pathname === "/healthz") {
        const body: ResponseEnvelope<{ status: "ok" }> = {
          requestId: "bootstrap-health",
          ok: true,
          data: { status: "ok" },
          error: null,
          timestamp: new Date().toISOString(),
        };
        writeEnvelope(res, 200, body);
        return;
      }
      if (pathname === "/ready" || pathname === "/readyz") {
        const snapshot = params.getReadyState();
        const body: ResponseEnvelope<ReadinessPayload> = snapshot.ready
          ? {
              requestId: "bootstrap-ready",
              ok: true,
              data: { status: "ok", checks: snapshot.checks },
              error: null,
              timestamp: new Date().toISOString(),
            }
          : {
              requestId: "bootstrap-ready",
              ok: false,
              data: {
                status: "not-ready",
                checks: snapshot.checks,
                errors: snapshot.errors,
              },
              error: "bootstrap-not-ready",
              timestamp: new Date().toISOString(),
            };
        writeEnvelope(res, snapshot.ready ? 200 : 503, body);
        return;
      }

      if (pathname === "/missions/analyze" && req.method === "POST") {
        const rawBody = await readRequestBody(req);
        let parsedBody: unknown;

        try {
          parsedBody = JSON.parse(rawBody);
        } catch {
          writeEnvelope(res, 400, {
            requestId: "bootstrap-invalid-json",
            ok: false,
            data: null,
            error: "invalid-json",
            timestamp: new Date().toISOString(),
          });
          return;
        }

        const requestValidation = MissionAnalyzeRequestSchema.safeParse(parsedBody);
        if (!requestValidation.success) {
          const requestId = resolveRequestIdCandidate(parsedBody);

          writeEnvelope(res, 400, {
            requestId,
            ok: false,
            data: null,
            error: "invalid-mission-request",
            timestamp: new Date().toISOString(),
          });
          return;
        }

        const result = params.missionAnalyzer.analyzeMissionRequest(requestValidation.data);
        const responseValidation = MissionSpecResponseEnvelopeSchema.safeParse(result);
        if (!responseValidation.success) {
          writeEnvelope(res, 500, {
            requestId: requestValidation.data.requestId,
            ok: false,
            data: null,
            error: "bootstrap-internal-error",
            timestamp: new Date().toISOString(),
          });
          return;
        }

        writeEnvelope(res, responseValidation.data.ok ? 200 : 422, responseValidation.data);
        return;
      }

      res.statusCode = 404;
      res.end("not found");
    })().catch(() => {
      writeEnvelope(res, 500, {
        requestId: "bootstrap-internal-error",
        ok: false,
        data: null,
        error: "bootstrap-internal-error",
        timestamp: new Date().toISOString(),
      });
    });
  });
}
