import { Forms } from '../../constants'

type Props = {
  activeForm: Forms
}

const ScheduleForm = (props: Props): JSX.Element => {
  if (props.activeForm !== Forms.Schedule) return null
  return (
    <div>
      <p>Schedule Form</p>
      <ul>
        <li>Generate appropriate number of nights</li>
        <li>Assign a block to a night</li>
        <li>Fill matches with dropdown</li>
        <li>Options limited by current night and previous schedule?</li>
        <li>Collapses wrapping each night?</li>
        <li>Autofill when only one option possible?</li>
      </ul>
    </div>
  )
}

export default ScheduleForm
