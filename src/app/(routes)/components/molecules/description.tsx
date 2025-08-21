import { Badge } from "@/components/ui/badge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

const modelDescription = `
Saya adalah seorang model profesional dengan pengalaman di runway, editorial, dan pemotretan komersial. 
Terampil dalam berbagai teknik posing dan ekspresi wajah, saya mampu menyesuaikan diri dengan berbagai konsep kreatif. 
Dengan dedikasi tinggi dan kemampuan beradaptasi, saya siap berkolaborasi untuk proyek fashion, brand endorsements, dan produksi media visual lainnya.
`;
const DescriptionOverview = () => {
  return (
    <Card className="w-full lg:rounded-xl mask-clip-content shadow-none border-0 gap-0 ">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <User className="w-5 h-5" /> Education
        </CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <div>
          <div className="text-sm text-neutral-700 leading-relaxed">
            {modelDescription}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default DescriptionOverview;
