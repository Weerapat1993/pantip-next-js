export type Product = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  target_link_url: string;
  img_url: string;
  description: string;
  status: string;
  user_id: number;
  publish_at: string;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: number;
  is_pinned: boolean;
  link_url: string;
  name: string;
  name_en: string;
  room_icon_url: string;
  slug: string;
  description: string;
};

export type Announce = {
  announce_id: number;
  category_name: string;
  created_time: string;
  display_message: string;
  type: string;
};

export type Pagination = {
  pageSize: number;
  current: number;
  total: number;
  page: number;
  lastPage: number;
};

export type PaginationNextId = {
  next_id: number;
  ranking_time: number;
};

export type SuggestTopicPages = {
  [key: string]: any[];
};
