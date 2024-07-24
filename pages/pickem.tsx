import { useForm } from 'react-hook-form'
import { PickemFormVals, CompleteTournament, BracketFormVals, FormatValues, BracketWrestler, Seed } from '../types'
import { generateStringOptions } from '../utils'
import NightMatches from '../components/pickForms/NightMatches'
import SeedsSection from '../components/pickForms/SeedsSection'
import BracketSection from '../components/pickForms/BracketSection'

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

const getInitialVals = (tournament: CompleteTournament): PickemFormVals => {
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
  return bracket.bracketMatches.map((match) => {
    const { p1, p2 } = match
    const p1Label = getWrestlerLabel({ wrestler: p1, seeds, bracketPicks })
    const p2Label = getWrestlerLabel({ wrestler: p2, seeds, bracketPicks })
    const label = `${p1Label} vs ${p2Label}`
    const options = generateStringOptions([p1Label, p2Label])
    return { label, options }
  })
}

const PickEmPage = () => {
  // Placeholder until fetching logic is decided
  const activeTournament = snowPrixSix
  const { control, watch } = useForm<PickemFormVals>({ defaultValues: getInitialVals(activeTournament) })
  const bracketPicks = watch('bracket')
  const currentSeeds = watch('seeds')
  const matchDetails = getBracketMatchDetails({ seeds: currentSeeds, bracketPicks, bracket: activeTournament.bracket })
  return (
    <div className="container mx-3 mb-4">
      <form>
        {activeTournament.schedule.nights.map((night, nIndex) => (
          <div key={`night${nIndex + 1}`}>
            <p className="text-lg">{`Night ${nIndex + 1}`}</p>
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
