import { StairStepLoader } from "react-loaderkit";

export default function Loading() {
  return (
    <>
      <div className="flex justify-center items-center h-96">
        <StairStepLoader size={64} color="#db2777" />
      </div>
    </>
  );
}
