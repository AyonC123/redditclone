"use client";

import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import * as React from "react";
import { FC } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

const SignIn: FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("github");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm max-w-xs mx-auto">
              By continuing, you are setting up a Breadit account and agree to
              our User Agreement and Privacy Policy.
            </p>
          </div>
          <div className={cn("flex justify-center")}>
            <Button
              type="button"
              size="sm"
              className="w-full"
              onClick={loginWithGoogle}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FaGithub className="mr-2 h-4 w-4" />
              )}
              <h1>Github</h1>
            </Button>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            New to RedditC?{" "}
            <Link
              href="/sign-up"
              className="hover:text-brand text-sm underline underline-offset-4"
            >
              Sign Up
            </Link>
          </p>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-muted-foreground m-28",
            )}
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
