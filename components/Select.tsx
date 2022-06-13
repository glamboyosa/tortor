import { forwardRef } from 'react'
import { TSelectRef } from '@/lib/types'
import styles from '@/styles/capture.module.css'

const Select = forwardRef<TSelectRef>((_, ref) => {
  return (
    <select className={styles.select} ref={ref} defaultValue="Desktop">
      <option value="Desktop">Desktop</option>
      <option value="Mobile">Mobile</option>
    </select>
  )
})

Select.displayName = 'Select'
export default Select
