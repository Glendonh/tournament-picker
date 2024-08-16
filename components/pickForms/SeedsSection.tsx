import { useFieldArray, Control } from 'react-hook-form'
import { PickemFormVals, ParticipantsFormVals, Option, Seed } from '../../types'
import ControlledSelect from '../inputs/ControlledSelect'

interface SeedsSectionProps {
  control: Control<PickemFormVals>
  participants: ParticipantsFormVals
  currentSeeds: Seed[]
}

const getAvailableBlockOptions = ({
  participants,
  seedIndex,
  blockIndex,
  currentSeeds,
}: {
  blockIndex: number
  seedIndex: number
  participants: ParticipantsFormVals
  currentSeeds: Seed[]
}): Option<string>[] => {
  const idsInUse = currentSeeds[blockIndex].seeds.reduce<string[]>((acc, seed, i) => {
    if (seed.name && i !== seedIndex) {
      acc.push(seed.name)
    }
    return acc
  }, [])
  return participants.blocks[blockIndex].blockParticipants.reduce<Option<string>[]>((acc, wrestler) => {
    if (!idsInUse.includes(wrestler.id)) {
      acc.push({ value: wrestler.id, label: wrestler.name })
    }
    return acc
  }, [])
}

const SeedsSection = ({ control, participants, currentSeeds }: SeedsSectionProps) => {
  return (
    <div className="border-t border-b pb-4 mt-2">
      <p className="text-lg">Seeds</p>
      <div className="flex md:flex-row flex-col">
        {participants.blocks.map((block, bIndex) => {
          const { fields } = useFieldArray({ control, name: `seeds.${bIndex}.seeds` })
          return (
            <div key={block.blockName} className="md:w-1/4 w-full px-6">
              <p>{block.blockName}</p>
              {fields.map((seed, sIndex) => (
                <div key={seed.id}>
                  <label htmlFor={`seeds.${bIndex}.seeds.${sIndex}`}>{`${block.blockName} #${sIndex + 1}`}</label>
                  <ControlledSelect
                    control={control}
                    options={getAvailableBlockOptions({
                      blockIndex: bIndex,
                      participants,
                      currentSeeds,
                      seedIndex: sIndex,
                    })}
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
