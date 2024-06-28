import { Tournament } from '../constants'

export const stringToOption = (str: string) => ({ value: str, label: str })

export const stringsToOptions = (strings: string[]) => strings.map(stringToOption)

export const generateNumberOptions = (min: number, max: number): { value: string; label: string }[] => {
  if (!min || !max) return []
  const options: { value: string; label: string }[] = []
  for (let n = min; n <= max; n++) {
    options.push(stringToOption(n.toString()))
  }
  return options
}

export const matchesPerBlock = (count: number): number => {
  return ((count - 1) * count) / 2
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
