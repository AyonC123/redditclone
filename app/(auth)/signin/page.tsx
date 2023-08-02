"use client";

import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const signInFormSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(4).max(20),
});

const signUpFormSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email().min(2).max(50),
  password: z.string().min(4).max(20),
});

export default function Home() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const signInOnSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    setIsLoading(true);

    try {
      console.log(values);
      await signIn("credentials", values);
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error while logging in with your credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUpOnSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    setIsLoading(true);

    try {
      let res = await (
        await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/signup`, {
          method: "POST",
          body: JSON.stringify({
            name: values.username,
            email: values.email,
            password: values.password,
            image: `https://api.dicebear.com/6.x/initials/svg?backgroundType=gradientLinear&seed=${values.username}`,
          }),
        })
      ).json();

      if (res["Error"]) {
        toast({
          title: "Error",
          description: res["Error"],
          variant: "destructive",
        });

        return;
      }

      signIn("credentials", values);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error while signing up with credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGithub = async () => {
    setIsLoading(true);

    try {
      await signIn("github");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error while logging in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Breadit account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>
      <Tabs defaultValue="signin">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Form {...signInForm}>
            <form
              onSubmit={signInForm.handleSubmit(signInOnSubmit)}
              className="space-y-8"
            >
              <FormField
                control={signInForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="RedditC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signInForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="redditc" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                size="sm"
                disabled={isLoading}
                className="w-full"
                type="submit"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Submit
              </Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="signup">
          <Form {...signUpForm}>
            <form
              onSubmit={signUpForm.handleSubmit(signUpOnSubmit)}
              className="space-y-8"
            >
              <FormField
                control={signUpForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                size="sm"
                disabled={isLoading}
                className="w-full"
                type="submit"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Submit
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
      <hr />
      <div className={cn("flex justify-center")}>
        <Button
          type="button"
          size="sm"
          className="w-full"
          onClick={loginWithGithub}
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
        Back to{" "}
        <Link
          href="/"
          className="hover:text-brand text-sm underline underline-offset-4"
        >
          Home
        </Link>
        ?
      </p>
    </div>
  );
}
