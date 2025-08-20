import { Badge } from "@/components/ui/badge";

import { Card, CardContent } from "@/components/ui/card";


const modelDescription = `
Saya adalah seorang model profesional dengan pengalaman di runway, editorial, dan pemotretan komersial. 
Terampil dalam berbagai teknik posing dan ekspresi wajah, saya mampu menyesuaikan diri dengan berbagai konsep kreatif. 
Dengan dedikasi tinggi dan kemampuan beradaptasi, saya siap berkolaborasi untuk proyek fashion, brand endorsements, dan produksi media visual lainnya.
`;
const DescriptionOverview = () => {
  return (
    <Card className="w-full lg:rounded-xl mask-clip-content shadow-none border-0 p-0 gap-0 pb-4">
      <CardContent className="py-6">
        <div>
          <h1 className="mb-2 text-sm font-semibold">About me</h1>
          <div className="text-xs text-neutral-700 leading-relaxed">{modelDescription}</div>
        </div>
      </CardContent>
    </Card>
  );
};
export default DescriptionOverview;
