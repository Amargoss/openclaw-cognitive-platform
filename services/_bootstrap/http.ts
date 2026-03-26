import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import type { ResponseEnvelope } from "../../shared/contracts/index.js";

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

export function createBootstrapHttpServer(params: {
  getReadyState: () => { ready: boolean; checks: Record<string, boolean>; errors: string[] };
}): Server {
  return createServer((req: IncomingMessage, res: ServerResponse) => {
    const pathname = req.url ?? "/";
    if (pathname === "/health" || pathname === "/healthz") {
      const body: ResponseEnvelope<{ status: "ok" }> = {
        ok: true,
        data: { status: "ok" },
        error: null,
        timestamp: new Date().toISOString(),
      };
      writeJson(res, 200, body);
      return;
    }
    if (pathname === "/ready" || pathname === "/readyz") {
      const snapshot = params.getReadyState();
      const body: ResponseEnvelope<ReadinessPayload> = snapshot.ready
        ? {
            ok: true,
            data: { status: "ok", checks: snapshot.checks },
            error: null,
            timestamp: new Date().toISOString(),
          }
        : {
            ok: false,
            data: {
              status: "not-ready",
              checks: snapshot.checks,
              errors: snapshot.errors,
            },
            error: "bootstrap-not-ready",
            timestamp: new Date().toISOString(),
          };
      writeJson(res, snapshot.ready ? 200 : 503, body);
      return;
    }

    res.statusCode = 404;
    res.end("not found");
  });
}
