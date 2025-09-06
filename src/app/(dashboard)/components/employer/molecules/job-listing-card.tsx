import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import MyJobCard from "./myjob-car";

const JobListingCard = ({userId}: {userId: string}) => {
  return (
    <Card className="col-span-2 bg-white shadow-none border-0">
      <CardHeader className="border-b border-gray-100 flex items-center justify-between">
        <h3 className="txt-md font-semibold">Job Listing</h3>
        <Badge className="px-4 py-1.5 bg-white border border-slate-100 text-neutral-800 rounded-full">
          6 items
        </Badge>
      </CardHeader>
      <CardContent>
         <MyJobCard userId={userId}/>
      </CardContent>
    </Card>
  );
};
export default JobListingCard;
