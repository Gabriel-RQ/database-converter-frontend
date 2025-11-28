export function getMigrationStepMessage(step: EEtlStep, message?: string) {
  switch (step) {
    case "START":
      return "Iniciando migração...";
    case "EXTRACTION_IN_PROGRESS":
      return "Executando extração...";
    case "EXTRACTION_FINISHED":
      return "Extração finalizada";
    case "TRANSFORMATION_IN_PROGRESS":
      return "Executando transformação...";
    case "TRANSFORMATION_FINISHED":
      return "Transformação finalizada";
    case "WAITING_FOR_LOAD_CONFIRMATION":
      return "Aguardando confirmação do usuário para iniciar carga...";
    case "LOAD_IN_PROGRESS":
      return "Executando carga...";
    case "LOAD_FINISHED":
      return "Carga finalizada...";
    case "VALIDATION_IN_PROGRESS":
      return "Executando validação...";
    case "FINISHED":
      return `Migração finalizada${message ? ". Detalhes: " + message : ""}`;
    case "ERROR":
      return `Erro no processo de migração. Detalhes:\n${message}`;
  }
}

export function parseMigrationLog(status: MigrationStatusResponse) {
  const d = new Date(status.lastUpdatedAt as string).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  return `${d} - ${getMigrationStepMessage(status.step, status.message)}`;
}

export function parseMigrationStatusDescription(
  step: EEtlStep
): EMigrationStatus {
  switch (step) {
    case "START":
      return "pending";
    case "WAITING_FOR_LOAD_CONFIRMATION":
      return "confirmation";
    case "EXTRACTION_IN_PROGRESS":
    case "EXTRACTION_FINISHED":
    case "TRANSFORMATION_IN_PROGRESS":
    case "TRANSFORMATION_FINISHED":
    case "LOAD_IN_PROGRESS":
    case "LOAD_FINISHED":
    case "VALIDATION_IN_PROGRESS":
      return "processing";
    case "FINISHED":
      return "done";
    case "ERROR":
      return "error";
  }
}

export function getSgbdDefaults(sgbd: string) {
  switch (sgbd) {
    case "POSTGRES":
      return {
        user: "postgres",
        password: "",
        host: "localhost",
        port: 5432,
      };
    case "FIREBIRD":
      return {
        user: "SYSDBA",
        password: "masterkey",
        host: "localhost",
        port: null,
      };
    default:
      return {
        user: "",
        password: "",
        host: "",
        port: null,
      };
  }
}
