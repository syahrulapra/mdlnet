export interface SEOAPI {
  title: string;
  description: string | null;
  image: {
    url: string;
  };
}

export interface PageAPI {
  seo: SEOAPI | null;
}
