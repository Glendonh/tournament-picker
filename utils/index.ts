import { Tournament } from '../constants'
import {
  Option,
  FormatValues,
  Participants,
  CompleteTournament,
  PickemFormVals,
  Seed,
  BracketFormVals,
  BracketWrestler,
  Lookup,
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

export const getWrestlerNameFromId = (id: string, participants: Participants): string => {
  return participants.lookup[id] ?? ''
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
  return { nights, bracket, seeds, tiebreaker: '' }
}

const getWrestlerDetails = ({
  wrestler,
  seeds,
  bracketPicks,
  lookup,
}: {
  wrestler: BracketWrestler
  seeds: Seed[]
  bracketPicks: { winner: string; matchNumber: number }[]
  lookup: Lookup
}): { label: string; option?: Option<string> } => {
  const { winnerOf, blockIndex, seedIndex } = wrestler
  let label = ''
  let option: Option<string>
  if (winnerOf) {
    const selectedWinner = bracketPicks.find((m) => m.matchNumber === winnerOf)?.winner
    if (selectedWinner) {
      label = lookup[selectedWinner]
      option = { label: lookup[selectedWinner], value: selectedWinner }
    } else {
      label = `Winner of match #${winnerOf}`
    }
  }
  if (!isNaN(blockIndex) && !isNaN(seedIndex)) {
    const selectedSeed = seeds[blockIndex].seeds[seedIndex]?.name
    if (selectedSeed) {
      label = lookup[selectedSeed]
      option = { label: lookup[selectedSeed], value: selectedSeed }
    } else {
      label = `${seeds[blockIndex].blockName} ${seedIndex + 1} seed`
    }
  }
  return { label, option }
}

export const getBracketMatchDetails = ({
  seeds,
  bracketPicks,
  bracket,
  lookup,
}: {
  seeds: Seed[]
  bracketPicks: { winner: string; matchNumber: number }[]
  bracket: BracketFormVals
  lookup: Lookup
}) => {
  return bracket.bracketMatches.map((match) => {
    const { p1, p2 } = match
    const p1Details = getWrestlerDetails({ wrestler: p1, seeds, bracketPicks, lookup })
    const p2Details = getWrestlerDetails({ wrestler: p2, seeds, bracketPicks, lookup })
    const label = `${p1Details.label} vs ${p2Details.label}`
    const options = [p1Details.option, p2Details.option].filter((o) => o)
    return { label, options }
  })
}

export const getMatchResultString = (winner: string, match: { wrestler1: string; wrestler2: string }) => {
  const { wrestler1, wrestler2 } = match
  if (winner === 'draw') return `${match.wrestler1} draws ${wrestler2}`
  if (!winner) return `${wrestler1} vs ${wrestler2}`
  const loser = winner === wrestler1 ? wrestler2 : wrestler1
  return `${winner} defeats ${loser}`
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
