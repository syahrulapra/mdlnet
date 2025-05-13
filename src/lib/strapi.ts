import type { PageAPI } from "@interfaces/seo";

interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${import.meta.env.PUBLIC_STRAPI_URL}/api/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  const res = await fetch(url.toString());
  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
}

export async function fetchSEO(
  endpoint: string,
): Promise<{ title: string; description: string; image: string | null }> {
  const response = await fetchApi<PageAPI>({
    endpoint: `${endpoint}?populate[seo][fields][0]=title&populate[seo][fields][1]=description&populate[seo][populate][image][fields][0]=url`,
    wrappedByKey: "data",
  });

  const seoAttributes = response.seo;

  return {
    title: seoAttributes?.title || "",
    description: seoAttributes?.description || "",
    image: seoAttributes?.image.url
      ? seoAttributes.image.url
      : null,
  };
}
