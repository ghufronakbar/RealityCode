export interface Post {
  id: number;
  title: string;
  content: string;
  images: ImagePost[];
  createdAt: string;
  updatedAt: string;
}

export interface ImagePost {
  id: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}
