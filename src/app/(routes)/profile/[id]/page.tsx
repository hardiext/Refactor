"use client";
import { use } from "react";
import BreadcrumbProfile from "../../components/atoms/breadcrumb-link";
import Container from "../../components/atoms/container";
import ProfileInformation from "../../components/organisms/profile-information";


export default function PublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); 
  return (
    <Container>
      <main className="mx-auto lg:px-8 overflow-hidden bg-gray-50">
        <div className="py-4 px-4 lg:bg-transparent bg-white">
          <BreadcrumbProfile />
        </div>
        <article className="grid lg:grid-cols-5 grid-cols-1">
          <div className="lg:col-span-3">
            {/* versi public */}
            <ProfileInformation userId={id} isOwner={false} />
          </div>
          <div className="lg:col-span-2"></div>
        </article>
      </main>
    </Container>
  );
}
