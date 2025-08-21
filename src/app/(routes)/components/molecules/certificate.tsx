"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  period: string;
  logoUrl?: string;
  credentialUrl?: string;
};

const certificates: Certificate[] = [
  {
    id: "1",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    period: "2024",
    logoUrl: "",
    credentialUrl: "https://aws.amazon.com/certification/",
  },
];

export default function CertificateSection() {
  return (
    <Card className="shadow-none border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Award className="w-5 h-5" /> Certifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="flex gap-4 border-b last:border-0 pb-4 last:pb-0">
            <Avatar className="h-12 w-12 rounded-lg">
              {cert.logoUrl ? (
                <AvatarImage src={cert.logoUrl} alt={cert.issuer} />
              ) : (
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-semibold">
                  {cert.issuer.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <h3 className="text-base font-medium">{cert.title}</h3>
                <span className="text-sm text-muted-foreground">{cert.period}</span>
              </div>
              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              {cert.credentialUrl && (
                <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">
                  Lihat Credential
                </a>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
