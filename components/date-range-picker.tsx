"use client"
import { format, subDays } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DatePickerWithRangeProps {
  date: DateRange | undefined
  setDate: (date: DateRange) => void
  className?: string
  onRangeChange?: (range: DateRange) => void
}

export function DatePickerWithRange({ date, setDate, className, onRangeChange }: DatePickerWithRangeProps) {
  const handleRangeChange = (newRange: DateRange | undefined) => {
    if (newRange) {
      setDate(newRange)
      if (onRangeChange) {
        onRangeChange(newRange)
      }
    }
  }

  const handlePresetChange = (preset: string) => {
    const today = new Date()
    let newRange: DateRange = { from: today, to: today }

    switch (preset) {
      case "last7days":
        newRange = { from: subDays(today, 7), to: today }
        break
      case "last30days":
        newRange = { from: subDays(today, 30), to: today }
        break
      case "thisMonth":
        newRange = {
          from: new Date(today.getFullYear(), today.getMonth(), 1),
          to: today,
        }
        break
      case "lastMonth":
        newRange = {
          from: new Date(today.getFullYear(), today.getMonth() - 1, 1),
          to: new Date(today.getFullYear(), today.getMonth(), 0),
        }
        break
    }

    handleRangeChange(newRange)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn("w-[260px] justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleRangeChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <Select onValueChange={handlePresetChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last7days">Last 7 days</SelectItem>
            <SelectItem value="last30days">Last 30 days</SelectItem>
            <SelectItem value="thisMonth">This month</SelectItem>
            <SelectItem value="lastMonth">Last month</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

