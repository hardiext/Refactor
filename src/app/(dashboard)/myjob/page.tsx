"use client";
import Container from "@/app/(routes)/components/atoms/container";
import HeaderMyJob from "../components/employer/organisms/header-myjob";
import MyJobContent from "../components/employer/organisms/my-job-content";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const MyJob = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [hasMounted, setHasMounted] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUserId(data.session?.user?.id);
    };
    getSession();
  }, []);

    if (!hasMounted) return null;
    
  if (!userId) {
    return (
      <Container>
       <h1>Sesi Anda telah habis silahkan login</h1>
      </Container>
    );
  }

  return (
    <Container>
      <main className="p-6 bg-gray-50">
        <div className="mb-4">
          <HeaderMyJob />
        </div>
        <div>
          <MyJobContent userId={userId} />
        </div>
      </main>
    </Container>
  );
};
export default MyJob;
