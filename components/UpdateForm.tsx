import { useForm } from 'react-hook-form'
import CollapseSection from './CollapseSection'
import BracketSection from './pickForms/BracketSection'
import NightMatches from './pickForms/NightMatches'
import SeedsSection from './pickForms/SeedsSection'
import { getBracketMatchDetails } from '../utils'
import { PickemFormVals, CompleteTournament } from '../types'

interface UpdateFormProps {
  onSubmit: (data: PickemFormVals) => void
  results: PickemFormVals
  tournament: CompleteTournament
}

const UpdateForm = (props: UpdateFormProps) => {
  const { schedule, participants, bracket } = props.tournament
  const { control, watch, handleSubmit } = useForm<PickemFormVals>({
    defaultValues: props.results,
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
              <button className="p-1 border border-black bg-slate-400 rounded-md mt-2 ml-2" type="submit">
                SAVE
              </button>
            </CollapseSection>
          </div>
        ))}
        <CollapseSection title="Seeds">
          <SeedsSection control={control} participants={participants} currentSeeds={currentSeeds} />
          <button className="p-1 border border-black bg-slate-400 rounded-md mt-2 ml-2" type="submit">
            SAVE
          </button>
        </CollapseSection>
        <CollapseSection title="Bracket">
          <BracketSection control={control} bracket={bracket} matchDetails={matchDetails} picks={bracketPicks} />
          <button className="p-1 border border-black bg-slate-400 rounded-md mt-2 ml-2" type="submit">
            SAVE
          </button>
        </CollapseSection>
        <button className="border border-black rounded-md p-3 mt-3" type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  )
}

export default UpdateForm
