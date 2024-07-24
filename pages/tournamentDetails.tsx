import { useState } from 'react'
import { Collapse } from 'react-collapse'
import { useForm } from 'react-hook-form'
import { CompleteTournament, ScheduleValues, PickemFormVals } from '../types'
import NightMatches from '../components/pickForms/NightMatches'

import { snowPrixSix } from '../test/__mocks__/tournaments'

const CollapseSection = ({ title, children }: { title: string; children: any }) => {
  const [isOpened, setIsOpened] = useState(false)
  const toggleIsOpened = () => setIsOpened((s) => !s)
  return (
    <div>
      <div className="w-40 border border-black p-1" onClick={toggleIsOpened}>
        {title}
      </div>
      <Collapse isOpened={isOpened}>{children}</Collapse>
    </div>
  )
}

const getInitialVals = (schedule: ScheduleValues): PickemFormVals => {
  const nights = schedule.nights.map((n) => {
    return { matches: n.matches.map(() => ({ winner: '' })) }
  })
  return { nights, bracket: [], seeds: [] }
}

const TournamentDetails = () => {
  const { format, participants, schedule } = snowPrixSix as CompleteTournament
  const [showEdit, setShowEdit] = useState(false)
  const toggleShowEdit = () => setShowEdit((s) => !s)
  const { control } = useForm<PickemFormVals>({ defaultValues: getInitialVals(schedule) })

  return (
    <div className="container px-3">
      <p className="text-3xl text-center">{format.tournamentName}</p>
      <button className="p-3 border border-black rounded-md" onClick={toggleShowEdit}>
        {showEdit ? 'Hide' : 'Show'}
      </button>
      {showEdit ? (
        <div>
          <p className="text-xl">Update Results</p>
          {schedule.nights.map((n, nIndex) => (
            <div key={nIndex} className="mb-2">
              <CollapseSection title={`Night ${nIndex + 1}`}>
                <NightMatches control={control} nightIndex={nIndex} schedule={schedule} />
              </CollapseSection>
            </div>
          ))}
          <ul>
            <li>update results on a nightly basis</li>
            <li>update seeds and brackets after nights are complete</li>
            <li>store results</li>
            <li>display results on summary page</li>
          </ul>
        </div>
      ) : (
        <div>
          <p className="text-xl text-center">Summary</p>
          <p className="text-xl">Participants</p>
          <div className="flex flex-row">
            {participants.allParticipants.map((block) => (
              <div key={block.blockName} className="mx-2">
                <p className="text-xl">{block.blockName}</p>
                {block.blockParticipants.map((p) => (
                  <p key={p.name}>{p.name}</p>
                ))}
              </div>
            ))}
          </div>
          <p className="text-xl">Schedule</p>
          {schedule.nights.map((n, nIndex) => (
            <div key={nIndex} className="ml-2 mb-4">
              <CollapseSection title={`Night ${nIndex + 1}`}>
                <p>Matches</p>
                <div className="ml-2">
                  {n.matches.map((match, mIndex) => (
                    <div key={`N${nIndex}M${mIndex}`}>{`${mIndex + 1}. ${match.wrestler1} vs ${match.wrestler2}`}</div>
                  ))}
                </div>
              </CollapseSection>
            </div>
          ))}
          <div>
            <p className="text-xl">Bracket</p>
            {`${format.numberAdvancing} wrestler bracket`}
          </div>
        </div>
      )}
    </div>
  )
}

export default TournamentDetails
