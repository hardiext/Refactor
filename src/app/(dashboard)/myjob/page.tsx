"use client";
import Container from "@/app/(routes)/components/atoms/container";
import HeaderMyJob from "../components/employer/organisms/header-myjob";

const MyJob = () => {
  return (
    <Container>
      <main className="p-6">
        <HeaderMyJob />
      </main>
    </Container>
  );
};
export default MyJob;
