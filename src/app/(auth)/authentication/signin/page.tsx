"use client"
import dynamic from "next/dynamic";
import OtherSignIn from "../../components/molecules/other_sign";

const SignForm = dynamic(() => import("../../components/organism/signin-form"), { ssr: false });
const SignIn = () => {
  return (
    <div className="flex flex-col min-h-screen md:grid md:grid-cols-5">
      {/* Section Video */}
      <div className="h-[200px] md:h-auto md:col-span-3 relative overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          src="/video/office.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="relative z-10 h-full bg-black/40 py-4 px-6 md:py-8 md:px-12">
          <header>
            <h1 className="text-pink-500 lg:text-start text-end text-lg md:text-xl font-bold">
              Kerjago
            </h1>
          </header>
          <div className="bloc md:block absolute lg:pt-8 lg:pb-12 pt-4 pb-6 bottom-0">
            <div className="block lg:hidden">
              <h1 className="text-lg font-semibold  block text-white  lg:hidden">
                Login Now
              </h1>
              <p className="text-xs mt-2  text-white">
                Welcome back! please enter your details
              </p>
            </div>
            <h1 className="text-white lg:block hidden text-2xl font-semibold">
              Welcome Back!
            </h1>
            <p className="lg:flex flex-wrap  hidden text-white mt-4 text-xs max-w-[90%] leading-normal font-normal">
              Log in to access your travel dashboard and manage your bookings
              with ease. Discover exclusive deals tailored just for you.
            </p>
            <div className="mt-8 lg:flex items-center justify-between hidden">
              <span className="text-xs text-white">
                Kerjago 2025. All rights reserved
              </span>
              <div className="flex items-center space-x-2">
                <a
                  href="#"
                  className="text-xs font-medium underline text-white"
                >
                  Term of Service
                </a>
                <a
                  href="#"
                  className="text-xs font-medium underline text-white"
                >
                  Privacy Police
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white flex flex-col lg:justify-center py-6 px-6 md:col-span-2 md:px-12">
        <h1 className="text-xl font-semibold text-center hidden  lg:block">
          Login Now
        </h1>
        <p className="text-xs mt-2 text-center lg:block hidden">
          Welcome back! please enter your details
        </p>
        <div className="mt-6">
          <SignForm />
        </div>
        <div className="mt-6">
          <OtherSignIn />
        </div>
        <div className="mt-8 lg:hidden block">
          <div className="flex items-center space-x-6  justify-center">
            <a href="#" className="text-xs font-medium underline text-black">
              Term of Service
            </a>
            <a href="#" className="text-xs font-medium underline text-black">
              Privacy Police
            </a>
          </div>
          <div className="flex items-center justify-center mt-6">
            <span className="text-xs text-black">
              Jalanify 2025. All rights reserved
            </span>
          </div>
        </div>
        {/* <div className="lg:hidden block">
          <div className="mt-0 lg:flex items-center justify-between hidden">
            <span className="text-xs text-black">
              Jalanify 2025. All rights reserved
            </span>
            <div className="flex items-center space-x-2">
              <a href="#" className="text-xs font-medium underline text-white">
                Term of Service
              </a>
              <a href="#" className="text-xs font-medium underline text-white">
                Privacy Police
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SignIn;
