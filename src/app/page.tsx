import Link from "next/link";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();
  return (
    <HydrateClient>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl">
          {session && <span>Logged in as {session.user?.email}</span>}
        </p>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </HydrateClient>
  );
}
