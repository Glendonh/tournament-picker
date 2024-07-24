import PickerButtons from '../inputs/PickerButtons'
import { generateStringOptions } from '../../utils'
import { PickemFormVals, ScheduleValues } from '../../types'
import { useFieldArray, Control } from 'react-hook-form'

interface NightMatchesProps {
  control: Control<PickemFormVals>
  nightIndex: number
  schedule: ScheduleValues
}

const getMatchLabel = (schedule: ScheduleValues, nightIndex: number, matchIndex: number): string => {
  const match = schedule.nights[nightIndex].matches[matchIndex]
  return `${match.wrestler1} vs ${match.wrestler2}`
}

const getRoundRobinMatchOptions = (schedule: ScheduleValues, nightIndex: number, matchIndex: number) => {
  const { wrestler1, wrestler2 } = schedule.nights[nightIndex].matches[matchIndex]
  return generateStringOptions([wrestler1, wrestler2, 'draw'])
}

const NightMatches = ({ control, nightIndex, schedule }: NightMatchesProps) => {
  const { fields } = useFieldArray({ control, name: `nights.${nightIndex}.matches` })
  return (
    <div className="ml-4">
      {fields.map((match, mIndex) => (
        <div className="max-w-md" key={match.id}>
          <p>{`Match ${mIndex + 1}`}</p>
          <label>{getMatchLabel(schedule, nightIndex, mIndex)}</label>
          <PickerButtons
            control={control}
            name={`nights.${nightIndex}.matches.${mIndex}.winner`}
            options={getRoundRobinMatchOptions(schedule, nightIndex, mIndex)}
          />
        </div>
      ))}
    </div>
  )
}

export default NightMatches
