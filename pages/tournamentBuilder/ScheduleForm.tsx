import { useForm, useFieldArray, Control, FieldArrayWithId } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import ControlledSelect from '../../components/ControlledSelect'
import { Forms, ParticipantsFormVals, FormatValues, NightValues, Night, Option } from '../../types'
import { stringToOption } from '../../utils'

interface ScheduleFormProps {
  activeForm: Forms
  participants: ParticipantsFormVals
  format: FormatValues
  saveSchedule: (vals: NightValues) => void
}

const getInitialVals = (format?: FormatValues): NightValues => {
  if (!format || !format.numberOfNights) return { nights: [] }
  return { nights: Array(Number(format.numberOfNights)).fill({ matches: [{ wrestler1: '', wrestler2: '' }] }) }
}

const getOptionsFromNights =
  ({ nights, participants }: { nights: Night[]; participants: ParticipantsFormVals }) =>
  ({ nightIndex, matchIndex, blockName }: { nightIndex: number; matchIndex: number; blockName: string }): Option[] => {
    if (!nights.length || !blockName) {
      return []
    }
    const activeBlockWrestlers =
      participants.allParticipants
        .find((block) => block.blockName === blockName)
        ?.blockParticipants.map((w) => w.name) ?? []
    const activeNight = nights[nightIndex]
    const wrestlingTonight = activeNight.matches.reduce((acc, match) => {
      if (match.wrestler1 || match.wrestler2) {
        if (match.wrestler1) {
          acc.push(match.wrestler1)
        }
        if (match.wrestler2) {
          acc.push(match.wrestler2)
        }
      }
      return acc
    }, [])
    const notWrestlingTonight = activeBlockWrestlers.filter((wrestler) => !wrestlingTonight.includes(wrestler))
    const activeMatch = nights[nightIndex].matches[matchIndex]
    if ((!activeMatch.wrestler1 && !activeMatch.wrestler2) || (activeMatch.wrestler1 && activeMatch.wrestler2)) {
      return notWrestlingTonight.map(stringToOption)
    }
    const filteredWrestler = activeMatch.wrestler1 || activeMatch.wrestler2
    const alreadyBookedAgainst = nights.reduce((acc, night) => {
      night.matches.forEach((match) => {
        if (match.wrestler1 === filteredWrestler && match.wrestler2) {
          acc.push(match.wrestler2)
        }
        if (match.wrestler2 === filteredWrestler && match.wrestler1) {
          acc.push(match.wrestler1)
        }
      })
      return acc
    }, [])
    return notWrestlingTonight.filter((w) => !alreadyBookedAgainst.includes(w)).map(stringToOption)

    return []
  }

// Saving for validation

// const findRemainingMatches = (nights: Night[], format: FormatValues): number => {
//   const matchesAssigned = nights.reduce((acc, night) => {
//     acc += night.matches.length
//     return acc
//   }, 0)
//   const totalMatches = matchesPerBlock(Number(format.participantsPer)) * Number(format.numberOfBlocks)
//   return totalMatches - matchesAssigned
// }

interface ParticipantsInputProps {
  nightIndex: number
  matchIndex: number
  control: Control<NightValues>
  blockValues: Option[]
  showRemove: boolean
  removeMatch: (index: number) => void
  getOptionsForMatch: (vals: { nightIndex: number; matchIndex: number; blockName: string }) => Option[]
}

// TODO: should finish logic here to restrict to valid options

const ParticipantsInput = ({
  nightIndex,
  matchIndex,
  control,
  blockValues,
  removeMatch,
  showRemove,
  getOptionsForMatch,
}: ParticipantsInputProps) => {
  const wrestler1Label = `nights.${nightIndex}.matches.${matchIndex}.wrestler1`
  const wrestler2Label = `nights.${nightIndex}.matches.${matchIndex}.wrestler2`
  const [selectedBlock, setSelectedBlock] = useState('')
  const wrasslers = getOptionsForMatch({ nightIndex, matchIndex, blockName: selectedBlock })
  return (
    <div className="mx-4">
      <p>{`Match ${matchIndex + 1}`}</p>
      <div className="flex flex-row">
        <div className="w-36">
          <label>Block</label>
          <Select options={blockValues} onChange={(v) => setSelectedBlock(v.value)} />
        </div>
        <div className="w-1/4">
          <label htmlFor={wrestler1Label}>First Wrestler</label>
          <ControlledSelect name={wrestler1Label} options={wrasslers} control={control} />
        </div>
        <div className="w-1/4">
          <label htmlFor={wrestler2Label}>Second Wrestler</label>
          <ControlledSelect name={wrestler2Label} options={wrasslers} control={control} />
        </div>
        {showRemove ? (
          <button className="border border-red-600 p-1 px-2 m-1" onClick={() => removeMatch(matchIndex)}>
            -
          </button>
        ) : null}
      </div>
    </div>
  )
}

interface NightSectionProps {
  nightIndex: number
  night: FieldArrayWithId<NightValues, 'nights', 'id'>
  control: Control<NightValues>
  participants: ParticipantsFormVals
  getOptionsForMatch: (vals: { nightIndex: number; matchIndex: number; blockName: string }) => Option[]
}

const NightSection = ({ nightIndex, control, participants, getOptionsForMatch }: NightSectionProps) => {
  const { fields, append, remove } = useFieldArray({ control, name: `nights.${nightIndex}.matches` })
  const blockValues = participants.allParticipants.map((pool) => stringToOption(pool.blockName))
  const addMatch = () => append({ wrestler1: '', wrestler2: '' })
  return (
    <div className="mx-4 border">
      <p>{`Night ${nightIndex + 1}`}</p>
      {fields.map((match, mIndex) => {
        return (
          <div key={match.id}>
            <ParticipantsInput
              nightIndex={nightIndex}
              matchIndex={mIndex}
              control={control}
              blockValues={blockValues}
              showRemove={fields.length > 1}
              removeMatch={remove}
              getOptionsForMatch={getOptionsForMatch}
            />
          </div>
        )
      })}
      <button className="border p-1 px-2 m-1" type="button" onClick={addMatch}>
        +
      </button>
    </div>
  )
}

const ScheduleForm = ({ activeForm, participants, format, saveSchedule }: ScheduleFormProps) => {
  const { handleSubmit, control, watch } = useForm<NightValues>({ defaultValues: getInitialVals(format) })
  const { fields, replace } = useFieldArray({ control, name: 'nights' })
  const currentNights = watch('nights')
  const getOptionsForMatch = getOptionsFromNights({ nights: currentNights, participants })
  useEffect(() => {
    if (format?.numberOfNights) {
      replace(getInitialVals(format).nights)
    }
  }, [format?.numberOfNights])
  if (activeForm !== Forms.Schedule) return null
  return (
    <div>
      <form onSubmit={handleSubmit(saveSchedule)}>
        {fields.map((night, nightIndex) => {
          return (
            <NightSection
              key={night.id}
              night={night}
              nightIndex={nightIndex}
              control={control}
              participants={participants}
              getOptionsForMatch={getOptionsForMatch}
            />
          )
        })}
        <button className="border p-1 px-2" type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default ScheduleForm
