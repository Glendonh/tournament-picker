import { CompleteTournament, Pick } from '.'

export const G1Climax2024: CompleteTournament = {
  format: {
    tournamentName: '2024 G1 Climax',
    numberOfBlocks: '2',
    blockNames: [{ name: 'A Block' }, { name: 'B Block' }],
    participantsPer: '10',
    numberOfNights: '16',
    numberAdvancing: '6',
  },
  participants: {
    allParticipants: [
      {
        blockName: 'A Block',
        blockParticipants: [
          { name: 'Zack Sabre Jr.' },
          { name: 'Evil' },
          { name: 'Shingo Takagi' },
          { name: 'Gabe Kidd' },
          { name: 'Tetsuya Naito' },
          { name: 'Jake Lee' },
          { name: 'Sanada' },
          { name: 'Callum Newman' },
          { name: 'Shota Umino' },
          { name: 'Great-O-Khan' },
        ],
      },
      {
        blockName: 'B Block',
        blockParticipants: [
          { name: 'Yuya Uemura' },
          { name: 'Henare' },
          { name: 'Konosuke Takeshita' },
          { name: 'Ren Narita' },
          { name: 'Hirooki Goto' },
          { name: 'Boltin Oleg' },
          { name: 'Jeff Cobb' },
          { name: 'El Phantasmo' },
          { name: 'Yota Tsuji' },
          { name: 'David Finlay' },
        ],
      },
    ],
  },
  schedule: {
    nights: [
      {
        matches: [
          { wrestler1: 'Tetsuya Naito', wrestler2: 'Shingo Takagi' },
          { wrestler1: 'Shota Umino', wrestler2: 'Callum Newman' },
          { wrestler1: 'Sanada', wrestler2: 'Jake Lee' },
          { wrestler1: 'Gabe Kidd', wrestler2: 'Evil' },
          { wrestler1: 'Zack Sabre Jr.', wrestler2: 'Great-O-Khan' },
          { wrestler1: 'Yota Tsuji', wrestler2: 'Konosuke Takeshita' },
          { wrestler1: 'Hirooki Goto', wrestler2: 'Jeff Cobb' },
          { wrestler1: 'El Phantasmo', wrestler2: 'Henare' },
          { wrestler1: 'Yuya Uemura', wrestler2: 'David Finlay' },
          { wrestler1: 'Ren Narita', wrestler2: 'Boltin Oleg' },
        ],
      },
      {
        matches: [
          { wrestler1: 'Tetsuya Naito', wrestler2: 'Zack Sabre Jr.' },
          { wrestler1: 'Shota Umino', wrestler2: 'Shingo Takagi' },
          { wrestler1: 'Jake Lee', wrestler2: 'Evil' },
          { wrestler1: 'Great-O-Khan', wrestler2: 'Gabe Kidd' },
          { wrestler1: 'Sanada', wrestler2: 'Callum Newman' },
          { wrestler1: 'El Phantasmo', wrestler2: 'Ren Narita' },
          { wrestler1: 'Yota Tsuji', wrestler2: 'David Finlay' },
          { wrestler1: 'Hirooki Goto', wrestler2: 'Yuya Uemura' },
          { wrestler1: 'Henare', wrestler2: 'Boltin Oleg' },
        ],
      },
      {
        matches: [
          { wrestler1: 'Tetsuya Naito', wrestler2: 'Jake Lee' },
          { wrestler1: 'Sanada', wrestler2: 'Evil' },
          { wrestler1: 'Shota Umino', wrestler2: 'Gabe Kidd' },
          { wrestler1: 'Shingo Takagi', wrestler2: 'Great-O-Khan' },
          { wrestler1: 'Zack Sabre Jr.', wrestler2: 'Callum Newman' },
          { wrestler1: 'Jeff Cobb', wrestler2: 'Konosuke Takeshita' },
        ],
      },
      {
        matches: [
          { wrestler1: 'El Phantasmo', wrestler2: 'Yota Tsuji' },
          { wrestler1: 'Henare', wrestler2: 'David Finlay' },
          { wrestler1: 'Hirooki Goto', wrestler2: 'Boltin Oleg' },
          { wrestler1: 'Yuya Uemura', wrestler2: 'Konosuke Takeshita' },
          { wrestler1: 'Jeff Cobb', wrestler2: 'Ren Narita' },
        ],
      },
      {
        matches: [
          { wrestler1: 'Tetsuya Naito', wrestler2: 'Evil' },
          { wrestler1: 'Shota Umino', wrestler2: 'Great-O-Khan' },
          { wrestler1: 'Sanada', wrestler2: 'Gabe Kidd' },
          { wrestler1: 'Shingo Takagi', wrestler2: 'Callum Newman' },
          { wrestler1: 'Zack Sabre Jr.', wrestler2: 'Jake Lee' },
        ],
      },
      {
        matches: [
          { wrestler1: 'Henare', wrestler2: 'Konosuke Takeshita' },
          { wrestler1: 'El Phantasmo', wrestler2: 'Boltin Oleg' },
          { wrestler1: 'Hirooki Goto', wrestler2: 'Yota Tsuji' },
          { wrestler1: 'Yuya Uemura', wrestler2: 'Jeff Cobb' },
          { wrestler1: 'David Finlay', wrestler2: 'Ren Narita' },
        ],
      },
      {
        matches: [
          { wrestler1: 'Shota Umino', wrestler2: 'Zack Sabre Jr.' },
          { wrestler1: 'Tetsuya Naito', wrestler2: 'Sanada' },
          { wrestler1: 'Shingo Takagi', wrestler2: 'Gabe Kidd' },
          { wrestler1: 'Great-O-Khan', wrestler2: 'Jake Lee' },
          { wrestler1: 'Evil', wrestler2: 'Callum Newman' },
        ],
      },
      {
        matches: [
          { wrestler1: 'Yuya Uemura', wrestler2: 'Henare' },
          { wrestler1: 'El Phantasmo', wrestler2: 'Jeff Cobb' },
          { wrestler1: 'Hirooki Goto', wrestler2: 'Ren Narita' },
          { wrestler1: 'Yota Tsuji', wrestler2: 'Boltin Oleg' },
          { wrestler1: 'Konosuke Takeshita', wrestler2: 'David Finlay' },
        ],
      },
      {
        matches: [
          { wrestler1: 'Shingo Takagi', wrestler2: 'Zack Sabre Jr.' },
          { wrestler1: 'Shota Umino', wrestler2: 'Sanada' },
          { wrestler1: 'Tetsuya Naito', wrestler2: 'Gabe Kidd' },
          { wrestler1: 'Great-O-Khan', wrestler2: 'Evil' },
          { wrestler1: 'Jake Lee', wrestler2: 'Callum Newman' },
        ],
      },
      {
        matches: [
          { wrestler1: 'Jeff Cobb', wrestler2: 'Henare' },
          { wrestler1: 'El Phantasmo', wrestler2: 'Yuya Uemura' },
          { wrestler1: 'Hirooki Goto', wrestler2: 'Konosuke Takeshita' },
          { wrestler1: 'Yota Tsuji', wrestler2: 'Ren Narita' },
          { wrestler1: 'David Finlay', wrestler2: 'Boltin Oleg' },
        ],
      },
      {
        matches: [
          { wrestler1: 'Zack Sabre Jr.', wrestler2: 'Evil' },
          { wrestler1: 'Shota Umino', wrestler2: 'Tetsuya Naito' },
          { wrestler1: 'Shingo Takagi', wrestler2: 'Sanada' },
          { wrestler1: 'Great-O-Khan', wrestler2: 'Callum Newman' },
          { wrestler1: 'Gabe Kidd', wrestler2: 'Jake Lee' },
        ],
      },
      {
        matches: [
          { wrestler1: 'Yuya Uemura', wrestler2: 'Ren Narita' },
          { wrestler1: 'El Phantasmo', wrestler2: 'Konosuke Takeshita' },
          { wrestler1: 'Hirooki Goto', wrestler2: 'David Finlay' },
          { wrestler1: 'Yota Tsuji', wrestler2: 'Henare' },
          { wrestler1: 'Jeff Cobb', wrestler2: 'Boltin Oleg' },
        ],
      },
      {
        matches: [
          { wrestler1: 'Zack Sabre Jr.', wrestler2: 'Gabe Kidd' },
          { wrestler1: 'Shota Umino', wrestler2: 'Jake Lee' },
          { wrestler1: 'Tetsuya Naito', wrestler2: 'Callum Newman' },
          { wrestler1: 'Shingo Takagi', wrestler2: 'Evil' },
          { wrestler1: 'Sanada', wrestler2: 'Great-O-Khan' },
        ],
      },
      {
        matches: [
          { wrestler1: 'Yota Tsuji', wrestler2: 'Yuya Uemura' },
          { wrestler1: 'Hirooki Goto', wrestler2: 'El Phantasmo' },
          { wrestler1: 'Jeff Cobb', wrestler2: 'David Finlay' },
          { wrestler1: 'Henare', wrestler2: 'Ren Narita' },
          { wrestler1: 'Konosuke Takeshita', wrestler2: 'Boltin Oleg' },
        ],
      },
      {
        matches: [
          { wrestler1: 'Tetsuya Naito', wrestler2: 'Great-O-Khan' },
          { wrestler1: 'Shota Umino', wrestler2: 'Evil' },
          { wrestler1: 'Shingo Takagi', wrestler2: 'Jake Lee' },
          { wrestler1: 'Sanada', wrestler2: 'Zack Sabre Jr.' },
          { wrestler1: 'Gabe Kidd', wrestler2: 'Callum Newman' },
        ],
      },
      {
        matches: [
          { wrestler1: 'Yota Tsuji', wrestler2: 'Jeff Cobb' },
          { wrestler1: 'El Phantasmo', wrestler2: 'David Finlay' },
          { wrestler1: 'Hirooki Goto', wrestler2: 'Henare' },
          { wrestler1: 'Yuya Uemura', wrestler2: 'Boltin Oleg' },
          { wrestler1: 'Konosuke Takeshita', wrestler2: 'Ren Narita' },
        ],
      },
    ],
  },
  bracket: {
    bracketMatches: [
      { p1: { blockIndex: 0, seedIndex: 1 }, p2: { blockIndex: 0, seedIndex: 2 }, round: 'first', matchNumber: 1 },
      { p1: { blockIndex: 1, seedIndex: 1 }, p2: { blockIndex: 1, seedIndex: 2 }, round: 'first', matchNumber: 2 },
      { p1: { blockIndex: 0, seedIndex: 0 }, p2: { winnerOf: 1 }, round: 'second', matchNumber: 3 },
      { p1: { blockIndex: 1, seedIndex: 0 }, p2: { winnerOf: 2 }, round: 'second', matchNumber: 4 },
      { p1: { winnerOf: 3 }, p2: { winnerOf: 4 }, round: 'third', matchNumber: 5 },
    ],
  },
}

export const G1Picks24: Pick[] = [
  {
    userName: 'Jim Dave',
    id: '1',
    tiebreaker: '15:00',
    nights: [
      {
        matches: [
          { winner: 'Tetsuya Naito' },
          { winner: 'Shota Umino' },
          { winner: 'Sanada' },
          { winner: 'Gabe Kidd' },
          { winner: 'Zack Sabre Jr.' },
          { winner: 'Yota Tsuji' },
          { winner: 'Hirooki Goto' },
          { winner: 'El Phantasmo' },
          { winner: 'Yuya Uemura' },
          { winner: 'Ren Narita' },
        ],
      },
      {
        matches: [
          { winner: 'Tetsuya Naito' },
          { winner: 'Shota Umino' },
          { winner: 'Jake Lee' },
          { winner: 'Great-O-Khan' },
          { winner: 'Sanada' },
          { winner: 'El Phantasmo' },
          { winner: 'Yota Tsuji' },
          { winner: 'Hirooki Goto' },
          { winner: 'Henare' },
        ],
      },
      {
        matches: [
          { winner: 'Tetsuya Naito' },
          { winner: 'Sanada' },
          { winner: 'Shota Umino' },
          { winner: 'Shingo Takagi' },
          { winner: 'Zack Sabre Jr.' },
          { winner: 'Jeff Cobb' },
        ],
      },
      {
        matches: [
          { winner: 'El Phantasmo' },
          { winner: 'Henare' },
          { winner: 'Hirooki Goto' },
          { winner: 'Yuya Uemura' },
          { winner: 'Jeff Cobb' },
        ],
      },
      {
        matches: [
          { winner: 'Tetsuya Naito' },
          { winner: 'Shota Umino' },
          { winner: 'Sanada' },
          { winner: 'Shingo Takagi' },
          { winner: 'Zack Sabre Jr.' },
        ],
      },
      {
        matches: [
          { winner: 'Henare' },
          { winner: 'El Phantasmo' },
          { winner: 'Hirooki Goto' },
          { winner: 'Yuya Uemura' },
          { winner: 'David Finlay' },
        ],
      },
      {
        matches: [
          { winner: 'Shota Umino' },
          { winner: 'Tetsuya Naito' },
          { winner: 'Shingo Takagi' },
          { winner: 'Great-O-Khan' },
          { winner: 'Evil' },
        ],
      },
      {
        matches: [
          { winner: 'Yuya Uemura' },
          { winner: 'El Phantasmo' },
          { winner: 'Hirooki Goto' },
          { winner: 'Yota Tsuji' },
          { winner: 'Konosuke Takeshita' },
        ],
      },
      {
        matches: [
          { winner: 'Shingo Takagi' },
          { winner: 'Shota Umino' },
          { winner: 'Tetsuya Naito' },
          { winner: 'Great-O-Khan' },
          { winner: 'Jake Lee' },
        ],
      },
      {
        matches: [
          { winner: 'Jeff Cobb' },
          { winner: 'El Phantasmo' },
          { winner: 'Hirooki Goto' },
          { winner: 'Yota Tsuji' },
          { winner: 'David Finlay' },
        ],
      },
      {
        matches: [
          { winner: 'Zack Sabre Jr.' },
          { winner: 'Shota Umino' },
          { winner: 'Shingo Takagi' },
          { winner: 'Great-O-Khan' },
          { winner: 'Gabe Kidd' },
        ],
      },
      {
        matches: [
          { winner: 'Yuya Uemura' },
          { winner: 'El Phantasmo' },
          { winner: 'Hirooki Goto' },
          { winner: 'Yota Tsuji' },
          { winner: 'Jeff Cobb' },
        ],
      },
      {
        matches: [
          { winner: 'Zack Sabre Jr.' },
          { winner: 'Shota Umino' },
          { winner: 'Tetsuya Naito' },
          { winner: 'Shingo Takagi' },
          { winner: 'Sanada' },
        ],
      },
      {
        matches: [
          { winner: 'Yota Tsuji' },
          { winner: 'Hirooki Goto' },
          { winner: 'Jeff Cobb' },
          { winner: 'Henare' },
          { winner: 'Konosuke Takeshita' },
        ],
      },
      {
        matches: [
          { winner: 'Tetsuya Naito' },
          { winner: 'Shota Umino' },
          { winner: 'Shingo Takagi' },
          { winner: 'Sanada' },
          { winner: 'Gabe Kidd' },
        ],
      },
      {
        matches: [
          { winner: 'Yota Tsuji' },
          { winner: 'El Phantasmo' },
          { winner: 'Hirooki Goto' },
          { winner: 'Yuya Uemura' },
          { winner: 'Konosuke Takeshita' },
        ],
      },
    ],
    bracket: [
      { winner: 'Zack Sabre Jr.', matchNumber: 1 },
      { winner: 'Konosuke Takeshita', matchNumber: 2 },
      { winner: 'Sanada', matchNumber: 3 },
      { winner: 'Hirooki Goto', matchNumber: 4 },
      { winner: 'Sanada', matchNumber: 5 },
    ],
    seeds: [
      { blockName: 'A Block', seeds: [{ name: 'Sanada' }, { name: 'Zack Sabre Jr.' }, { name: 'Shingo Takagi' }] },
      {
        blockName: 'B Block',
        seeds: [{ name: 'Hirooki Goto' }, { name: 'Yuya Uemura' }, { name: 'Konosuke Takeshita' }],
      },
    ],
  },
  {
    userName: 'Pippin Took',
    id: '2',
    tiebreaker: '20:00',
    nights: [
      {
        matches: [
          { winner: 'Shingo Takagi' },
          { winner: 'Callum Newman' },
          { winner: 'Jake Lee' },
          { winner: 'Evil' },
          { winner: 'Great-O-Khan' },
          { winner: 'Konosuke Takeshita' },
          { winner: 'Jeff Cobb' },
          { winner: 'Henare' },
          { winner: 'David Finlay' },
          { winner: 'Boltin Oleg' },
        ],
      },
      {
        matches: [
          { winner: 'Zack Sabre Jr.' },
          { winner: 'Shingo Takagi' },
          { winner: 'Evil' },
          { winner: 'Gabe Kidd' },
          { winner: 'Callum Newman' },
          { winner: 'Ren Narita' },
          { winner: 'David Finlay' },
          { winner: 'Yuya Uemura' },
          { winner: 'Boltin Oleg' },
        ],
      },
      {
        matches: [
          { winner: 'Jake Lee' },
          { winner: 'Evil' },
          { winner: 'Gabe Kidd' },
          { winner: 'Great-O-Khan' },
          { winner: 'Callum Newman' },
          { winner: 'Konosuke Takeshita' },
        ],
      },
      {
        matches: [
          { winner: 'Yota Tsuji' },
          { winner: 'David Finlay' },
          { winner: 'Boltin Oleg' },
          { winner: 'Konosuke Takeshita' },
          { winner: 'Ren Narita' },
        ],
      },
      {
        matches: [
          { winner: 'Evil' },
          { winner: 'Great-O-Khan' },
          { winner: 'Gabe Kidd' },
          { winner: 'Callum Newman' },
          { winner: 'Jake Lee' },
        ],
      },
      {
        matches: [
          { winner: 'Konosuke Takeshita' },
          { winner: 'Boltin Oleg' },
          { winner: 'Yota Tsuji' },
          { winner: 'Jeff Cobb' },
          { winner: 'Ren Narita' },
        ],
      },
      {
        matches: [
          { winner: 'Zack Sabre Jr.' },
          { winner: 'Sanada' },
          { winner: 'Gabe Kidd' },
          { winner: 'Jake Lee' },
          { winner: 'Callum Newman' },
        ],
      },
      {
        matches: [
          { winner: 'Henare' },
          { winner: 'Jeff Cobb' },
          { winner: 'Ren Narita' },
          { winner: 'Boltin Oleg' },
          { winner: 'David Finlay' },
        ],
      },
      {
        matches: [
          { winner: 'Zack Sabre Jr.' },
          { winner: 'Sanada' },
          { winner: 'Gabe Kidd' },
          { winner: 'Evil' },
          { winner: 'Callum Newman' },
        ],
      },
      {
        matches: [
          { winner: 'Henare' },
          { winner: 'Yuya Uemura' },
          { winner: 'Konosuke Takeshita' },
          { winner: 'Ren Narita' },
          { winner: 'Boltin Oleg' },
        ],
      },
      {
        matches: [
          { winner: 'Evil' },
          { winner: 'Tetsuya Naito' },
          { winner: 'Sanada' },
          { winner: 'Callum Newman' },
          { winner: 'Jake Lee' },
        ],
      },
      {
        matches: [
          { winner: 'Ren Narita' },
          { winner: 'Konosuke Takeshita' },
          { winner: 'David Finlay' },
          { winner: 'Henare' },
          { winner: 'Boltin Oleg' },
        ],
      },
      {
        matches: [
          { winner: 'Gabe Kidd' },
          { winner: 'Jake Lee' },
          { winner: 'Callum Newman' },
          { winner: 'Evil' },
          { winner: 'Great-O-Khan' },
        ],
      },
      {
        matches: [
          { winner: 'Yuya Uemura' },
          { winner: 'El Phantasmo' },
          { winner: 'David Finlay' },
          { winner: 'Ren Narita' },
          { winner: 'Boltin Oleg' },
        ],
      },
      {
        matches: [
          { winner: 'Great-O-Khan' },
          { winner: 'Evil' },
          { winner: 'Jake Lee' },
          { winner: 'Zack Sabre Jr.' },
          { winner: 'Callum Newman' },
        ],
      },
      {
        matches: [
          { winner: 'Jeff Cobb' },
          { winner: 'David Finlay' },
          { winner: 'Henare' },
          { winner: 'Boltin Oleg' },
          { winner: 'Ren Narita' },
        ],
      },
    ],
    bracket: [
      { winner: 'Shingo Takagi', matchNumber: 1 },
      { winner: 'Yuya Uemura', matchNumber: 2 },
      { winner: 'Shingo Takagi', matchNumber: 3 },
      { winner: 'Hirooki Goto', matchNumber: 4 },
      { winner: 'Hirooki Goto', matchNumber: 5 },
    ],
    seeds: [
      { blockName: 'A Block', seeds: [{ name: 'Sanada' }, { name: 'Zack Sabre Jr.' }, { name: 'Shingo Takagi' }] },
      {
        blockName: 'B Block',
        seeds: [{ name: 'Hirooki Goto' }, { name: 'Yuya Uemura' }, { name: 'Konosuke Takeshita' }],
      },
    ],
  },
  {
    userName: 'Sebastian Shaw',
    id: '3',
    tiebreaker: '47:15',
    nights: [
      {
        matches: [
          { winner: 'Tetsuya Naito' },
          { winner: 'Callum Newman' },
          { winner: 'Sanada' },
          { winner: 'Evil' },
          { winner: 'Zack Sabre Jr.' },
          { winner: 'Konosuke Takeshita' },
          { winner: 'Hirooki Goto' },
          { winner: 'Henare' },
          { winner: 'Yuya Uemura' },
          { winner: 'Boltin Oleg' },
        ],
      },
      {
        matches: [
          { winner: 'Tetsuya Naito' },
          { winner: 'Shingo Takagi' },
          { winner: 'Jake Lee' },
          { winner: 'Gabe Kidd' },
          { winner: 'Sanada' },
          { winner: 'Ren Narita' },
          { winner: 'Yota Tsuji' },
          { winner: 'Yuya Uemura' },
          { winner: 'Henare' },
        ],
      },
      {
        matches: [
          { winner: 'Jake Lee' },
          { winner: 'Sanada' },
          { winner: 'Gabe Kidd' },
          { winner: 'Shingo Takagi' },
          { winner: 'Callum Newman' },
          { winner: 'Jeff Cobb' },
        ],
      },
      {
        matches: [
          { winner: 'Yota Tsuji' },
          { winner: 'Henare' },
          { winner: 'Boltin Oleg' },
          { winner: 'Yuya Uemura' },
          { winner: 'Ren Narita' },
        ],
      },
      {
        matches: [
          { winner: 'Tetsuya Naito' },
          { winner: 'Great-O-Khan' },
          { winner: 'Sanada' },
          { winner: 'Callum Newman' },
          { winner: 'Zack Sabre Jr.' },
        ],
      },
      {
        matches: [
          { winner: 'Konosuke Takeshita' },
          { winner: 'El Phantasmo' },
          { winner: 'Yota Tsuji' },
          { winner: 'Yuya Uemura' },
          { winner: 'Ren Narita' },
        ],
      },
      {
        matches: [
          { winner: 'Zack Sabre Jr.' },
          { winner: 'Tetsuya Naito' },
          { winner: 'Gabe Kidd' },
          { winner: 'Great-O-Khan' },
          { winner: 'Callum Newman' },
        ],
      },
      {
        matches: [
          { winner: 'Yuya Uemura' },
          { winner: 'Jeff Cobb' },
          { winner: 'Hirooki Goto' },
          { winner: 'Boltin Oleg' },
          { winner: 'Konosuke Takeshita' },
        ],
      },
      {
        matches: [
          { winner: 'Zack Sabre Jr.' },
          { winner: 'Shota Umino' },
          { winner: 'Gabe Kidd' },
          { winner: 'Great-O-Khan' },
          { winner: 'Callum Newman' },
        ],
      },
      {
        matches: [
          { winner: 'Henare' },
          { winner: 'El Phantasmo' },
          { winner: 'Konosuke Takeshita' },
          { winner: 'Yota Tsuji' },
          { winner: 'Boltin Oleg' },
        ],
      },
      {
        matches: [
          { winner: 'Zack Sabre Jr.' },
          { winner: 'Tetsuya Naito' },
          { winner: 'Shingo Takagi' },
          { winner: 'Callum Newman' },
          { winner: 'Gabe Kidd' },
        ],
      },
      {
        matches: [
          { winner: 'Ren Narita' },
          { winner: 'El Phantasmo' },
          { winner: 'David Finlay' },
          { winner: 'Yota Tsuji' },
          { winner: 'Boltin Oleg' },
        ],
      },
      {
        matches: [
          { winner: 'Zack Sabre Jr.' },
          { winner: 'Jake Lee' },
          { winner: 'Tetsuya Naito' },
          { winner: 'Evil' },
          { winner: 'Sanada' },
        ],
      },
      {
        matches: [
          { winner: 'Yuya Uemura' },
          { winner: 'Hirooki Goto' },
          { winner: 'David Finlay' },
          { winner: 'Henare' },
          { winner: 'Boltin Oleg' },
        ],
      },
      {
        matches: [
          { winner: 'Tetsuya Naito' },
          { winner: 'Evil' },
          { winner: 'Shingo Takagi' },
          { winner: 'Zack Sabre Jr.' },
          { winner: 'Gabe Kidd' },
        ],
      },
      {
        matches: [
          { winner: 'Jeff Cobb' },
          { winner: 'El Phantasmo' },
          { winner: 'Henare' },
          { winner: 'Yuya Uemura' },
          { winner: 'Ren Narita' },
        ],
      },
    ],
    bracket: [
      { winner: 'Shingo Takagi', matchNumber: 1 },
      { winner: 'Yuya Uemura', matchNumber: 2 },
      { winner: 'Shingo Takagi', matchNumber: 3 },
      { winner: 'Hirooki Goto', matchNumber: 4 },
      { winner: 'Hirooki Goto', matchNumber: 5 },
    ],
    seeds: [
      { blockName: 'A Block', seeds: [{ name: 'Sanada' }, { name: 'Zack Sabre Jr.' }, { name: 'Shingo Takagi' }] },
      {
        blockName: 'B Block',
        seeds: [{ name: 'Hirooki Goto' }, { name: 'Yuya Uemura' }, { name: 'Konosuke Takeshita' }],
      },
    ],
  },
]
