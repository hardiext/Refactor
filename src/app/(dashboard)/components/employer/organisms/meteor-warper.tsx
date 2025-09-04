"use client"

import { Meteors } from "@/components/magicui/meteors"

export function MeteorsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg ">
      <Meteors number={30} />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  )
}
