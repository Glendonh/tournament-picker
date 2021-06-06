import { Forms } from '../../constants'

type Props = {
  activeForm: Forms
}

const FormatForm = (props: Props): JSX.Element => {
  if (props.activeForm !== Forms.Format) return null
  return (
    <div>
      <p>Format Form</p>
      <ul>
        <li>Block Names?</li>
        <li>Set number of wrestlers per block</li>
        <li>Generate text input for each wrestler</li>
      </ul>
    </div>
  )
}

export default FormatForm
