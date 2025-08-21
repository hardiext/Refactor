import images from "@/app/assets/list-image";
import { Badge } from "@/components/ui/badge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Puzzle } from "lucide-react";

import Image from "next/image";
const modelSkills = [
  "Runway Modeling",
  "Print Modeling",
  "Commercial Modeling",
  "Editorial Modeling",
  "Posing Techniques",
  "Acting Skills",
  "Brand Endorsements",
  "Facial Expressions",
];
const modelDescription = `
Saya adalah seorang model profesional dengan pengalaman di runway, editorial, dan pemotretan komersial. 
Terampil dalam berbagai teknik posing dan ekspresi wajah, saya mampu menyesuaikan diri dengan berbagai konsep kreatif. 
Dengan dedikasi tinggi dan kemampuan beradaptasi, saya siap berkolaborasi untuk proyek fashion, brand endorsements, dan produksi media visual lainnya.
`;
const SkillOverview = () => {
  return (
    <Card className="w-full lg:rounded-xl mask-clip-content shadow-none border-0  gap-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Puzzle className="w-5 h-5" /> Skill
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div>
          <div className="gap-2 flex flex-wrap">
            {modelSkills.map((skill, i) => (
              <Badge
                key={i}
                className="text-xs py-1.5 rounded-sm bg-white border border-gray-100 text-neutral-800"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default SkillOverview;
