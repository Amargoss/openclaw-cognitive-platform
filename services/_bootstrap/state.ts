export type BootstrapChecks = {
  config: boolean;
  logging: boolean;
  db: boolean;
};

export type BootstrapStateSnapshot = {
  startedAt: string;
  checks: BootstrapChecks;
  ready: boolean;
  errors: string[];
};

export function createBootstrapState() {
  const state: BootstrapStateSnapshot = {
    startedAt: new Date().toISOString(),
    checks: {
      config: false,
      logging: false,
      db: false,
    },
    ready: false,
    errors: [],
  };

  function recomputeReady() {
    state.ready =
      state.checks.config && state.checks.logging && state.checks.db && state.errors.length === 0;
  }

  return {
    markCheck(name: keyof BootstrapChecks) {
      state.checks[name] = true;
      recomputeReady();
    },
    addError(message: string) {
      state.errors.push(message);
      recomputeReady();
    },
    snapshot(): BootstrapStateSnapshot {
      return {
        startedAt: state.startedAt,
        checks: { ...state.checks },
        ready: state.ready,
        errors: [...state.errors],
      };
    },
  };
}
