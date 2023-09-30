import clientPromise from "@/lib/MongoConnect";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("redditclone");

  const { name, subreddit } = await req.json();

  const data = await (
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user?name=${name}`)
  ).json();

  if (data.following.includes(subreddit)) {
    return new Response(
      JSON.stringify({
        Error: "You are already following this subreddit",
      }),
    );
  }

  let finalFollow: string[] = [...data.following, subreddit];

  // const res = await db.collection("users").findOne({ name: name });
  const res = await db.collection("users").updateOne(
    { name: name },
    {
      $set: {
        following: finalFollow,
      },
    },
  );

  return new Response(JSON.stringify(res));
}
