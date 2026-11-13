import { cacheLife } from "next/cache";

/** Server-rendered year, cached so it stays prerenderable under Cache Components. */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
