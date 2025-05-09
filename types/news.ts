export interface News {
  _id: string;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
}
