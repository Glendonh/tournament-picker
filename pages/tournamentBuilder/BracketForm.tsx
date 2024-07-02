import { useEffect } from 'react'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import ControlledSelect from '../../components/ControlledSelect'
import { FormatValues, Forms } from '../../types'
import { stringsToOptions, stringToOption } from '../../utils'
import { Option } from '../../types'

interface BracketFormProps {
  format: FormatValues
  activeForm: Forms
}

interface RoundMatch {
  round: string
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
  const roundsAndMatches: RoundMatch[] = [{ round: 'first', matchNumber: 1 }]
  if (numberAdvancing === '4') {
    roundsAndMatches.push({ round: 'first', matchNumber: 2 }, { round: 'second', matchNumber: 3 })
  }
  if (numberAdvancing === '6') {
    roundsAndMatches.push(
      { round: 'first', matchNumber: 2 },
      { round: 'second', matchNumber: 3 },
      { round: 'second', matchNumber: 4 },
      { round: 'third', matchNumber: 5 }
    )
  }
  if (numberAdvancing === '8') {
    roundsAndMatches.push(
      { round: 'first', matchNumber: 2 },
      { round: 'first', matchNumber: 3 },
      { round: 'first', matchNumber: 4 },
      { round: 'second', matchNumber: 5 },
      { round: 'second', matchNumber: 6 },
      { round: 'third', matchNumber: 7 }
    )
  }
  return roundsAndMatches.map((partial) => ({ wrestler1: '', wrestler2: '', ...partial }))
}

const getOptionsByRound = (format: FormatValues): { first: Option[]; second: Option[]; third: Option[] } => {
  const { numberAdvancing, numberOfBlocks, blockNames } = format
  if (numberAdvancing === '2') {
    return {
      first: blockNames.map((block) => stringToOption(block.name)),
      second: [],
      third: [],
    }
  }
  if (numberAdvancing === '6') {
    const r1Seeds = [2, 3]
    const first = blockNames.reduce<Option[]>((acc, block) => {
      const blockSeeds = r1Seeds.map((seed) => stringToOption(`${block.name} Seed: ${seed}`))
      return acc.concat(blockSeeds)
    }, [])
    const topSeeds = blockNames.map((block) => stringToOption(`${block.name} Seed: 1`))
    const r1Winners = stringsToOptions(['Winner of Match 1', 'Winner of Match 2'])
    const second = topSeeds.concat(r1Winners)
    const third = stringsToOptions(['Winner of Match 3', 'Winner of Match 4'])
    return { first, second, third }
  }
  return { first: [], second: [], third: [] }
}

const BracketForm = ({ format, activeForm }: BracketFormProps) => {
  if (!format || activeForm !== Forms.Bracket) return null
  const { control, register, handleSubmit, watch } = useForm<BracketFormVals>({
    defaultValues: { bracketMatches: getInitialBracket(format) },
  })
  const { fields, replace } = useFieldArray({ control, name: 'bracketMatches' })
  useEffect(() => {
    replace(getInitialBracket(format))
  }, [format.numberAdvancing, replace])
  const optionsByRound = getOptionsByRound(format)
  const vals = watch()
  console.log(vals)
  return (
    <div>
      <form>
        {fields.map((f, i) => {
          return (
            <div key={f.id}>
              <p>{`${f.round} round match #${f.matchNumber}`}</p>
              <ControlledSelect
                name={`bracketMatches[${i}].wrestler1`}
                control={control}
                options={optionsByRound[f.round]}
              />
              <ControlledSelect
                name={`bracketMatches[${i}].wrestler2`}
                control={control}
                options={optionsByRound[f.round]}
              />
            </div>
          )
        })}
      </form>
    </div>
  )
}

export default BracketForm
