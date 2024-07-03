export interface FormatValues {
  tournamentName: string
  numberOfBlocks: string
  blockNames: { name: string }[]
  participantsPer: string
  numberOfNights: string
  numberAdvancing: string
}

export interface ParticipantsFormVals {
  allParticipants: { blockName: string; blockParticipants: { name: string }[] }[]
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

export interface NightValues {
  nights: Night[]
}

export interface Option {
  value: string
  label: string
}

export interface RoundMatch {
  round: string
  matchNumber: number
}

export interface BracketMatch extends RoundMatch {
  wrestler1: string
  wrestler2: string
}

export interface BracketFormVals {
  bracketMatches: BracketMatch[]
}

export interface CompleteTournament {
  format: FormatValues
  participants: ParticipantsFormVals
  schedule: NightValues
  bracket: BracketFormVals
}

export interface PickemFormVals {
  nights: { matches: { winner: string }[] }[]
  bracket: { winner: string }[]
}
