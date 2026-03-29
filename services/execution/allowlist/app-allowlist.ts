export interface AllowedApplication {
  appId: string;
  binary: string;
  args: string[];
}

const ALLOWED_APPLICATIONS: Record<string, AllowedApplication> = {
  spotify: {
    appId: "spotify",
    binary: "spotify",
    args: [],
  },
};

export function resolveAllowedApplication(appId: string): AllowedApplication | null {
  const normalizedAppId = appId.trim().toLowerCase();

  if (!normalizedAppId) {
    return null;
  }

  return ALLOWED_APPLICATIONS[normalizedAppId] ?? null;
}
