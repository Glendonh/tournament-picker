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
