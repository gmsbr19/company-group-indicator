import { useEffect, useRef } from 'react'
import { group } from './data'

const usePrevious = <group>(value: group): group | undefined => {
  const ref = useRef<group>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export default usePrevious
