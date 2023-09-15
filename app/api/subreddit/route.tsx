import clientPromise from "@/lib/MongoConnect";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("redditclone");

  const body = await req.json();

  if (!body.owner) {
    return new Response(
      JSON.stringify({
        Error: "You need to signup before you can create an Community",
      }),
    );
  }

  let isExisting = await db
    .collection("subreddits")
    .findOne({ name: body.name });

  if (isExisting != null) {
    return new Response(
      JSON.stringify({
        Error: "Community already exists",
      }),
    );
  }

  db.collection("subreddits").insertOne({
    owner: body.owner,
    name: body.name,
    description: body.description,
    posts: [],
  });
  return new Response(JSON.stringify(body));
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  const client = await clientPromise;
  const db = client.db("redditclone");

  const subreddit = await db.collection("subreddits").findOne({
    name,
  });

  return new Response(
    JSON.stringify({
      subreddit,
    }),
  );
}
