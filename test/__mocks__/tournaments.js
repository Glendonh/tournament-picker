export const snowPrix = {
  format: {
    tournamentName: 'Snow Prix',
    numberOfBlocks: '2',
    blockNames: [{ name: 'A block' }, { name: 'B block' }],
    participantsPer: '4',
    numberOfNights: '6',
    numberAdvancing: '2',
  },
  participants: {
    allParticipants: [
      {
        blockName: 'A block',
        blockParticipants: [{ name: 'happy' }, { name: 'sleepy' }, { name: 'sneezy' }, { name: 'bashful' }],
      },
      {
        blockName: 'B block',
        blockParticipants: [{ name: 'dopey' }, { name: 'grumpy' }, { name: 'doc' }, { name: '"Hangman" Adam Page' }],
      },
    ],
  },
  schedule: {
    nights: [
      {
        matches: [
          { wrestler1: 'happy', wrestler2: 'sleepy' },
          { wrestler1: 'sneezy', wrestler2: 'bashful' },
        ],
      },
      {
        matches: [
          { wrestler1: 'dopey', wrestler2: 'grumpy' },
          { wrestler1: 'doc', wrestler2: '"Hangman" Adam Page' },
        ],
      },
      {
        matches: [
          { wrestler1: 'happy', wrestler2: 'bashful' },
          { wrestler1: 'sleepy', wrestler2: 'sneezy' },
        ],
      },
      {
        matches: [
          { wrestler1: 'dopey', wrestler2: 'doc' },
          { wrestler1: 'grumpy', wrestler2: '"Hangman" Adam Page' },
        ],
      },
      {
        matches: [
          { wrestler1: 'happy', wrestler2: 'sneezy' },
          { wrestler1: 'sleepy', wrestler2: 'bashful' },
        ],
      },
      {
        matches: [
          { wrestler1: 'dopey', wrestler2: '"Hangman" Adam Page' },
          { wrestler1: 'grumpy', wrestler2: 'doc' },
        ],
      },
    ],
  },
  bracket: {
    bracketMatches: [
      { p1: { blockIndex: 0, seedIndex: 0 }, p2: { blockIndex: 1, seedIndex: 0 }, round: 'first', matchNumber: 1 },
    ],
  },
}

const sixFormat = {
  tournamentName: 'Snow Prix',
  numberOfBlocks: '2',
  blockNames: [{ name: 'A block' }, { name: 'B block' }],
  participantsPer: '4',
  numberOfNights: '6',
  numberAdvancing: '6',
}

const sixBracket = {
  bracketMatches: [
    { p1: { blockIndex: 0, seedIndex: 1 }, p2: { blockIndex: 0, seedIndex: 2 }, round: 'first', matchNumber: 1 },
    { p1: { blockIndex: 1, seedIndex: 1 }, p2: { blockIndex: 1, seedIndex: 2 }, round: 'first', matchNumber: 2 },
    { p1: { blockIndex: 0, seedIndex: 0 }, p2: { winnerOf: 1 }, round: 'second', matchNumber: 3 },
    { p1: { blockIndex: 1, seedIndex: 0 }, p2: { winnerOf: 2 }, round: 'second', matchNumber: 4 },
    { p1: { winnerOf: 3 }, p2: { winnerOf: 4 }, round: 'third', matchNumber: 5 },
  ],
}

export const snowPrixSix = { ...snowPrix, bracket: sixBracket, format: sixFormat }
