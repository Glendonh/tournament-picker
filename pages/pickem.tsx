import { useForm, useFieldArray, Control } from 'react-hook-form'
import ControlledSelect from '../components/ControlledSelect'
import { PickemFormVals, CompleteTournament, NightValues, BracketFormVals } from '../types'
import { stringsToOptions } from '../utils'

import { snowPrix } from '../test/__mocks__/tournaments'

const getInitalVals = (tournament: CompleteTournament): PickemFormVals => {
  const nights = tournament.schedule.nights.map((n) => {
    return { matches: n.matches.map(() => ({ winner: '' })) }
  })
  const bracket = tournament.bracket.bracketMatches.map(() => ({ winner: '' }))
  return { nights, bracket }
}

interface NightMatchesProps {
  control: Control<PickemFormVals>
  nightIndex: number
  schedule: NightValues
}

const getMatchLabel = (schedule: NightValues, nightIndex: number, matchIndex: number): string => {
  const match = schedule.nights[nightIndex].matches[matchIndex]
  return `${match.wrestler1} vs ${match.wrestler2}`
}

const getRoundRobinMatchOptions = (schedule: NightValues, nightIndex: number, matchIndex: number) => {
  const { wrestler1, wrestler2 } = schedule.nights[nightIndex].matches[matchIndex]
  return stringsToOptions([wrestler1, wrestler2, 'draw'])
}

const NightMatches = ({ control, nightIndex, schedule }: NightMatchesProps) => {
  const { fields } = useFieldArray({ control, name: `nights.${nightIndex}.matches` })
  return (
    <div className="ml-2">
      {fields.map((match, mIndex) => (
        <div key={match.id}>
          <p>{`Match ${mIndex + 1}`}</p>
          <label>{getMatchLabel(schedule, nightIndex, mIndex)}</label>
          <ControlledSelect
            control={control}
            name={`nights.${nightIndex}.matches.${mIndex}.winner`}
            options={getRoundRobinMatchOptions(schedule, nightIndex, mIndex)}
          />
        </div>
      ))}
    </div>
  )
}

interface BracketSectionProps {
  control: Control<PickemFormVals>
  bracket: BracketFormVals
  picks: { winner: string }[]
}

// Bracket logic is slightly more complicated than I had anticipated and will need to be adjusted a little
const BracketSection = ({ control, bracket }: BracketSectionProps) => {
  const { fields } = useFieldArray({ control, name: 'bracket' })
  return (
    <div>
      {fields.map((field, index) => {
        const bracketMatch = bracket.bracketMatches[index]
        return (
          <div key={field.id}>
            <p>{`${bracketMatch.round} round match# ${bracketMatch.matchNumber}`}</p>
          </div>
        )
      })}
    </div>
  )
}

const PickEmPage = () => {
  // Placeholder until fetching logic is decided
  const activeTournament = snowPrix
  const { control, watch } = useForm({ defaultValues: getInitalVals(activeTournament) })
  const bracketPicks = watch('bracket')
  return (
    <div className="container mx-3 mb-4">
      <form>
        {activeTournament.schedule.nights.map((night, nIndex) => (
          <div key={`night${nIndex + 1}`}>
            <p>{`Night ${nIndex + 1}`}</p>
            <NightMatches control={control} nightIndex={nIndex} schedule={activeTournament.schedule} />
          </div>
        ))}
        <BracketSection control={control} bracket={activeTournament.bracket} picks={bracketPicks} />
      </form>
    </div>
  )
}

export default PickEmPage
