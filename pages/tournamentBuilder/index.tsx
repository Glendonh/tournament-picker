import Link from 'next/link'
import { useState } from 'react'
import FormatForm from './FormatForm'
import ScheduleForm from './ScheduleForm'
import ParticipantsForm from './ParticipantsForm'
import { Forms } from '../../constants'

export type Format = {
  perBlock: string
  firstBlock: string
  secondBlock: string
}
export type Participants = {
  firstBlockParticipants: string[]
  secondBlockParticipants: string[]
}

export type Night = { block: string; matches: { wrestler1: string; wrestler2: string }[] }

const initialFormat: Format = null
const initialParticipants: Participants = null

const TourmanentBuilder = (): JSX.Element => {
  const [activeForm, setActiveForm] = useState(Forms.Format)
  const [tournamentFormat, setTournamentFormat] = useState(initialFormat)
  const [tournamentParticipants, setTournamentParticipants] = useState(initialParticipants)
  const handleFormatSubmit = (format: Format) => {
    setTournamentFormat(format)
    setActiveForm(Forms.Participants)
  }
  const handleParticipantsSubmit = (participants: Participants) => {
    setTournamentParticipants(participants)
    setActiveForm(Forms.Schedule)
  }
  const handleFinalSubmit = ({ nights }: { nights: Night[] }) => {
    const tournament = { format: tournamentFormat, participants: tournamentParticipants, nights }
    console.log(JSON.stringify(tournament, null, 2))
  }
  return (
    <div>
      <Link href="/">Go Home, Dipshit</Link>
      <p>Only handles G1 format for now</p>
      <div>
        <button onClick={() => setActiveForm(Forms.Format)}>Format</button>
        <button onClick={() => setActiveForm(Forms.Participants)} disabled={!tournamentFormat}>
          Participants
        </button>
        <button onClick={() => setActiveForm(Forms.Schedule)}>Schedule</button>
      </div>
      <FormatForm activeForm={activeForm} handleSubmit={handleFormatSubmit} />
      <ParticipantsForm activeForm={activeForm} format={tournamentFormat} handleSubmit={handleParticipantsSubmit} />
      <ScheduleForm
        activeForm={activeForm}
        participants={tournamentParticipants}
        format={tournamentFormat}
        handleSubmit={handleFinalSubmit}
      />
    </div>
  )
}

export default TourmanentBuilder
