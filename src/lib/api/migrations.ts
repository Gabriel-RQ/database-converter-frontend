import { PUBLIC_API_URL } from "$env/static/public";

export async function startMigration(
  fetch: (input: URL | RequestInfo, init?: RequestInit) => Promise<Response>,
  data: StartMigrationRequest
) {
  const response = await fetch(PUBLIC_API_URL + "/migrations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }

  return responseData as MigrationStatusResponse;
}

export async function startExtraction(
  fetch: (input: URL | RequestInfo, init?: RequestInit) => Promise<Response>,
  id: string
) {
  const response = await fetch(
    PUBLIC_API_URL + "/migrations/" + id + "/extract",
    {
      method: "POST",
    }
  );

  if (!response.ok) throw new Error((await response.json()).message);
}

export async function startTransformation(
  fetch: (input: URL | RequestInfo, init?: RequestInit) => Promise<Response>,
  id: string
) {
  const response = await fetch(
    PUBLIC_API_URL + "/migrations/" + id + "/transform",
    {
      method: "POST",
    }
  );

  if (!response.ok) throw new Error((await response.json()).message);
}

export async function startLoading(
  fetch: (input: URL | RequestInfo, init?: RequestInit) => Promise<Response>,
  id: string
) {
  const response = await fetch(PUBLIC_API_URL + "/migrations/" + id + "/load", {
    method: "POST",
  });

  if (!response.ok) throw new Error((await response.json()).message);
}

export async function startValidation(
  fetch: (input: URL | RequestInfo, init?: RequestInit) => Promise<Response>,
  id: string
) {
  const response = await fetch(
    PUBLIC_API_URL + "/migrations/" + id + "/validate",
    {
      method: "POST",
    }
  );

  if (!response.ok) throw new Error((await response.json()).message);
}

export async function getStatus(
  fetch: (input: URL | RequestInfo, init?: RequestInit) => Promise<Response>,
  id: string
) {
  const response = await fetch(
    PUBLIC_API_URL + "/migrations/" + id + "/status",
    {
      method: "GET",
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }

  return responseData as MigrationStatusResponse;
}

export function getSseEvents(id: string) {
  return new EventSource(`${PUBLIC_API_URL}/migrations/${id}/sse`);
}
