import PickerButtons from '../inputs/PickerButtons'
import { useFieldArray, Control } from 'react-hook-form'
import { BracketFormVals, PickemFormVals } from '../../types'

interface BracketSectionProps {
  control: Control<PickemFormVals>
  bracket: BracketFormVals
  picks: { winner: string }[]
  matchDetails: { label: string; options: any[] }[]
}

// Bracket logic is slightly more complicated than I had anticipated and will need to be adjusted a little
const BracketSection = ({ control, bracket, matchDetails }: BracketSectionProps) => {
  const { fields } = useFieldArray({ control, name: 'bracket' })
  return (
    <div>
      {fields.map((field, index) => {
        const bracketMatch = bracket.bracketMatches[index]
        return (
          <div key={field.id}>
            <p>{`${bracketMatch.round} round match# ${bracketMatch.matchNumber}`}</p>
            <label>{matchDetails[index].label}</label>
            <PickerButtons control={control} name={`bracket.${index}.winner`} options={matchDetails[index].options} />
          </div>
        )
      })}
    </div>
  )
}

export default BracketSection
