"use client";

import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

const followFetch = async (name: string, subreddit: string) => {
  const res = await (
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/follow`, {
      method: "POST",
      body: JSON.stringify({ name, subreddit }),
    })
  ).json();

  return res;
};

export const Follow = ({ name }: { name: string }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const follow = () => {
    setIsLoading(true);
    if (!session) {
      toast({
        title: "Error",
        description: "Sign in to follow subreddits",
        variant: "destructive",
      });
      setIsLoading(false);
    } else {
      followFetch(session.user.name, name).then((data) => {
        if (data["Error"]) {
          toast({
            title: "Error",
            description: data["Error"],
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: `Now following ${name}`,
            variant: "default",
          });
        }

        setIsLoading(false);
      });
    }
  };

  return (
    <Button size="sm" disabled={isLoading} onClick={() => follow()}>
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Follow
    </Button>
  );
};
