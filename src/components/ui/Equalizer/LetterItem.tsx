import { ReactNode, useRef } from 'react'
import { AnimatePresence, motion, TargetAndTransition, Transition } from 'framer-motion'

interface ILetterItemProps {
  letter: ReactNode
  animate?: TargetAndTransition
  transition?: Transition
  random?: {
    min: number
    max: number
  }
}

const LetterItem = ({
  letter,
  animate,
  transition,
  random = {
    min: 1,
    max: 3,
  },
}: ILetterItemProps) => {
  const { current: randomBetween } = useRef(random)
  return (
    <AnimatePresence>
      <motion.span
        animate={{
          scaleY: [1, 1.5, 0.5, 1],
          fontWeight: [900, 400, 900, 900],
          ...animate,
        }}
        transition={{
          duration: Math.floor(Math.random() * (randomBetween.max - randomBetween.max + 1)) + randomBetween.min,
          repeat: Infinity,
          ...transition,
        }}
      >
        {letter}
      </motion.span>
    </AnimatePresence>
  )
}

export default LetterItem
