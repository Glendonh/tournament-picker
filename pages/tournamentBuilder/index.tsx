import { useState } from 'react'
import { Forms } from '../../constants'
import FormatForm from './FormatForm'
import ParticipantsForm from './ParticipantsForm'
import ScheduleForm from './ScheduleForm'
import { FormatValues, ParticipantsFormVals, NightValues } from '../../types'

const TourmanentBuilder = (): JSX.Element => {
  const [activeForm, setActiveForm] = useState(Forms.Format)
  const [format, setFormat] = useState<FormatValues>()
  const [participants, setParticipants] = useState<ParticipantsFormVals>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [schedule, setSchedule] = useState<NightValues>()
  const setFormSection = (section: Forms) => () => {
    setActiveForm(section)
  }
  const saveFormat = (vals: FormatValues) => {
    setFormat(vals)
    setActiveForm(Forms.Participants)
  }

  const saveParticipants = (vals: ParticipantsFormVals) => {
    setParticipants(vals)
    setActiveForm(Forms.Schedule)
  }

  const saveSchedule = (vals: NightValues) => {
    setSchedule(vals)
  }

  return (
    <div className="container mx-3">
      <button onClick={setFormSection(Forms.Format)}>Format</button>
      <button disabled={!format} onClick={setFormSection(Forms.Participants)}>
        Participants
      </button>
      <button disabled={!participants} onClick={setFormSection(Forms.Schedule)}>
        Schedule
      </button>
      <h1>{activeForm}</h1>
      <FormatForm activeForm={activeForm} currentFormat={format} saveFormat={saveFormat} />
      <ParticipantsForm activeForm={activeForm} format={format} saveParticipants={saveParticipants} />
      <ScheduleForm activeForm={activeForm} participants={participants} format={format} saveSchedule={saveSchedule} />
    </div>
  )
}

export default TourmanentBuilder
