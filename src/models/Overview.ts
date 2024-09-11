export interface Tiktok {
  followers: number;
  like: number;
  post: number;
}

export interface Instagram {
  username: string;
  followers: number;
}

export interface Threads {
  username: string;
  followers: number;
}

export interface Overview {
  tiktok: Tiktok;
  instagram: Instagram;
  threads: Threads;
}
