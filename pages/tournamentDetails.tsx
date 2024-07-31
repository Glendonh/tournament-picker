import { useState } from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { PickemFormVals, CompleteTournament } from '../types'
import { getInitialPickEmVals, getBracketMatchDetails } from '../utils'
import NightMatches from '../components/pickForms/NightMatches'
import SeedsSection from '../components/pickForms/SeedsSection'
import BracketSection from '../components/pickForms/BracketSection'
import CollapseSection from '../components/CollapseSection'

// import { snowPrixSix } from '../test/__mocks__/tournaments'
import { G1Climax2024 } from '../types/dummyData'

interface UpdateFormProps {
  onSubmit: (data: PickemFormVals) => void
  tournament: CompleteTournament
}

export const UpdateForm = (props: UpdateFormProps) => {
  const { schedule, participants, bracket } = props.tournament
  const { control, watch, handleSubmit } = useForm<PickemFormVals>({
    defaultValues: getInitialPickEmVals(props.tournament),
  })
  const bracketPicks = watch('bracket')
  const currentSeeds = watch('seeds')
  const matchDetails = getBracketMatchDetails({ seeds: currentSeeds, bracketPicks, bracket: bracket })
  return (
    <div>
      <p className="text-xl">Update Results</p>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        {schedule.nights.map((n, nIndex) => (
          <div key={nIndex} className="mb-2">
            <CollapseSection title={`Night ${nIndex + 1}`}>
              <NightMatches control={control} nightIndex={nIndex} schedule={schedule} />
            </CollapseSection>
          </div>
        ))}
        <CollapseSection title="Seeds">
          <SeedsSection control={control} participants={participants} currentSeeds={currentSeeds} />
        </CollapseSection>
        <CollapseSection title="Bracket">
          <BracketSection control={control} bracket={bracket} matchDetails={matchDetails} picks={bracketPicks} />
        </CollapseSection>
        <button className="border border-black rounded-md p-3 mt-3" type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  )
}

const TournamentDetails = () => {
  const { format, participants, schedule, bracket } = G1Climax2024
  const [showEdit, setShowEdit] = useState(false)
  const [results, setResults] = useState<PickemFormVals>(getInitialPickEmVals(G1Climax2024))
  const toggleShowEdit = () => setShowEdit((s) => !s)
  const matchDetails = getBracketMatchDetails({ seeds: results.seeds, bracketPicks: results.bracket, bracket: bracket })

  return (
    <div className="container px-3">
      <Head>
        <title>Tournament Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className="text-3xl text-center">{format.tournamentName}</p>
      <button className="p-3 border border-black rounded-md" onClick={toggleShowEdit}>
        {showEdit ? 'Hide' : 'Show'}
      </button>
      {showEdit ? (
        <div>
          <UpdateForm tournament={G1Climax2024} onSubmit={setResults} />
          <ul className="list-inside list-disc">
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
                <p className="text-l font-semibold">{block.blockName}</p>
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
                  {n.matches.map((match, mIndex) => {
                    const matchWinner = results?.nights[nIndex]?.matches[mIndex]?.winner
                    return (
                      <div key={`N${nIndex}M${mIndex}`} className={matchWinner === 'draw' ? 'bg-slate-400' : ''}>
                        {`${mIndex + 1}. `}
                        <span className={match.wrestler1 === matchWinner ? 'bg-green-500' : ''}>{match.wrestler1}</span>
                        {` vs `}
                        <span className={match.wrestler2 === matchWinner ? 'bg-green-500' : ''}>{match.wrestler2}</span>
                      </div>
                    )
                  })}
                </div>
              </CollapseSection>
            </div>
          ))}
          <div>
            <p className="text-xl">Seeds</p>
            <div className="flex flex-row">
              {results.seeds.map((block) => (
                <div key={block.blockName + 'seeds'} className="ml-3">
                  <p className="text-l font-semibold">{block.blockName}</p>
                  {block.seeds.map((seed, i) => (
                    <p key={`${block.blockName}seed${i}`}>{`${i + 1}. ${seed.name}`}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xl">Bracket</p>
            {matchDetails.map((details, i) => (
              <div key={details.label}>{`${i + 1}. ${details.label}`}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TournamentDetails
