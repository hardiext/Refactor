import { FiBriefcase, FiArrowUp } from "react-icons/fi";
import { RiGroupLine } from "react-icons/ri";
import { HiOutlineDocument } from "react-icons/hi";
import { BiMessageDots } from "react-icons/bi";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const StatData = [
  {
    label: "Total Job Posting",
    stat: 24,
    update_stat: "3 since last month", // hapus +
    update_icon: <FiArrowUp className="text-green-600" />, // icon arrow
    icon: <FiBriefcase />,
    color: "bg-amber-600 text-white",
  },
  {
    label: "Total Applicants",
    stat: 128,
    update_stat: "17 today",
    update_icon: <FiArrowUp className="text-green-600" />,
    icon: <RiGroupLine />,
    color: "bg-red-500 text-white",
  },
  {
    label: "Active Job Post",
    stat: 10,
    update_stat: "5 pending review",
    update_icon: null, // tidak ada panah
    icon: <HiOutlineDocument />,
    color: "bg-purple-500 text-white",
  },
  {
    label: "Message",
    stat: 24,
    update_stat: "20 unread",
    update_icon: null,
    icon: <BiMessageDots />,
    color: "bg-blue-500 text-white",
  },
];

const StatCard = () => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 gap-2">
      {StatData.map((item, index) => (
        <Card key={index} className="shadow-none  py-4 rounded-md border-0">
          <CardContent>
            <div className="flex items-start space-x-2">
              <div className={`p-1 inline-block rounded-sm  ${item.color}`}>
                <span className="text-sm">{item.icon}</span>
              </div>
              <div>
                <p className="text-xl font-bold leading-none">{item.stat}</p>
                <p className="text-xs mt-1 font-normal text-gray-700">
                  {item.label}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="mt-4 flex items-center space-x-1">
              {item.update_icon && item.update_icon}
              <p className="text-xs text-gray-500">{item.update_stat}</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default StatCard;
