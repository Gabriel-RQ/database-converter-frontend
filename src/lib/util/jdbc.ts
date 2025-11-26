const DRIVER_CLASS = {
  POSTGRES: "org.postgresql.Driver",
  FIREBIRD: "org.firebirdsql.jdbc.FBDriver",
} as const;

export function getDriverClassName(sgbd: string) {
  const driver = DRIVER_CLASS[sgbd as keyof typeof DRIVER_CLASS];
  if (!driver) throw new Error(`SGBD não suportado: ${sgbd}`);
  return driver;
}

const SUBPROTOCOL = {
  POSTGRES: "postgresql",
  FIREBIRD: "firebirdsql",
} as const;

export function getJdbcUrl(
  sgbd: string,
  host: string,
  port: string,
  name: string
) {
  const proto = SUBPROTOCOL[sgbd as keyof typeof SUBPROTOCOL];
  if (!proto) throw new Error(`SGBD não suportado: ${sgbd}`);

  const portValue = port ? `:${port}` : "";
  return `jdbc:${proto}://${host}${portValue}/${name}`;
}
