import { Tournament } from '../constants'
import {
  Option,
  FormatValues,
  CompleteTournament,
  PickemFormVals,
  Seed,
  BracketFormVals,
  BracketWrestler,
} from '../types'

export const stringToOption = (str: string): Option<string> => ({ value: str, label: str })

export const generateStringOptions = (strings: string[]): Option<string>[] => strings.map(stringToOption)

export const generateNumberOptions = (min: number, max: number): Option<string>[] => {
  if (!min || !max) return []
  const options: Option<string>[] = []
  for (let n = min; n <= max; n++) {
    options.push(stringToOption(n.toString()))
  }
  return options
}

export const matchesPerBlock = (count: number): number => {
  return ((count - 1) * count) / 2
}

const getLowestSeed = (format: FormatValues): number => {
  const { numberAdvancing, numberOfBlocks } = format
  if (numberAdvancing === '2') return 1
  if (numberAdvancing === '4') {
    return numberOfBlocks === '4' ? 1 : 2
  }
  if (numberAdvancing === '6') return 3
  if (numberAdvancing === '8') return 2
}

export const getInitialPickEmVals = (tournament: CompleteTournament): PickemFormVals => {
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
export const getBracketMatchDetails = ({
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

export const exampleTournament: Tournament = {
  format: {
    perBlock: '4',
    firstBlock: 'A Block',
    secondBlock: 'B Block',
  },
  participants: {
    firstBlockParticipants: ['Kota Ibushi', 'Will Ospreay', 'Jay White', 'Kazuchika Okada'],
    secondBlockParticipants: ['Sanada', 'Evil', 'Tetsuya Naito', 'Kenta'],
  },
  nights: [
    {
      block: 'A Block',
      matches: [
        {
          wrestler1: 'Kota Ibushi',
          wrestler2: 'Will Ospreay',
        },
        {
          wrestler1: 'Jay White',
          wrestler2: 'Kazuchika Okada',
        },
      ],
    },
    {
      block: 'B Block',
      matches: [
        {
          wrestler1: 'Evil',
          wrestler2: 'Sanada',
        },
        {
          wrestler1: 'Tetsuya Naito',
          wrestler2: 'Kenta',
        },
      ],
    },
    {
      block: 'A Block',
      matches: [
        {
          wrestler1: 'Will Ospreay',
          wrestler2: 'Jay White',
        },
        {
          wrestler1: 'Kota Ibushi',
          wrestler2: 'Kazuchika Okada',
        },
      ],
    },
    {
      block: 'B Block',
      matches: [
        {
          wrestler1: 'Evil',
          wrestler2: 'Tetsuya Naito',
        },
        {
          wrestler1: 'Sanada',
          wrestler2: 'Kenta',
        },
      ],
    },
    {
      block: 'A Block',
      matches: [
        {
          wrestler1: 'Kota Ibushi',
          wrestler2: 'Jay White',
        },
        {
          wrestler1: 'Will Ospreay',
          wrestler2: 'Kazuchika Okada',
        },
      ],
    },
    {
      block: 'B Block',
      matches: [
        {
          wrestler1: 'Sanada',
          wrestler2: 'Tetsuya Naito',
        },
        {
          wrestler1: 'Evil',
          wrestler2: 'Kenta',
        },
      ],
    },
  ],
}
