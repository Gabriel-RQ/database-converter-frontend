// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  type EMigrationStatus = "pending" | "processing" | "done";

  type JdbcConnectionConfig = {
    name: string;
    jdbcUrl: string;
    username: string;
    password: string;
    driverClassName: string;
  };

  type StartMigrationRequest = {
    name: string;
    target: string;
    originConfig: JdbcConnectionConfig;
    targetConfig: JdbcConnectionConfig;
  };

  type ScriptFileInfo = {
    filename: string;
    content: string;
  };

  type UpdateScriptRequest = ScriptFileInfo[];

  type EEtlStep =
    | "START"
    | "EXTRACTION_IN_PROGRESS"
    | "EXTRACTION_FINISHED"
    | "TRANSFORMATION_IN_PROGRESS"
    | "TRANSFORMATION_FINISHED"
    | "WAITING_FOR_LOAD_CONFIRMATION"
    | "LOAD_IN_PROGRESS"
    | "LOAD_FINISHED"
    | "VALIDATION_IN_PROGRESS"
    | "FINISHED"
    | "ERROR";

  type MigrationStatusResponse = {
    id: string;
    name: string;
    step: EEtlStep;
    message: string;
    startedAt: string;
    finishedAt?: string;
    lastUpdatedAt?: string;
  };

  type SqlPageResponse = {
    page: number;
    size: number;
    total: number;
    files: ScriptFileInfo[];
  };

  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
