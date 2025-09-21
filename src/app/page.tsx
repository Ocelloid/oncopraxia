import { HydrateClient } from "~/trpc/server";
import InfoPageSections from "~/components/info";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="w-full">
        <InfoPageSections />
      </div>
    </HydrateClient>
  );
}
