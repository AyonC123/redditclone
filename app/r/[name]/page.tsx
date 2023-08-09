export default async function Subreddits({
  params,
}: {
  params: { name: string };
}) {
  // const res = await (
  //   await fetch(`${process.env.NEXT_PUBLIC_URL}/api/subreddit?name=RedditC`)
  // ).json();

  const res = await (
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/subreddit?name=RedditC`)
  ).json();

  console.log(res);
  return <div>Subreddits {params.name}</div>;
}
