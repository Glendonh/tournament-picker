import { useEffect } from 'react'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import ControlledSelect from '../../components/ControlledSelect'
import { FormatValues, Forms } from '../../types'

interface BracketFormProps {
  format: FormatValues
  activeForm: Forms
}

interface RoundMatch {
  round: number
  matchNumber: number
}

interface BracketMatch extends RoundMatch {
  wrestler1: string
  wrestler2: string
}

interface BracketFormVals {
  bracketMatches: BracketMatch[]
}

const getInitialBracket = (format: FormatValues): BracketMatch[] => {
  if (!format) return []
  const { numberAdvancing } = format
  const roundsAndMatches: RoundMatch[] = [{ round: 1, matchNumber: 1 }]
  if (numberAdvancing === '4') {
    roundsAndMatches.push({ round: 1, matchNumber: 2 }, { round: 2, matchNumber: 3 })
  }
  if (numberAdvancing === '6') {
    roundsAndMatches.push(
      { round: 1, matchNumber: 2 },
      { round: 2, matchNumber: 3 },
      { round: 2, matchNumber: 4 },
      { round: 3, matchNumber: 5 }
    )
  }
  if (numberAdvancing === '8') {
    roundsAndMatches.push(
      { round: 1, matchNumber: 2 },
      { round: 1, matchNumber: 3 },
      { round: 1, matchNumber: 4 },
      { round: 2, matchNumber: 5 },
      { round: 2, matchNumber: 6 },
      { round: 3, matchNumber: 7 }
    )
  }
  console.log(roundsAndMatches)
  return roundsAndMatches.map((partial) => ({ wrestler1: '', wrestler2: '', ...partial }))
}

const BracketForm = ({ format, activeForm }: BracketFormProps) => {
  if (!format || activeForm !== Forms.Bracket) return null
  const { control, register, handleSubmit } = useForm<BracketFormVals>({
    defaultValues: { bracketMatches: getInitialBracket(format) },
  })
  const { fields, replace } = useFieldArray({ control, name: 'bracketMatches' })
  useEffect(() => {
    replace(getInitialBracket(format))
  }, [format.numberAdvancing, replace])
  console.log(fields)
  return (
    <div>
      <form>
        {fields.map((f) => {
          return (
            <div key={f.id}>
              <p>{`Round ${f.round} Number ${f.matchNumber}`}</p>
            </div>
          )
        })}
      </form>
    </div>
  )
}

export default BracketForm
