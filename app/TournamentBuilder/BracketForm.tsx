import { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import ControlledSelect from '../../components/inputs/ControlledSelect'
import { FormatValues, Forms } from '../../types'
import { Option, RoundMatch, BracketMatch, BracketFormVals, BracketWrestler } from '../../types'

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
  return roundsAndMatches.map((partial) => ({ p1: {}, p2: {}, ...partial }))
}

const getOptionsByRound = (
  format: FormatValues
): {
  first: Option<BracketWrestler>[]
  second: Option<BracketWrestler>[]
  third: Option<BracketWrestler>[]
} => {
  const { numberAdvancing, numberOfBlocks, blockNames } = format
  if (numberAdvancing === '2') {
    return {
      first: blockNames.map((block, i) => ({ label: block.name, value: { blockIndex: i, seedIndex: 0 } })),
      second: [],
      third: [],
    }
  }
  if (numberAdvancing === '4') {
    const first =
      numberOfBlocks === '4'
        ? blockNames.map((block, blockIndex) => ({ label: block.name, value: { blockIndex, seedIndex: 0 } }))
        : blockNames.reduce<Option<BracketWrestler>[]>((acc, block, blockIndex) => {
            const blockSeeds = [0, 1].map((seed) => ({
              label: `${block.name} Seed: ${seed + 1}`,
              value: { blockIndex, seedIndex: seed },
            }))
            return acc.concat(blockSeeds)
          }, [])
    const second = [
      { label: 'Winner of Match 1', value: { winnerOf: 1 } },
      { label: 'Winner of Match 2', value: { winnerOf: 2 } },
    ]
    return { first, second, third: [] }
  }
  if (numberAdvancing === '6') {
    const r1Seeds = [1, 2]
    const first = blockNames.reduce((acc, block, blockIndex) => {
      const blockSeeds = r1Seeds.map((seed) => ({
        label: `${block.name} Seed: ${seed + 1}`,
        value: { blockIndex, seedIndex: seed },
      }))
      return acc.concat(blockSeeds)
    }, [])
    const topSeeds: Option<BracketWrestler>[] = blockNames.map((block, blockIndex) => ({
      label: `${block.name} Seed: 1`,
      value: { blockIndex, seedIndex: 0 },
    }))
    const r1Winners = [
      { label: 'Winner of Match 1', value: { winnerOf: 1 } },
      { label: 'Winner of Match 2', value: { winnerOf: 2 } },
    ]
    const second = topSeeds.concat(r1Winners)
    const third = [
      { label: 'Winner of Match 3', value: { winnerOf: 3 } },
      { label: 'Winner of Match 4', value: { winnerOf: 4 } },
    ]
    return { first, second, third }
  }
  if (numberAdvancing === '8') {
    const seeds = [1, 2]
    const first = blockNames.reduce<Option<BracketWrestler>[]>((acc, block, blockIndex) => {
      const blockSeeds = seeds.map((seed) => ({
        label: `${block.name} Seed: ${seed + 1}`,
        value: { blockIndex, seedIndex: seed },
      }))
      return acc.concat(blockSeeds)
    }, [])
    const firstRoundMatches = [1, 2, 3, 4]
    const second = firstRoundMatches.map((matchNumber) => ({
      label: `Winner of Match ${matchNumber}`,
      value: { winnerOf: matchNumber },
    }))
    const secondRoundMatches = [5, 6]
    const third = secondRoundMatches.map((matchNumber) => ({
      label: `Winner of Match ${matchNumber}`,
      value: { winnerOf: matchNumber },
    }))
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
                name={`bracketMatches[${i}].p1`}
                control={control}
                options={optionsByRound[f.round]}
                required
                errorMessage={errors.bracketMatches?.[i]?.p1?.message}
              />
              <ControlledSelect
                name={`bracketMatches[${i}].p2`}
                control={control}
                options={optionsByRound[f.round]}
                required
                errorMessage={errors.bracketMatches?.[i]?.p2?.message}
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
