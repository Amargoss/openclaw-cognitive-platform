import { z } from "zod";

const timestampSchema = z.string().min(1);

export const MissionAnalyzeRequestSchema = z.object({
  requestId: z.string(),
  source: z.string(),
  input: z.string(),
  requestedAt: timestampSchema,
});

export const MissionSpecSchema = z.object({
  missionId: z.string(),
  type: z.enum(["ping", "info", "action", "unknown"]),
  intent: z.string(),
  entities: z.array(z.string()),
  confidence: z.number(),
  title: z.string(),
  objective: z.string(),
  constraints: z.array(z.string()),
  normalizedAt: timestampSchema,
});

export const ExecutionPlanStepSchema = z.object({
  stepId: z.string(),
  title: z.string(),
  kind: z.enum(["respond", "inform", "identify-target", "prepare-action"]),
  description: z.string(),
  status: z.literal("pending"),
  target: z
    .object({
      type: z.literal("application"),
      appId: z.string().min(1),
    })
    .optional(),
});

export const ExecutionPlanSchema = z.object({
  planId: z.string(),
  missionId: z.string(),
  planType: MissionSpecSchema.shape.type,
  intent: z.string(),
  steps: z.array(ExecutionPlanStepSchema),
  confidence: z.number(),
  createdAt: timestampSchema,
});

export function createResponseEnvelopeSchema<TData extends z.ZodTypeAny>(dataSchema: TData) {
  return z
    .object({
      requestId: z.string(),
      ok: z.boolean(),
      data: z.unknown().nullable(),
      error: z.string().nullable(),
      timestamp: timestampSchema,
    })
    .superRefine((value, ctx) => {
      if (value.ok) {
        if (value.data === null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["data"],
            message: "ok envelopes require data",
          });
        }
        if (value.error !== null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["error"],
            message: "ok envelopes must not carry an error",
          });
        }
        if (value.data !== null) {
          const parsed = dataSchema.safeParse(value.data);
          if (!parsed.success) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["data"],
              message: "ok envelopes require data matching the contract schema",
            });
          }
        }
        return;
      }

      if (value.error === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["error"],
          message: "non-ok envelopes require an error",
        });
      }
    });
}

export const MissionSpecResponseEnvelopeSchema = createResponseEnvelopeSchema(MissionSpecSchema);
