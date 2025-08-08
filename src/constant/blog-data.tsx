import images from "@/app/assets/list-image";
import { StaticImageData } from "next/image";

export type BlogPost = {
   image: StaticImageData;
  title: string;
  description: string;
  date: string;
};

const blogPosts: BlogPost[] = [
  {
    image: images.interview,
    title: "5 Proven Tips to Ace Your Job Interview",
    description:
      "Job interviews can be nerve-wracking, but preparation is key. With the right strategies, you can leave a lasting impression. Discover five simple tips to boost your confidence and win the interview.",
    date: "12 Juli 2025",
  },
  {
    image: images.remote,
    title: "Remote Work: A Trend or the Future of Employment?",
    description:
      "Remote work has rapidly become the new normal for many professionals. It offers flexibility and a better work-life balance. But it also brings new challenges in communication and productivity.",
    date: "12 Juli 2025",
  },
  {
    image: images.resume,
    title: "How to Create a Winning Resume in Just 10 Minutes",
    description:
      "Your resume is often your first impression to employers. A clear layout and powerful wording can make all the difference. Learn the essential elements to craft a professional and effective resume.",
    date: "12 Juli 2025",
  },
];
export default blogPosts