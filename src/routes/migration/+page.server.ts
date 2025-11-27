import { getDriverClassName, getJdbcUrl } from "$lib/util";
import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { startMigration } from "$lib/api";

export const actions: Actions = {
  default: async ({ request, fetch }) => {
    const data = Object.fromEntries(await request.formData()) as any;

    const requestObject = {
      name: data.migrationIdentifier,
      target: data.targetSgbd,
      originConfig: {
        name: data.originDbname,
        password: data.originDbpassword,
        username: data.originDbuser,
        driverClassName: getDriverClassName(data.originSgbd),
        jdbcUrl: getJdbcUrl(
          data.originSgbd,
          data.originDbhost,
          data.originDbport,
          data.originDbname
        ),
      },
      targetConfig: {
        name: data.targetDbname,
        password: data.targetDbpassword,
        username: data.targetDbuser,
        driverClassName: getDriverClassName(data.targetSgbd),
        jdbcUrl: getJdbcUrl(
          data.targetSgbd,
          data.targetDbhost,
          data.targetDbport,
          data.targetDbname
        ),
      },
    } as StartMigrationRequest;

    let response;
    try {
      response = await startMigration(fetch, requestObject);
    } catch (err) {
      error(500, (err as Error).message);
    }

    redirect(302, `/migration/${response.id}`);
  },
};
