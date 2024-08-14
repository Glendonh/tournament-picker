import { useFieldArray, Control } from 'react-hook-form'
import { PickemFormVals, ParticipantsFormVals, Option } from '../../types'
import ControlledSelect from '../inputs/ControlledSelect'
import { stringToOption } from '../../utils'

interface SeedsSectionProps {
  control: Control<PickemFormVals>
  participants: ParticipantsFormVals
}

const getAvailableBlockOptions = ({
  participants,
  blockIndex,
}: {
  blockIndex: number
  participants: ParticipantsFormVals
}): Option<string>[] => {
  return participants.allParticipants[blockIndex].blockParticipants.map((p) => stringToOption(p.name))
}

const SeedsSection = ({ control, participants }: SeedsSectionProps) => {
  return (
    <div className="border-t border-b pb-4 mt-2">
      <p className="text-lg">Seeds</p>
      <div className="flex md:flex-row flex-col">
        {participants.allParticipants.map((block, bIndex) => {
          const { fields } = useFieldArray({ control, name: `seeds.${bIndex}.seeds` })
          return (
            <div key={block.blockName} className="md:w-1/4 w-full px-6">
              <p>{block.blockName}</p>
              {fields.map((seed, sIndex) => (
                <div key={seed.id}>
                  <label htmlFor={`seeds.${bIndex}.seeds.${sIndex}`}>{`${block.blockName} #${sIndex + 1}`}</label>
                  <ControlledSelect
                    control={control}
                    options={getAvailableBlockOptions({ blockIndex: bIndex, participants })}
                    name={`seeds.${bIndex}.seeds.${sIndex}.name`}
                  />
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SeedsSection
