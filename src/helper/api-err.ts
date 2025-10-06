export class ApiError extends Error {
  status: number;
  code?: number | string;
  payload?: unknown;

  constructor(
    message: string,
    status: number,
    code?: number | string,
    payload?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.payload = payload;
  }
}

export const isUnauthorized = (err: unknown) => {
  const e = err as Partial<ApiError>;
  return (
    (typeof e?.status === "number" && e.status === 401) ||
    (typeof e?.code === "number" && e.code === 401) ||
    (typeof e?.message === "string" && /invalid token/i.test(e.message))
  );
};

export async function fetchJSON<T = any>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);
  let json: any = null;

  try {
    json = await res.json();
  } catch {}

  if (!res.ok) {
    const message =
      json?.message || json?.error || res.statusText || "Request failed";
    const code = json?.code ?? res.status;
    throw new ApiError(message, res.status, code, json);
  }

  return json as T;
}
