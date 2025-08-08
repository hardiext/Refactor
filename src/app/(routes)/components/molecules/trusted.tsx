import images from "@/app/assets/list-image";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const popularSearchData = [
  { image: images.google },
  { image: images.meta },
  { image: images.netflix },
  { image: images.pay },
];

const Trusted = () => {
  return (
    <div className="max-w-[70vw] w-full flex items-center justify-between gap-12">
      {popularSearchData.map((item, index) => (
        <Image
          key={index}
          src={item.image}
          alt="trusted"
          className="w-12 h-auto"
          loading="lazy"
        />
      ))}
    </div>
  );
};
export default Trusted;
