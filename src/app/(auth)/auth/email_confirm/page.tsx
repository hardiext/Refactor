import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EmailConfirmPage({
  searchParams,
}: {
  searchParams: { email?: string | undefined };
}) {
  const email = decodeURIComponent(searchParams.email ?? "");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-pink-50 px-6">
      <div className="max-w-md w-full rounded-xl bg-white p-8 border border-pink-100">
        <div className="flex justify-center">
          <div className="rounded-full bg-pink-100 p-4">
            <Mail className="h-10 w-10 text-pink-500" />
          </div>
        </div>

        <h1 className="mt-6 text-center text-2xl font-medium text-gray-800">
          Check Your Email
        </h1>

        <p className="mt-3 text-center text-gray-600 leading-relaxed">
          We’ve sent a confirmation link to{" "}
          <span className="font-medium text-pink-500">{email}</span>.
          <br />
          Please open your email inbox and click the link to verify your account.
        </p>

        <div className="mt-6 flex justify-center">
          <Link
            href="mailto:"
            className="inline-flex items-center gap-2 rounded-lg bg-pink-500 px-5 py-2 text-white hover:bg-pink-600 transition-colors"
          >
            Open Email App
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Didn’t receive the email? Check your spam folder or{" "}
          <Link href="/auth/signup" className="text-pink-500 hover:underline">
            try again
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
