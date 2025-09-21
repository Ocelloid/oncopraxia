import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen w-full flex-col items-center justify-center gap-8">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Онконастороженность</h1>
          <p className="text-xl text-black/80">
            Информационный портал о онкологических заболеваниях
          </p>
        </div>
      </main>
    </HydrateClient>
  );
}
