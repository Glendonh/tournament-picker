export interface Format {
  perBlock: string
  firstBlock: string
  secondBlock: string
}

export interface Participants {
  firstBlockParticipants: string[]
  secondBlockParticipants: string[]
}

export interface Night {
  block: string
  matches: {
    wrestler1: string
    wrestler2: string
  }[]
}
export interface Tournament {
  format: Format
  participants: Participants
  nights: Night[]
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
          wrestler1: 'Sanada',
          wrestler2: 'Evil',
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
    {
      block: 'A Block',
      matches: [
        {
          wrestler1: 'Kota Ibushi',
          wrestler2: 'Kazuchika Okada',
        },
        {
          wrestler1: 'Will Ospreay',
          wrestler2: 'Jay White',
        },
      ],
    },
    {
      block: 'B Block',
      matches: [
        {
          wrestler1: 'Sanada',
          wrestler2: 'Kenta',
        },
        {
          wrestler1: 'Evil',
          wrestler2: 'Tetsuya Naito',
        },
      ],
    },
  ],
}
