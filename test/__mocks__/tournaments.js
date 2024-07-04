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
        blockParticipants: [{ name: 'dopey' }, { name: 'grumpy' }, { name: 'doc' }, { name: 'snow white' }],
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
          { wrestler1: 'doc', wrestler2: 'snow white' },
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
          { wrestler1: 'grumpy', wrestler2: 'snow white' },
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
          { wrestler1: 'dopey', wrestler2: 'snow white' },
          { wrestler1: 'grumpy', wrestler2: 'doc' },
        ],
      },
    ],
  },
  bracket: { bracketMatches: [{ wrestler1: 'A block', wrestler2: 'B block', round: 'first', matchNumber: 1 }] },
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
    { wrestler1: 'A block Seed: 2', wrestler2: 'A block Seed: 3', round: 'first', matchNumber: 1 },
    { wrestler1: 'B block Seed: 2', wrestler2: 'B block Seed: 3', round: 'first', matchNumber: 2 },
    { wrestler1: 'A block Seed: 1', wrestler2: 'Winner of Match 1', round: 'second', matchNumber: 3 },
    { wrestler1: 'Winner of Match 2', wrestler2: 'B block Seed: 1', round: 'second', matchNumber: 4 },
    { wrestler1: 'Winner of Match 3', wrestler2: 'Winner of Match 4', round: 'third', matchNumber: 5 },
  ],
}

export const snowPrixSix = { ...snowPrix, bracket: sixBracket, format: sixFormat }
