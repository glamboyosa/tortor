import { forwardRef } from 'react'
import { TInputRef } from '@/lib/types'
import styles from '@/styles/capture.module.css'

const Input = forwardRef<TInputRef>((_, ref) => {
  return (
    <input
      ref={ref}
      className={styles.input}
      placeholder="Enter a valid web url"
    />
  )
})

Input.displayName = 'Input'
export default Input
