import { Timestamp } from "@/firebase";

export interface NewsItem {
  id: any;
  title: string;
  category: string;
  imageUrl: string;
  date: string | Timestamp;
  description: string;
}
