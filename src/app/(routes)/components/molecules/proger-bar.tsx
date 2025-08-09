interface StepProgressProps {
  currentStep: number;
  steps: string[];
}

const StepProgress = ({ currentStep, steps }: StepProgressProps) => {
  return (
    <div className="relative w-full max-w-md mx-auto flex items-center justify-between px-4">
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-300 -z-10" />

      {steps.map((label, idx) => {
        const stepNumber = idx + 1;
        const isCompleted = currentStep > stepNumber;
        const isActive = currentStep === stepNumber;

        return (
          <div key={label} className="relative flex flex-col items-center flex-1 text-center z-10">
            <div
              className={`w-8 h-8 rounded-full flex items-center z- justify-center text-sm font-medium
                ${isCompleted ? 'bg-green-500 text-white z-30' :
                isActive ? 'bg-pink-600 text-white' :
                'bg-white border border-gray-300 text-gray-500'}`}
            >
              {stepNumber}
            </div>
            <span className={`mt-2 text-xs ${isActive ? 'font-semibold text-black' : 'text-gray-500'}`}>
              {label}
            </span>
          </div>
        );
      })}
      <div
        className="absolute top-4 left-0 h-0.5 bg-green-500 -z-10 transition-all duration-300"
        style={{
          width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
        }}
      />
    </div>
  );
};

export default StepProgress;
