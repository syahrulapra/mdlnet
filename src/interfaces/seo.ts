export interface SEOAPI {
  title: string;
  description: string | null;
  image: {
    data: {
      id: number;
      attributes: {
        url: string;
      };
    };
  };
}

export interface PageAPI {
  id: number;
  attributes?: {
    seo: SEOAPI | null;
  };
}
