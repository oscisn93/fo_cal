import { ActionArgs, ActionFunction } from "@remix-run/node";
import { Link, useSearchParams, useActionData } from "@remix-run/react";
import { db } from "~/services/db.server";
import {
  badRequest,
  LoginFieldErrors,
  LoginFields,
  PostErrors,
} from "~/services/request.server";

/**
 *
 * @param username
 * @returns fieldError string
 * TODO: validate username with zod
 */
function validateUsername(username: string) {
  if (username.length < 3) {
    return "Usernames must be atleast 3 characters long";
  }
}

/**
 *
 * @param password
 * @returns validate password
 * TODO: validation logic for password
 */
function validatePassword(password: string) {
  if (password.length < 8)
    return "Password must be at least 8 characters long";
}

/**
 *
 * @param url
 * @returns a valid url for this application
 * TODO: include any other possible url
 */
function validateUrl(url: string) {
  let urls = ["/tasks", "/"];
  if (urls.includes(url)) {
    return url;
  }
  return "/tasks";
}

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const loginType = String(form.get("loginType") || "");
  const password = String(form.get("password") || "");
  const username = String(form.get("username") || "");
  const redirectTo = validateUrl(
    (form.get("redirectTo") as string) || "/tasks"
  );

  if (
    typeof loginType !== "string" ||
    typeof password !== "string" ||
    typeof username !== "string"
  ) {
    return badRequest<PostErrors>({
      fieldErrors: null,
      fields: null,
      formError: "Login form validation error",
    });
  }

  const fields: LoginFields = { loginType, password, username };
  const fieldErrors: LoginFieldErrors = {
    password: validatePassword(password),
    username: validateUsername(username),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest<PostErrors>({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  switch (loginType) {
    case "login": {
      return badRequest<PostErrors>({
        fieldErrors: null,
        fields,
        formError: "Not Implemented",
      });
    }
    case "register": {
      const userExists = await db.user.findFirst({
        where: { username },
      });
      if (userExists) {
        return badRequest<PostErrors>({
          fieldErrors: null,
          fields,
          formError: `User with the username ${username} already exists`,
        });
      }
      return badRequest<PostErrors>({
        fieldErrors: null,
        fields,
        formError: "Not implemented",
      });
    }
    default: {
      badRequest<PostErrors>({
        fieldErrors: null,
        fields,
        formError: "Login type invalid",
      });
    }
  }
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  return (
    <div>
      <main className="container">
        <h1>Login</h1>
        <form method="POST">
          <input
            type="hidden"
            name="redirectTo"
            value={searchParams.get("redirectTo") ?? undefined}
          />
          <fieldset>
            <legend className="sr-only">Login or Register?</legend>
            <label>
              <input
                type="radio"
                name="loginType"
                value="login"
                defaultChecked={
                  !actionData?.fields?.loginType ||
                  actionData?.fields?.loginType === "login"
                }
              />{" "}
              Login
            </label>
            <label>
              <input
                type="radio"
                name="loginType"
                value="register"
                defaultChecked={actionData?.fields?.loginType === "register"}
              />{" "}
              Register
            </label>
          </fieldset>
          <div>
            <label htmlFor="username-input">Username</label>
            <input
              type="text"
              name="username"
              id="username-input"
              defaultValue={actionData?.fields?.username}
              aria-invalid={Boolean(actionData?.fieldErrors?.username)}
              aria-errormessage={
                actionData?.fieldErrors?.username ? "username-error" : undefined
              }
            />
          </div>
          <div>
            <label htmlFor="password-input">Password</label>
            <input type="password" name="password" id="password-input" />
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </main>
      <footer>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
