import PickerButtons from '../inputs/PickerButtons'
import { PickemFormVals, ScheduleValues, Lookup } from '../../types'
import { useFieldArray, Control } from 'react-hook-form'

interface NightMatchesProps {
  control: Control<PickemFormVals>
  nightIndex: number
  schedule: ScheduleValues
  lookup: Lookup
}

const getMatchLabel = (schedule: ScheduleValues, nightIndex: number, matchIndex: number, lookup: Lookup): string => {
  const match = schedule.nights[nightIndex].matches[matchIndex]
  return `${lookup[match.wrestler1]} vs ${lookup[match.wrestler2]}`
}

const getRoundRobinMatchOptions = (
  schedule: ScheduleValues,
  nightIndex: number,
  matchIndex: number,
  lookup: Lookup
) => {
  const { wrestler1, wrestler2 } = schedule.nights[nightIndex].matches[matchIndex]
  return [
    { value: wrestler1, label: lookup[wrestler1] },
    { value: wrestler2, label: lookup[wrestler2] },
    { value: 'draw', label: 'Draw' },
  ]
}

const NightMatches = ({ control, nightIndex, schedule, lookup }: NightMatchesProps) => {
  const { fields } = useFieldArray({ control, name: `nights.${nightIndex}.matches` })
  return (
    <div className="ml-4">
      {fields.map((match, mIndex) => (
        <div className="max-w-md" key={match.id}>
          <p>{`Match ${mIndex + 1}`}</p>
          <label>{getMatchLabel(schedule, nightIndex, mIndex, lookup)}</label>
          <PickerButtons
            control={control}
            name={`nights.${nightIndex}.matches.${mIndex}.winner`}
            options={getRoundRobinMatchOptions(schedule, nightIndex, mIndex, lookup)}
          />
        </div>
      ))}
    </div>
  )
}

export default NightMatches
