import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { CountDownContainer, Separator } from './styles'

interface CountDownProps {
  activeCycle: any
  setCycles: any
  activeCycleId: any
}

export function CountDown({
  activeCycle,
  setCycles,
  activeCycleId,
}: CountDownProps) {
  const [amountSecundsPassed, setAmountSecundsPassed] = useState(0)

  const currentSecunds = activeCycle ? totalSecunds - amountSecundsPassed : 0
  const totalSecunds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secundsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secundsDifference >= totalSecunds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )
          setAmountSecundsPassed(totalSecunds)
          clearInterval(interval)
        } else {
          setAmountSecundsPassed(secundsDifference)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSecunds, activeCycleId])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{secunds[0]}</span>
      <span>{secunds[1]}</span>
    </CountDownContainer>
  )
}
