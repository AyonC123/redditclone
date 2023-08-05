import clientPromise from "@/lib/MongoConnect";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("redditclone");

  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || "";

  const res = await db.collection("users").findOne({ name: name });

  return new Response(JSON.stringify(res));
}
