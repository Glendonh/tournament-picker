import { CompleteTournament, Pick } from '.'

export const MarvelPrix: CompleteTournament = {
  format: {
    tournamentName: 'Marvel Prix',
    numberOfBlocks: '2',
    blockNames: [{ name: 'Heroes' }, { name: 'Villains' }],
    participantsPer: '4',
    numberOfNights: '6',
    numberAdvancing: '4',
  },
  participants: {
    blocks: [
      {
        blockName: 'Heroes',
        blockParticipants: [
          { name: 'Captain America', id: 'A0' },
          { name: 'Iron Man', id: 'A1' },
          { name: 'Black Widow', id: 'A2' },
          { name: 'Spider-Man', id: 'A3' },
        ],
      },
      {
        blockName: 'Villains',
        blockParticipants: [
          { name: 'Red Skull', id: 'B0' },
          { name: 'Mandarin', id: 'B1' },
          { name: 'Taskmaster', id: 'B2' },
          { name: 'Green Goblin', id: 'B3' },
        ],
      },
    ],
    lookup: {
      A0: 'Captain America',
      A1: 'Iron Man',
      A2: 'Black Widow',
      A3: 'Spider-Man',
      B0: 'Red Skull',
      B1: 'Mandarin',
      B2: 'Taskmaster',
      B3: 'Green Goblin',
    },
  },
  schedule: {
    nights: [
      {
        matches: [
          { wrestler1: 'A0', wrestler2: 'A1' },
          { wrestler1: 'A2', wrestler2: 'A3' },
        ],
      },
      {
        matches: [
          { wrestler1: 'B0', wrestler2: 'B1' },
          { wrestler1: 'B2', wrestler2: 'B3' },
        ],
      },
      {
        matches: [
          { wrestler1: 'A0', wrestler2: 'A2' },
          { wrestler1: 'A1', wrestler2: 'A3' },
        ],
      },
      {
        matches: [
          { wrestler1: 'B0', wrestler2: 'B2' },
          { wrestler1: 'B1', wrestler2: 'B3' },
        ],
      },
      {
        matches: [
          { wrestler1: 'A0', wrestler2: 'A3' },
          { wrestler1: 'A1', wrestler2: 'A2' },
        ],
      },
      {
        matches: [
          { wrestler1: 'B0', wrestler2: 'B3' },
          { wrestler1: 'B1', wrestler2: 'B2' },
        ],
      },
    ],
  },
  bracket: {
    bracketMatches: [
      { p1: { blockIndex: 0, seedIndex: 0 }, p2: { blockIndex: 0, seedIndex: 1 }, round: 'first', matchNumber: 1 },
      { p1: { blockIndex: 1, seedIndex: 0 }, p2: { blockIndex: 1, seedIndex: 1 }, round: 'first', matchNumber: 2 },
      { p1: { winnerOf: 1 }, p2: { winnerOf: 2 }, round: 'second', matchNumber: 3 },
    ],
  },
}

export const G1Picks24: Pick[] = []
