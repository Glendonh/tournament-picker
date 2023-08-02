import { Tournament } from '../constants'

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
