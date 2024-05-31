import { useState } from 'react'
import { Forms } from '../../constants'
import FormatForm from './FormatForm'
import ParticipantsForm from './ParticipantsForm'
import { FormatValues, ParticipantsFormVals } from '../../types'

const TourmanentBuilder = (): JSX.Element => {
  const [activeForm, setActiveForm] = useState(Forms.Format)
  const [format, setFormat] = useState<FormatValues>()
  const [participants, setParticipants] = useState<ParticipantsFormVals>()
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

  return (
    <div>
      <button onClick={setFormSection(Forms.Format)}>Format</button>
      <button disabled={!format} onClick={setFormSection(Forms.Participants)}>
        Participants
      </button>
      <button onClick={setFormSection(Forms.Schedule)}>Schedule</button>
      <h1>{activeForm}</h1>
      <FormatForm activeForm={activeForm} currentFormat={format} saveFormat={saveFormat} />
      <ParticipantsForm activeForm={activeForm} format={format} saveParticipants={saveParticipants} />
    </div>
  )
}

export default TourmanentBuilder
