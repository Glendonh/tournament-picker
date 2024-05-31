export interface FormatValues {
  numberOfBlocks: string
  blockNames: { name: string }[]
  participantsPer: string
}

export interface ParticipantsFormVals {
  allParticipants: { blockName: string; blockParticipants: { name: string }[] }[]
}

export enum Forms {
  Format = 'FORMAT',
  Participants = 'PARTICIPANTS',
  Schedule = 'SCHEDULE',
}
