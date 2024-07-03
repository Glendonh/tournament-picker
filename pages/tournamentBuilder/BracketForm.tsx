import { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import ControlledSelect from '../../components/ControlledSelect'
import { FormatValues, Forms } from '../../types'
import { stringsToOptions, stringToOption } from '../../utils'
import { Option, RoundMatch, BracketMatch, BracketFormVals } from '../../types'

interface BracketFormProps {
  format: FormatValues
  activeForm: Forms
  saveBracket: (bracket: BracketFormVals) => void
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
  if (numberAdvancing === '4') {
    const first =
      numberOfBlocks === '4'
        ? blockNames.map((block) => stringToOption(block.name))
        : blockNames.reduce<Option[]>((acc, block) => {
            const blockSeeds = [1, 2].map((seed) => stringToOption(`${block.name} Seed: ${seed}`))
            return acc.concat(blockSeeds)
          }, [])
    const second = stringsToOptions(['Winner of Match 1', 'Winner of Match 2'])
    return { first, second, third: [] }
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
  if (numberAdvancing === '8') {
    const seeds = [1, 2]
    const first = blockNames.reduce<Option[]>((acc, block) => {
      const blockSeeds = seeds.map((seed) => stringToOption(`${block.name} Seed: ${seed}`))
      return acc.concat(blockSeeds)
    }, [])
    const firstRoundMatches = [1, 2, 3, 4]
    const second = firstRoundMatches.map((matchNumber) => stringToOption(`Winner of Match ${matchNumber}`))
    const secondRoundMatches = [5, 6]
    const third = secondRoundMatches.map((matchNumber) => stringToOption(`Winner of Match ${matchNumber}`))
    return { first, second, third }
  }
  return { first: [], second: [], third: [] }
}

const BracketForm = ({ format, activeForm, saveBracket }: BracketFormProps) => {
  if (!format || activeForm !== Forms.Bracket) return null
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BracketFormVals>({
    defaultValues: { bracketMatches: getInitialBracket(format) },
  })
  const { fields, replace } = useFieldArray({ control, name: 'bracketMatches' })
  useEffect(() => {
    replace(getInitialBracket(format))
  }, [format.numberAdvancing, replace])
  const optionsByRound = getOptionsByRound(format)
  return (
    <div>
      <form onSubmit={handleSubmit(saveBracket)}>
        {fields.map((f, i) => {
          return (
            <div key={f.id}>
              <p>{`${f.round} round match #${f.matchNumber}`}</p>
              <ControlledSelect
                name={`bracketMatches[${i}].wrestler1`}
                control={control}
                options={optionsByRound[f.round]}
                required
                errorMessage={errors.bracketMatches?.[i]?.wrestler1?.message}
              />
              <ControlledSelect
                name={`bracketMatches[${i}].wrestler2`}
                control={control}
                options={optionsByRound[f.round]}
                required
                errorMessage={errors.bracketMatches?.[i]?.wrestler2?.message}
              />
            </div>
          )
        })}
        <button className="border p-1 px-2" type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default BracketForm
