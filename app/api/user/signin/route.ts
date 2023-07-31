import { NextRequest } from "next/server";
import clientPromise from "@/lib/MongoConnect";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const provider = searchParams.get("provider"); // Retrieves the value of the 'skip' parameter
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const password = searchParams.get("password") || "";
  const image =
    searchParams.get("image") ||
    `https://api.dicebear.com/6.x/initials/svg?backgroundType=gradientLinear&seed=${name}`;
  const client = await clientPromise;
  const db = client.db("redditclone");

  if (provider == "credentials") {
    const user = await db.collection("users").findOne({
      name: name,
      password:
        process.env.HASHSECRET + btoa(password) + process.env.HASHSECRET,
    });

    if (user == null) {
      return new Response(
        JSON.stringify({
          Error: "Account not found",
        }),
      );
    }
    return new Response(JSON.stringify(user));
  } else {
    const user = await db
      .collection("users")
      .findOne({ name: name, email: email });

    if (!user) {
      const res = await (
        await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/signup`, {
          method: "POST",
          body: JSON.stringify({ name, email, password, image }),
        })
      ).json();

      return new Response(JSON.stringify(res));
    }
    return new Response(JSON.stringify(user));
  }
}
