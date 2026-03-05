"use client"

import { useEffect, useState } from "react"

interface TimeElapsed {
  anos: number
  meses: number
  dias: number
  horas: number
  minutos: number
  segundos: number
}

function calcElapsed(from: Date): TimeElapsed {
  const now = new Date()

  let anos = now.getFullYear() - from.getFullYear()
  let meses = now.getMonth() - from.getMonth()
  let dias = now.getDate() - from.getDate()
  let horas = now.getHours() - from.getHours()
  let minutos = now.getMinutes() - from.getMinutes()
  let segundos = now.getSeconds() - from.getSeconds()

  if (segundos < 0) {
    segundos += 60
    minutos--
  }
  if (minutos < 0) {
    minutos += 60
    horas--
  }
  if (horas < 0) {
    horas += 24
    dias--
  }
  if (dias < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    dias += prevMonth.getDate()
    meses--
  }
  if (meses < 0) {
    meses += 12
    anos--
  }

  return { anos, meses, dias, horas, minutos, segundos }
}

export function TimeCounter({ date }: { date: string }) {
  const [elapsed, setElapsed] = useState<TimeElapsed | null>(null)

  useEffect(() => {
    const from = new Date(date)
    setElapsed(calcElapsed(from))

    const interval = setInterval(() => {
      setElapsed(calcElapsed(from))
    }, 1000)

    return () => clearInterval(interval)
  }, [date])

  if (!elapsed) return null

  const units = [
    { value: elapsed.anos, label: elapsed.anos === 1 ? "ano" : "anos" },
    { value: elapsed.meses, label: elapsed.meses === 1 ? "mes" : "meses" },
    { value: elapsed.dias, label: elapsed.dias === 1 ? "dia" : "dias" },
    { value: elapsed.horas, label: elapsed.horas === 1 ? "hora" : "horas" },
    { value: elapsed.minutos, label: elapsed.minutos === 1 ? "minuto" : "minutos" },
    { value: elapsed.segundos, label: elapsed.segundos === 1 ? "segundo" : "segundos" },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center  px-3 ">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center rounded-xl text-white px-3 py-2  md:py-3"
        >
          <span
            className="text-sm  text-white "
          >
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-xs uppercase tracking-wider text-muted-foreground md:text-xs">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}
