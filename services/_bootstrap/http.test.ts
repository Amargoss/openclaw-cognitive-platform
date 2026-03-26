import { describe, expect, it } from "vitest";
import { createBootstrapHttpServer } from "./http.js";

describe("services/_bootstrap/http", () => {
  it("serves healthz and readyz", async () => {
    const server = createBootstrapHttpServer({
      getReadyState: () => ({
        ready: true,
        checks: { config: true, logging: true, db: true },
        errors: [],
      }),
    });
    const requestListener = server.listeners("request")[0] as (
      req: { url?: string },
      res: {
        statusCode: number;
        setHeader: (name: string, value: string) => void;
        end: (body?: string) => void;
      },
    ) => void;

    const results: Array<{ statusCode: number; body: string }> = [];
    const invoke = (url: string) => {
      let body = "";
      const response = {
        statusCode: 0,
        setHeader: () => {},
        end: (value?: string) => {
          body = value ?? "";
          results.push({ statusCode: response.statusCode, body });
        },
      };
      requestListener({ url }, response);
    };

    invoke("/healthz");
    invoke("/readyz");

    expect(results[0]).toMatchObject({ statusCode: 200 });
    expect(results[1]).toMatchObject({ statusCode: 200 });
    expect(JSON.parse(results[0].body) as { ok: boolean }).toMatchObject({ ok: true });
    expect(JSON.parse(results[1].body) as { ok: boolean }).toMatchObject({ ok: true });
  });
});
