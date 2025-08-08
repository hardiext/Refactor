import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShortBy } from "@/constant/filter-value";

const ShortByFilter = () => {
  return (
    <RadioGroup>
      {ShortBy.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <RadioGroupItem value={item.value} id={item.value} className=" data-[state=checked]:border-pink-600 stroke-pink-600 "/>
          <Label htmlFor={item.value} className="text-xs font-normal">{item.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};
export default ShortByFilter;
