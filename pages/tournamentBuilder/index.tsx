import Link from 'next/link'
import { useState } from 'react'
import FormatForm from './FormatForm'
import ScheduleForm from './ScheduleForm'
import { Forms } from '../../constants'

const TourmanentBuilder = (): JSX.Element => {
  const [activeForm, setActiveForm] = useState(Forms.Format)
  return (
    <div>
      <Link href="/">Go Home, Dipshit</Link>
      <p>Only worry about G1 format for now, here are requirements</p>
      <div>
        <button onClick={() => setActiveForm(Forms.Format)}>Format</button>
        <button onClick={() => setActiveForm(Forms.Schedule)}>Schedule</button>
      </div>
      <FormatForm activeForm={activeForm} />
      <ScheduleForm activeForm={activeForm} />
    </div>
  )
}

// I'm thinking the two forms are sub components on this page that can share some state
// State management by composition kinda thing
export default TourmanentBuilder
