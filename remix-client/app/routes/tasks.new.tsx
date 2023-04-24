import type { ActionArgs } from "@remix-run/node";
import { redirect, ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { db } from "~/services/db.server";
import { badRequest } from "~/services/request.server";

/**
 * Validate title
 * @param title
 * @returns fieldError string
 * TODO: Add specific logic for api integration
 */
function validateTaskTitle(title: string): string | undefined {
  if (title.length < 3) {
    return "Name must be at least three characters in length";
  }
}

/**
 * Validate description
 * @param description
 * @returns fieldError string
 * TODO: Add specific logic for api integration
 */
function validateTaskDescription(description: string): string | undefined {
  if (description.length < 10) {
    return "Description must be at least ten characters long";
  }
}

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const description = form.get("description");
  const title = form.get("title");

  if (typeof description !== "string" || typeof title !== "string") {
    badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form validation check failed.",
    });
  }

  const fieldErrors = {
    description: validateTaskDescription(description as string),
    title: validateTaskTitle(title as string),
  };

  const fields = { title, description };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const task = await db.task.create({
    data: fields,
  });
  return redirect(`/tasks/${task.id}`);
};

export default function NewTaskRoute() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="container">
      <p>Add your own task</p>
      <form method="post">
        <div>
          <label>
            Title:{" "}
            <input
              defaultValue={actionData?.fields?.title || ""}
              type="text"
              name="title"
              aria-invalid={Boolean(actionData?.fieldErrors?.title)}
              aria-errormessage={
                actionData?.fieldErrors?.title ? "title-error" : undefined
              }
            />
          </label>
          {actionData?.fieldErrors.title ? (
            <p id="title-error" role="alert">
              {actionData.fieldErrors.title}
            </p>
          ) : null}
        </div>
        <div>
          <label>
            Description:{" "}
            <textarea
              defaultValue={actionData?.fields?.description || ""}
              name="description"
              aria-invalid={Boolean(actionData?.fieldErrors.description)}
              aria-errormessage={
                actionData?.fieldErrors?.description
                  ? "description-error"
                  : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.description ? (
            <p id="description-error" role="alert">
              {actionData.fieldErrors.description}
            </p>
          ) : null}
        </div>
        <div>
          {actionData?.formError ? (
            <p role="alert">{actionData.formError}</p>
          ) : null}
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
