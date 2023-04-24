import { json } from "@remix-run/node";

/**
 * This helper function helps us to return the accurate HTTP status,
 * 400 Bad Request, to the client.
 */

export interface LoginFieldErrors {
  username: string | undefined;
  password: string | undefined;
}

export interface TaskFieldErrors {
  description: string | undefined;
  title: string | undefined;
}

export type FieldErrors = LoginFieldErrors | TaskFieldErrors;

export interface LoginFields {
  loginType: string | undefined;
  username: string | undefined;
  password: string | undefined;
}

export interface TaskFields {
  description: string | undefined;
  title: string | undefined;
}

export type FormFields = LoginFields | TaskFields;

export interface PostErrors {
  fieldErrors: FieldErrors | null;
  fields: FormFields | null;
  formError: string | null;
}
export const badRequest = <T>(data: T) => json<T>(data, { status: 400 });
