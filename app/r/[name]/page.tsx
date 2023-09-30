import { Follow } from "@/components/Follow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export default async function Subreddits({
  params,
}: {
  params: { name: string };
}) {
  const res = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/subreddit?name=${params.name}`,
      {
        cache: "no-cache",
      },
    )
  ).json();

  if (!res) {
    return (
      <h1 className="flex justify-center items-center text-3xl font-bold">
        Subreddit not found
      </h1>
    );
  }

  return (
    <>
      <div className="flex justify-evenly mx-20 gap-5">
        <div className="p-5 rounded-lg w-full">
          <h1 className="text-2xl font-bold">r/{params.name}</h1>
        </div>
        <div className="sticky top-0 flex flex-col gap-5">
          <div className="bg-accent p-5 rounded-lg w-80">
            <div className="flex justify-between gap-10 align-middle items-center pb-5">
              <h2 className="text-xl font-bold">r/{params.name}</h2>
              <Follow name={params.name} />
            </div>
            <p className="break-all">{res.description}</p>
          </div>

          <div className="bg-accent p-5 rounded-lg w-80">
            <h2 className="text-xl font-bold pb-5">Create post</h2>
            <button
              className={cn(buttonVariants({ variant: "default" }), "w-full")}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
