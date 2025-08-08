import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const stats = [
  { number: "15,000+", label: "Successful Hires" },
  { number: "2,500+", label: "Partner Companies" },
  { number: "94%", label: "Satisfaction Rate" },
];

const StartJourneyButton = ({ className = "" }: { className?: string }) => (
  <Button
    className={`bg-gradient-to-br from-pink-500 to-red-500 shadow-none border-0 px-6 py-4 flex items-center gap-2 ${className}`}
    aria-label="Start your journey with Kerjain"
  >
    <span className="text-sm text-white font-medium">Start Your Journey</span>
    <div className="p-1 bg-white rounded-md">
      <ArrowRight size={14} className="text-black" />
    </div>
  </Button>
);

const InformationData = () => {
  return (
    <section className="bg-white px-4 lg:px-6 py-6 lg:py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="text-center border rounded-lg p-6 sm:p-8 hover:shadow-sm transition-shadow"
            >
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
                {item.number}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">{item.label}</p>
            </div>
          ))}

          {/* Tombol untuk mobile only */}
          <div className="col-span-2 sm:hidden flex items-center justify-center">
            <StartJourneyButton className="w-full" />
          </div>
        </div>

        {/* Tombol untuk desktop only */}
        <div className="hidden sm:flex justify-center mt-8">
          <StartJourneyButton />
        </div>
      </div>
    </section>
  );
};

export default InformationData;
