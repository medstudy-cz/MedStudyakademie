import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset, apiVersion } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "snabdvge",
  dataset: dataset || "production",
});

export function urlForImage(source: any) {
  if (!source?.asset?._ref && !source?.asset?._id && !source?._ref) {
    return null;
  }
  return imageBuilder.image(source).auto("format").fit("max");
}

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: Record<string, any>;
  revalidate?: number | false;
  tags?: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: typeof revalidate === "number" ? revalidate : undefined,
      tags,
    },
  });
}
