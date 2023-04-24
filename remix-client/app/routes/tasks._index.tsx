import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { db } from "~/services/db.server";

export const loader =async () => {
  const count = await db.task.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomTask] = await db.task.findMany({
    skip: randomRowNumber,
    take: 1
  });
  return json({ randomTask });
} 

export default function TasksIndexRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p>Random Task:</p>
      <article>
        <h3>{data.randomTask.title}</h3>
        <p>{data.randomTask.description}</p>
      </article>
    </div>
  );
}
