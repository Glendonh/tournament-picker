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
