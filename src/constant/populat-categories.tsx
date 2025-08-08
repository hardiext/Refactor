import {
  DribbbleIcon,
  GoogleIcon,
  MicrosoftIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight,
  BookText,
  Factory,
  Lightbulb,
  Megaphone,
} from "lucide-react";
const categories = [
  {
    title: "Design & Development",
    description:
      "Keep track of tenant information and lease agreements without hassle. Our app allows you to store and manage all necessary details.",
    icon: null, // special card
    icons: [GoogleIcon, DribbbleIcon, MicrosoftIcon],
    label: "PHP Developer",
  },
  {
    title: "Business & Consulting",
    description: "Keep track of tenant information and Our app allows all necessary.",
    icon: <Lightbulb className="w-6 h-6 text-pink-500" />,
  },
  {
    title: "Production Operation",
    description: "Keep track of tenant information and Our app allows all necessary.",
    icon: <Factory className="w-6 h-6 text-pink-500" />,
  },
  {
    title: "Education & Training",
    description: "Keep track of tenant information and Our app allows all necessary.",
    icon: <BookText className="w-6 h-6 text-pink-500" />,
  },
  {
    title: "Marketing & Sales",
    description: "Keep track of tenant information and Our app allows all necessary.",
    icon: <Megaphone className="w-6 h-6 text-pink-500" />,
  },
];
export default categories