export interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export interface CreatePost {
  title: string;
  body: string;
}
