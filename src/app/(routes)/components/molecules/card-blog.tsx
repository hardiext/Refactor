import { BlogPost } from "@/constant/blog-data";
import Image from "next/image";
import { memo } from "react";

const BlogCard = memo(({ post }: { post: BlogPost }) => (
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
      <span className="text-xs text-green-500">{post.date}</span>
      <h2 className="text-md font-semibold">{post.title}</h2>
      <p className="text-xs text-gray-500 line-clamp-2">{post.description}</p>
    </figcaption>
  </figure>
));

export default BlogCard
