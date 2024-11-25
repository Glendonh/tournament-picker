'use client'
import { useState } from 'react'
import FormatForm from './FormatForm'
import ParticipantsForm from './ParticipantsForm'
import ScheduleForm from './ScheduleForm'
import BracketForm from './BracketForm'
import { FormatValues, ParticipantsFormVals, Participants, ScheduleValues, Forms, BracketFormVals } from '../../types'
import { getWrestlerNameFromId } from '../../utils'

const formatParticipants = (pForm: ParticipantsFormVals): Participants => {
  const lookup = {}
  pForm.blocks.forEach((block) => {
    block.blockParticipants.forEach((p) => {
      lookup[p.id] = p.name
    })
  })
  return { ...pForm, lookup }
}

const TourmanentBuilder = (): JSX.Element => {
  const [activeForm, setActiveForm] = useState(Forms.Format)
  const [format, setFormat] = useState<FormatValues>()
  const [participants, setParticipants] = useState<Participants>()
  const [schedule, setSchedule] = useState<ScheduleValues>()
  const [bracket, setBracket] = useState<BracketFormVals>()
  const setFormSection = (section: Forms) => () => {
    setActiveForm(section)
  }
  const saveFormat = (vals: FormatValues) => {
    setFormat(vals)
    setActiveForm(Forms.Participants)
  }

  const saveParticipants = (vals: ParticipantsFormVals) => {
    setParticipants(formatParticipants(vals))
    setActiveForm(Forms.Schedule)
  }

  const saveSchedule = (vals: ScheduleValues) => {
    setSchedule(vals)
    setActiveForm(Forms.Bracket)
  }

  const saveBracket = (vals: BracketFormVals) => {
    setBracket(vals)
    setActiveForm(Forms.Review)
    console.log(JSON.stringify({ format, participants, schedule, bracket }))
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
      <button disabled={!format} onClick={setFormSection(Forms.Bracket)}>
        Bracket
      </button>
      <button disabled={!schedule} onClick={setFormSection(Forms.Review)}>
        Review
      </button>
      <h1>{activeForm}</h1>
      <FormatForm activeForm={activeForm} currentFormat={format} saveFormat={saveFormat} />
      <ParticipantsForm activeForm={activeForm} format={format} saveParticipants={saveParticipants} />
      <ScheduleForm activeForm={activeForm} participants={participants} format={format} saveSchedule={saveSchedule} />
      <BracketForm activeForm={activeForm} format={format} saveBracket={saveBracket} />
      {activeForm === Forms.Review ? (
        <div>
          <h2>Blocks</h2>
          {participants.blocks.map((block) => (
            <div key={block.blockName}>
              <h3>{block.blockName}</h3>
              <div className="p-1">
                {block.blockParticipants.map((participant) => (
                  <p key={participant.name}>{participant.name}</p>
                ))}
              </div>
            </div>
          ))}
          <h2>Schedule</h2>
          {schedule?.nights.map((night, nIndex) => (
            <div key={nIndex}>
              <p>{`Night ${nIndex + 1}`}</p>
              {night.matches.map(({ wrestler1, wrestler2 }) => (
                <div key={`${wrestler1}${wrestler2}`} className="p-1">{`${getWrestlerNameFromId(
                  wrestler1,
                  participants
                )} vs ${getWrestlerNameFromId(wrestler2, participants)}`}</div>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default TourmanentBuilder
