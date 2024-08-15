import { FormatValues, Forms, ParticipantsFormVals } from '../../types'
import { useForm, useFieldArray, Control, UseFormRegister, FieldErrors } from 'react-hook-form'
import { useEffect } from 'react'

interface Props {
  activeForm: Forms
  format?: FormatValues
  saveParticipants: (vals: ParticipantsFormVals) => void
}

const getInitialVals = (format?: FormatValues): ParticipantsFormVals => {
  if (!format) return { allParticipants: [] }
  const allParticipants = format.blockNames.map((blockName) => {
    return {
      blockName: blockName.name,
      blockParticipants: Array(Number(format.participantsPer)).fill({ name: '' }),
    }
  })
  return { allParticipants }
}

interface SectionProps {
  control: Control<ParticipantsFormVals>
  register: UseFormRegister<ParticipantsFormVals>
  sectionIndex: number
  blockName: string
  errors: FieldErrors<ParticipantsFormVals>
}

const BlockSection = ({ control, register, sectionIndex, blockName, errors }: SectionProps) => {
  const { fields } = useFieldArray({ control, name: `allParticipants.${sectionIndex}.blockParticipants` })
  return (
    <div>
      <h2>{blockName}</h2>
      <label>Participants</label>
      {fields.map((participant, pIndex) => (
        <div key={participant.id}>
          <input
            {...register(`allParticipants.${sectionIndex}.blockParticipants.${pIndex}.name`, {
              required: 'Required',
            })}
          />
          {errors.allParticipants?.[sectionIndex]?.blockParticipants?.[pIndex]?.name ? (
            <span className="text-red-700 text-sm">
              {errors.allParticipants[sectionIndex].blockParticipants?.[pIndex]?.name.message}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  )
}

const ParticipantsForm = ({ activeForm, format, saveParticipants }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ParticipantsFormVals>({ defaultValues: getInitialVals(format) })
  const { fields, replace } = useFieldArray({ control, name: 'allParticipants' })
  useEffect(() => {
    if (format?.numberOfBlocks) {
      replace(getInitialVals(format).allParticipants)
    }
  }, [format?.numberOfBlocks, format?.participantsPer])

  if (activeForm !== Forms.Participants || !format) return null
  return (
    <div className="px-4">
      <form onSubmit={handleSubmit(saveParticipants)}>
        {fields.map((block, index) => {
          return (
            <BlockSection
              key={block.id}
              sectionIndex={index}
              blockName={block.blockName}
              control={control}
              register={register}
              errors={errors}
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

export default ParticipantsForm
