import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { db } from "~/services/db.server"

export const loader = async ({ params }: LoaderArgs) => {
  const task = await db.task.findUnique({
    where : { id: params.taskId }
  });
  if (!task) {
    throw new Error("Task not found");
  }
  return json({ task });
}

export default function TaskRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p>Here's your task</p>
      <article>
        <h3>{data.task.title}</h3>
        <p>{data.task.description}</p>
      </article>
      <Link to=".">"{data.task.id}" Permalink</Link>
    </div>
  );
}
