import images from "@/app/assets/list-image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { memo } from "react";

export const blogPosts = [
  {
    image: images.interview,
    title: "5 Proven Tips to Ace Your Job Interview",
    description:
      "Job interviews can be nerve-wracking, but preparation is key. With the right strategies, you can leave a lasting impression. Discover five simple tips to boost your confidence and win the interview.",
  },
  {
    image: images.remote,
    title: "Remote Work: A Trend or the Future of Employment?",
    description:
      "Remote work has rapidly become the new normal for many professionals. It offers flexibility and a better work-life balance. But it also brings new challenges in communication and productivity.",
  },
  {
    image: images.resume,
    title: "How to Create a Winning Resume in Just 10 Minutes",
    description:
      "Your resume is often your first impression to employers. A clear layout and powerful wording can make all the difference. Learn the essential elements to craft a professional and effective resume.",
  },
];

const BlogCard = memo(({ post }: { post: (typeof blogPosts)[0] }) => (
  <figure className="w-full">
    <div className="relative w-full h-[200px] sm:h-[160px] rounded-lg overflow-hidden">
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
        placeholder="blur"
        loading="lazy"
      />
    </div>
    <figcaption className="flex flex-col gap-2 pt-2">
      <span className="text-xs text-green-500">12 Juli 2025</span>
      <h2 className="text-md font-semibold">{post.title}</h2>
      <p className="text-xs text-gray-500 line-clamp-2">{post.description}</p>
    </figcaption>
  </figure>
));

const KerjaBlog = () => {
  return (
    <section className="px-4 lg:px-12 py-12">
      <header className="text-center">
        <h1 className="text-2xl font-semibold">Navigate Your Career Journey</h1>
        <h2 className="text-2xl font-semibold bg-gradient-to-br from-pink-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
          <span className="text-black">with</span> Kerjain Blog
        </h2>
      </header>

      <div className="mt-6 flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full lg:w-[70%]">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Button className="h-8 bg-white border border-gray-200 rounded-full shadow-none text-xs text-neutral-800 hover:bg-gray-100">
          Show More
        </Button>
      </div>
    </section>
  );
};

export default KerjaBlog;
