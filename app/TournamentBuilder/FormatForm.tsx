import { useEffect } from 'react'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import ControlledSelect from '../../components/inputs/ControlledSelect'
import { FormatValues, Forms } from '../../types'
import { generateNumberOptions, matchesPerBlock, generateStringOptions } from '../../utils'

const numberOfBlocksOptions = generateStringOptions(['2', '4'])

interface Props {
  activeForm: Forms
  saveFormat: (vals: FormatValues) => void
  currentFormat?: FormatValues
}

const initialFormat: FormatValues = {
  tournamentName: '',
  numberOfBlocks: '2',
  blockNames: [{ name: '' }, { name: '' }],
  participantsPer: '',
  numberOfNights: '',
  numberAdvancing: '',
}

const FormatForm = ({ activeForm, saveFormat, currentFormat }: Props) => {
  if (activeForm !== Forms.Format) return null
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormatValues>({ defaultValues: currentFormat ?? initialFormat })
  const { fields, append, remove } = useFieldArray({ control, name: 'blockNames' })
  const currentBlockQty = useWatch({ control, name: 'numberOfBlocks' })
  const blockNames = useWatch({ control, name: 'blockNames' })
  const qtyPerBlock = useWatch({ control, name: 'participantsPer' })

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
        <label htmlFor="tournamentName">Tournament Name</label>
        <input type="text" {...register('tournamentName', { required: 'Required' })} />
        {errors.tournamentName ? <span className="text-red-700 text-sm">{errors.tournamentName.message}</span> : null}
        <p />
        <label htmlFor="numberOfBlocks">Number of blocks</label>
        <ControlledSelect name="numberOfBlocks" control={control} options={numberOfBlocksOptions} required />
        <label htmlFor="participantsPer">Participants per block</label>
        <ControlledSelect
          name="participantsPer"
          control={control}
          options={generateNumberOptions(3, 12)}
          errorMessage={errors.participantsPer?.message}
          required
        />
        {fields.map((item, index) => (
          <>
            <input key={item.id} {...register(`blockNames.${index}.name`, { required: 'Required' })} />
            {errors.blockNames?.[index]?.name ? (
              <span className="text-red-700 text-sm">{errors.blockNames?.[index]?.name.message}</span>
            ) : null}
          </>
        ))}
        {!isNaN(Number(qtyPerBlock)) ? (
          <>
            <p />
            <label htmlFor="numberOfNights">Nights of round robin matches</label>
            <ControlledSelect
              name="numberOfNights"
              required
              control={control}
              options={generateNumberOptions(
                Number(qtyPerBlock) - 1,
                matchesPerBlock(Number(qtyPerBlock)) * Number(currentBlockQty)
              )}
              errorMessage={errors.numberOfNights?.message}
            />
          </>
        ) : null}
        {!isNaN(Number(currentBlockQty)) ? (
          <>
            <p />
            <label htmlFor="numberAdvancing">Number of wrestlers in knockout stage</label>
            <ControlledSelect
              name="numberAdvancing"
              required
              control={control}
              options={
                currentBlockQty === '4' ? generateStringOptions(['4', '8']) : generateStringOptions(['2', '4', '6'])
              }
              errorMessage={errors.numberAdvancing?.message}
            />
          </>
        ) : null}
        <button className="border p-1 px-2" type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default FormatForm
