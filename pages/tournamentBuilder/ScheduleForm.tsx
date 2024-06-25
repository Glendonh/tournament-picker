import { useForm, useFieldArray, Control, FieldArrayWithId } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import ControlledSelect from '../../components/ControlledSelect'
import { Forms, ParticipantsFormVals, FormatValues, NightValues } from '../../types'
// import { matchesPerBlock } from '../../utils'

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
  blockValues: { value: string; label: string }[]
  participants: ParticipantsFormVals
  showRemove: boolean
  removeMatch: (index: number) => void
}

// TODO: should add logic here to restrict to valid options
// there is a version of this in the legacy version
const getParticipantValuesForBlock = ({
  blockName,
  participants,
}: {
  blockName: string
  participants: ParticipantsFormVals
}): { value: string; label: string }[] => {
  const selectedBlock = participants.allParticipants.find((block) => block.blockName === blockName)
  return selectedBlock?.blockParticipants.map((w) => ({ value: w.name, label: w.name })) ?? []
}

const ParticipantsInput = ({
  nightIndex,
  matchIndex,
  control,
  blockValues,
  participants,
  removeMatch,
  showRemove,
}: ParticipantsInputProps) => {
  const wrestler1Label = `nights.${nightIndex}.matches.${matchIndex}.wrestler1`
  const wrestler2Label = `nights.${nightIndex}.matches.${matchIndex}.wrestler2`
  const [selectedBlock, setSelectedBlock] = useState('')
  const wrasslers = getParticipantValuesForBlock({ blockName: selectedBlock, participants })
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
}

const NightSection = ({ nightIndex, control, participants }: NightSectionProps) => {
  const { fields, append, remove } = useFieldArray({ control, name: `nights.${nightIndex}.matches` })
  const blockValues = participants.allParticipants.map((pool) => ({ value: pool.blockName, label: pool.blockName }))
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
              participants={participants}
              blockValues={blockValues}
              showRemove={fields.length > 1}
              removeMatch={remove}
            />
          </div>
        )
      })}
      <button className="border p-1 px-2 m-1" onClick={addMatch}>
        +
      </button>
    </div>
  )
}

const ScheduleForm = ({ activeForm, participants, format, saveSchedule }: ScheduleFormProps) => {
  const { handleSubmit, control } = useForm<NightValues>({ defaultValues: getInitialVals(format) })
  const { fields, replace } = useFieldArray({ control, name: 'nights' })
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
