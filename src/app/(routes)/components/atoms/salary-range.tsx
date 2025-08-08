// components/SalaryRangeSlider.tsx
'use client'

import * as React from 'react'
import { Slider } from '@/components/ui/slider'

export function SalaryRangeSlider({
  min = 0,
  max = 5000,
  step = 50,
  initialRange = [150, 2500],
  onChange,
}: {
  min?: number
  max?: number
  step?: number
  initialRange?: [number, number]
  onChange?: (values: number[]) => void
}) {
  const [range, setRange] = React.useState<number[]>(initialRange)

  const handleChange = (values: number[]) => {
    setRange(values)
    onChange?.(values)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Adjust range</span>
        <span className="text-xs text-pink-500 font-semibold ">
          ${range[0].toLocaleString()} – ${range[1].toLocaleString()}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        defaultValue={initialRange}
        value={range}
        onValueChange={handleChange}
        minStepsBetweenThumbs={1}
         className='text-pink-500'
      />
    </div>
  )
}
