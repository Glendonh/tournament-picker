import { useForm, useFieldArray, Control } from 'react-hook-form'
import ControlledSelect from '../components/ControlledSelect'
import {
  PickemFormVals,
  CompleteTournament,
  NightValues,
  BracketFormVals,
  FormatValues,
  ParticipantsFormVals,
  Option,
} from '../types'
import { stringsToOptions, stringToOption } from '../utils'

import { snowPrixSix } from '../test/__mocks__/tournaments'

const getLowestSeed = (format: FormatValues): number => {
  const { numberAdvancing, numberOfBlocks } = format
  if (numberAdvancing === '2') return 1
  if (numberAdvancing === '4') {
    return numberOfBlocks === '4' ? 1 : 2
  }
  if (numberAdvancing === '6') return 3
  if (numberAdvancing === '8') return 2
}

const getInitalVals = (tournament: CompleteTournament): PickemFormVals => {
  const nights = tournament.schedule.nights.map((n) => {
    return { matches: n.matches.map(() => ({ winner: '' })) }
  })
  const bracket = tournament.bracket.bracketMatches.map(() => ({ winner: '' }))
  const lowestSeed = getLowestSeed(tournament.format)
  const seeds = tournament.format.blockNames.map((block) => {
    return { blockName: block.name, seeds: Array(lowestSeed).fill('') }
  })
  return { nights, bracket, seeds }
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

interface SeedsSectionProps {
  control: Control<PickemFormVals>
  participants: ParticipantsFormVals
  currentSeeds: { blockName: string; seeds: string[] }[]
}

const getAvailableBlockOptions = ({
  participants,
  blockIndex,
  currentSeeds,
}: {
  currentSeeds: { blockName: string; seeds: string[] }[]
  blockIndex: number
  participants: ParticipantsFormVals
}): Option[] => {
  const selectedBlockParticipants = currentSeeds[blockIndex].seeds
  return participants.allParticipants[blockIndex].blockParticipants.reduce<Option[]>((acc, participant) => {
    if (selectedBlockParticipants.includes(participant.name)) {
      return acc
    }
    return acc.concat(stringToOption(participant.name))
  }, [])
}

const SeedsSection = ({ control, participants, currentSeeds }: SeedsSectionProps) => {
  return (
    <>
      {participants.allParticipants.map((block, bIndex) => {
        // @ts-expect-error not sure why it doesn't like the name of this fieldArray
        const { fields } = useFieldArray({ control, name: `seeds.${bIndex}.seeds` })
        return (
          <div key={block.blockName}>
            <p>{block.blockName}</p>
            {fields.map((seed, sIndex) => (
              <div key={seed.id}>
                <label htmlFor={`seeds.${bIndex}.seeds.${sIndex}`}>{`${block.blockName} #${sIndex + 1}`}</label>
                <ControlledSelect
                  control={control}
                  options={getAvailableBlockOptions({ currentSeeds, blockIndex: bIndex, participants })}
                  name={`seeds.${bIndex}.seeds.${sIndex}`}
                />
              </div>
            ))}
          </div>
        )
      })}
    </>
  )
}

interface BracketSectionProps {
  control: Control<PickemFormVals>
  bracket: BracketFormVals
  picks: { winner: string }[]
  lowestSeed: number
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
            <label>{`${bracketMatch.wrestler1} vs ${bracketMatch.wrestler2}`}</label>
            <ControlledSelect
              control={control}
              name={`bracket.${index}.winner`}
              options={stringsToOptions([bracketMatch.wrestler1, bracketMatch.wrestler2])}
            />
          </div>
        )
      })}
    </div>
  )
}

const getOptionsForMatches = ({
  seeds,
  bracketPicks,
  bracket,
}: {
  seeds: { blockName: string; seeds: string[] }[]
  bracketPicks: { winner: string }[]
  bracket: BracketFormVals
}) => {
  console.log({ seeds, bracketPicks, bracket })
  // This is making me rethink some of the basic structure of how I'm doing this
  // I can reverser engineer everything I need out of the data I have,
  // but it would be garbage, more or less
}

const PickEmPage = () => {
  // Placeholder until fetching logic is decided
  const activeTournament = snowPrixSix
  const { control, watch } = useForm<PickemFormVals>({ defaultValues: getInitalVals(activeTournament) })
  const bracketPicks = watch('bracket')
  const currentSeeds = watch('seeds')
  const lowestSeed = getLowestSeed(activeTournament.format)
  getOptionsForMatches({ seeds: currentSeeds, bracketPicks, bracket: activeTournament.bracket })
  return (
    <div className="container mx-3 mb-4">
      <form>
        {activeTournament.schedule.nights.map((night, nIndex) => (
          <div key={`night${nIndex + 1}`}>
            <p>{`Night ${nIndex + 1}`}</p>
            <NightMatches control={control} nightIndex={nIndex} schedule={activeTournament.schedule} />
          </div>
        ))}
        <SeedsSection control={control} participants={activeTournament.participants} currentSeeds={currentSeeds} />
        <BracketSection
          control={control}
          bracket={activeTournament.bracket}
          picks={bracketPicks}
          lowestSeed={lowestSeed}
        />
      </form>
    </div>
  )
}

export default PickEmPage
