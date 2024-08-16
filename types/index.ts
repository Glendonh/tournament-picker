export interface FormatValues {
  tournamentName: string
  numberOfBlocks: string
  blockNames: { name: string }[]
  participantsPer: string
  numberOfNights: string
  numberAdvancing: string
}

export interface Participant {
  name: string
  id: string
}

export interface ParticipantsFormVals {
  blocks: { blockName: string; blockParticipants: Participant[] }[]
}

export interface Lookup {
  [key: string]: string
}

export interface Participants extends ParticipantsFormVals {
  lookup: Lookup
}

export enum Forms {
  Format = 'FORMAT',
  Participants = 'PARTICIPANTS',
  Schedule = 'SCHEDULE',
  Bracket = 'BRACKET',
  Review = 'REVIEW',
}

export interface Night {
  block?: string
  matches: { wrestler1: string; wrestler2: string }[]
}

export interface ScheduleValues {
  nights: Night[]
}

export interface Option<Type> {
  label: string
  value: Type
}

export interface RoundMatch {
  round: string
  matchNumber: number
}

export interface BracketWrestler {
  winnerOf?: number
  blockIndex?: number
  seedIndex?: number
}

export interface BracketMatch extends RoundMatch {
  p1: BracketWrestler
  p2: BracketWrestler
}

export interface BracketFormVals {
  bracketMatches: BracketMatch[]
}

export interface CompleteTournament {
  format: FormatValues
  participants: Participants
  schedule: ScheduleValues
  bracket: BracketFormVals
}

export interface Seed {
  blockName: string
  seeds: { name: string }[]
}

export interface PickemFormVals {
  nights: { matches: { winner: string }[] }[]
  seeds: Seed[]
  bracket: { winner: string; matchNumber: number }[]
  tiebreaker: string
}

export interface Pick extends PickemFormVals {
  id: string
  userName: string
}
