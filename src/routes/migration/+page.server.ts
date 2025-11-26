import { getDriverClassName, getJdbcUrl } from "$lib/util";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request }) => {
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

    redirect(302, "/migration/7770c93e-046d-4186-af1b-e17750c8d669");
  },
};
