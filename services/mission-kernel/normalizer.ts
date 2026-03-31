export interface NormalizedMissionInput {
  rawInput: string;
  normalizedInput: string;
  intent: string;
  entities: string[];
}

function stripTerminalPunctuation(input: string): string {
  return input.replace(/[?!.,;:]+$/g, "");
}

function collapseWhitespace(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}

function extractActionEntity(input: string): string[] {
  if (input === "abre spotify" || input === "open spotify" || input === "launch spotify") {
    return ["spotify"];
  }

  return [];
}

export function normalizeMissionInput(input: string): NormalizedMissionInput {
  const rawInput = input;
  const normalizedInput = stripTerminalPunctuation(collapseWhitespace(input).toLowerCase());

  if (normalizedInput === "ping") {
    return {
      rawInput,
      normalizedInput,
      intent: "ping",
      entities: [],
    };
  }

  if (
    normalizedInput === "que puedes hacer" ||
    normalizedInput === "qué puedes hacer" ||
    normalizedInput === "what can you do" ||
    normalizedInput === "help"
  ) {
    return {
      rawInput,
      normalizedInput,
      intent: "describe_capabilities",
      entities: [],
    };
  }

  if (
    normalizedInput === "abre spotify" ||
    normalizedInput === "open spotify" ||
    normalizedInput === "launch spotify"
  ) {
    return {
      rawInput,
      normalizedInput,
      intent: "open_application",
      entities: extractActionEntity(normalizedInput),
    };
  }

  return {
    rawInput,
    normalizedInput,
    intent: "unknown",
    entities: [],
  };
}
