import { NextRequest } from "next/server";
import clientPromise from "@/lib/MongoConnect";

export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("redditclone");

  const body = await req.json();

  if (body.password) {
    body.password =
      process.env.HASHSECRET + btoa(body.password) + process.env.HASHSECRET;
  }

  let isExisting = await db.collection("users").findOne({ name: body.name });

  if (isExisting != null) {
    return new Response(
      JSON.stringify({
        Error: "Account already exits",
      }),
    );
  }

  db.collection("users").insertOne(body);

  return new Response(JSON.stringify(body));
}
