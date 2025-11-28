import { getStatus } from "$lib/api";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, fetch }) => {
  const id = params.id;

  try {
    const status = await getStatus(fetch, id);
    return { status };
  } catch (err) {
    error(404, `Migração com ID '${id}' não encontrada`);
  }
};
