"use server";

import { revalidateTag } from "next/cache";

export default async function revalidateCacheByTag(tag: string) {
  revalidateTag(tag);
}
