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
  BracketWrestler,
  Seed,
} from '../types'
import { stringsToOptions, stringToOption } from '../utils'

import { snowPrix } from '../test/__mocks__/tournaments'

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
  const bracket = tournament.bracket.bracketMatches.map((m, i) => ({ winner: '', matchNumber: i + 1 }))
  const lowestSeed = getLowestSeed(tournament.format)
  const seeds = tournament.format.blockNames.map((block) => {
    return { blockName: block.name, seeds: Array(lowestSeed).fill({ name: '' }) }
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
  currentSeeds: Seed[]
}

const getAvailableBlockOptions = ({
  participants,
  blockIndex,
  currentSeeds,
}: {
  currentSeeds: Seed[]
  blockIndex: number
  participants: ParticipantsFormVals
}): Option<string>[] => {
  const selectedBlockParticipants = currentSeeds[blockIndex].seeds.map((p) => p.name)
  return participants.allParticipants[blockIndex].blockParticipants.reduce<Option<string>[]>((acc, participant) => {
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
                  name={`seeds.${bIndex}.seeds.${sIndex}.name`}
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
            <ControlledSelect
              control={control}
              name={`bracket.${index}.winner`}
              options={matchDetails[index].options}
            />
          </div>
        )
      })}
    </div>
  )
}

const getWrestlerLabel = ({
  wrestler,
  seeds,
  bracketPicks,
}: {
  wrestler: BracketWrestler
  seeds: Seed[]
  bracketPicks: { winner: string; matchNumber: number }[]
}): string => {
  const { winnerOf, blockIndex, seedIndex } = wrestler
  if (winnerOf) {
    const selectedWinner = bracketPicks.find((m) => m.matchNumber === winnerOf)?.winner
    return selectedWinner || `Winner of match #${winnerOf}`
  }
  if (!isNaN(blockIndex) && !isNaN(seedIndex)) {
    const selectedSeed = seeds[blockIndex].seeds[seedIndex]?.name
    return selectedSeed || `${seeds[blockIndex].blockName} ${seedIndex + 1} seed`
  }
  return ''
}

// TODO: Prevent blank options
const getBracketMatchDetails = ({
  seeds,
  bracketPicks,
  bracket,
}: {
  seeds: Seed[]
  bracketPicks: { winner: string; matchNumber: number }[]
  bracket: BracketFormVals
}) => {
  const rVal = bracket.bracketMatches.map((match) => {
    const { p1, p2 } = match
    const p1Label = getWrestlerLabel({ wrestler: p1, seeds, bracketPicks })
    const p2Label = getWrestlerLabel({ wrestler: p2, seeds, bracketPicks })
    const label = `${p1Label} vs ${p2Label}`
    const options = stringsToOptions([p1Label, p2Label])
    return { label, options }
  })
  return rVal
}

const PickEmPage = () => {
  // Placeholder until fetching logic is decided
  const activeTournament = snowPrix
  const { control, watch } = useForm<PickemFormVals>({ defaultValues: getInitalVals(activeTournament) })
  const bracketPicks = watch('bracket')
  const currentSeeds = watch('seeds')
  const matchDetails = getBracketMatchDetails({ seeds: currentSeeds, bracketPicks, bracket: activeTournament.bracket })
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
          matchDetails={matchDetails}
        />
      </form>
    </div>
  )
}

export default PickEmPage
