export const missionErrorCodes = ["INVALID_MISSION", "UNKNOWN_MISSION"] as const;

export type MissionErrorCode = (typeof missionErrorCodes)[number];

export interface Mission {
  id: string;
  type: string;
  payload?: Record<string, unknown>;
}

export interface MissionError {
  code: MissionErrorCode;
  message: string;
}

export interface MissionResult {
  missionId: string;
  type: string;
  ok: boolean;
  data: Record<string, unknown> | null;
  error: MissionError | null;
}
