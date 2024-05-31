import { useEffect } from 'react'
import { Forms } from '../../constants'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import ControlledSelect from '../../components/ControlledSelect'
import { FormatValues } from '../../types'

const numberOfParticipantsOptions: { value: string; label: string }[] = [
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
]
const numberOfBlocksOptions: { value: string; label: string }[] = [
  { value: '2', label: '2' },
  { value: '4', label: '4' },
]
interface Props {
  activeForm: Forms
  saveFormat: (vals: FormatValues) => void
  currentFormat?: FormatValues
}

const initialFormat: FormatValues = {
  numberOfBlocks: '2',
  blockNames: [{ name: '' }, { name: '' }],
  participantsPer: '',
}

const FormatForm = ({ activeForm, saveFormat, currentFormat }: Props) => {
  if (activeForm !== Forms.Format) return null
  const { control, register, handleSubmit } = useForm({ defaultValues: currentFormat ?? initialFormat })
  const { fields, append, remove } = useFieldArray({ control, name: 'blockNames' })
  const currentBlockQty = useWatch({ control, name: 'numberOfBlocks' })
  const blockNames = useWatch({ control, name: 'blockNames' })
  useEffect(() => {
    const numberOfBlocks = Number(currentBlockQty)
    if (numberOfBlocks !== blockNames.length) {
      if (numberOfBlocks === 4) {
        append([{ name: '' }, { name: '' }])
      }
      if (numberOfBlocks === 2) {
        remove([2, 3])
      }
    }
  }, [currentBlockQty])
  return (
    <div className="px-4">
      <form onSubmit={handleSubmit(saveFormat)}>
        <label htmlFor="numberOfBlocks">Number of blocks</label>
        <ControlledSelect name="numberOfBlocks" control={control} options={numberOfBlocksOptions} required />
        <label htmlFor="participantsPer">Participants per block</label>
        <ControlledSelect name="participantsPer" control={control} options={numberOfParticipantsOptions} required />
        {fields.map((item, index) => (
          <input key={item.id} {...register(`blockNames.${index}.name`)} />
        ))}
        <button className="border p-1 px-2" type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default FormatForm
