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

  type StartMigrationRequest = { name: string };

  type StartExtractionRequest = {
    id: string;
    originConfig: JdbcConnectionConfig;
  };

  type StartTransformationRequest = {
    id: string;
    target: string;
  };

  type StartLoadRequest = {
    id: string;
    targetConfig: JdbcConnectionConfig;
  };

  type StartValidationRequest = StartExtractionRequest & StartLoadRequest;

  type ScriptFileInfo = {
    filename: string;
    content: string;
  };

  type UpdateScriptRequest = ScriptFileInfo[];

  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
