import { HTMLAttributes } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './date-picker.css'

interface Props {
  isClearable?: boolean
  onChange: (date: Date, e: any) => void
  selectedDate: Date | undefined
  showPopperArrow?: boolean
}

const CustomDatePicker = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  ...props
}: Props) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      isClearable={isClearable}
      dateFormat="dd/MM/yyyy"
      showPopperArrow={showPopperArrow}
      {...props}
    />
  )
}

export default CustomDatePicker
