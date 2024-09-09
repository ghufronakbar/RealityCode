export interface Post {
  id: number;
  title: string;
  content: string;
  images: Image[];
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  id: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}
