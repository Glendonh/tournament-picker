//import Select from 'react-select' TODO: hook up React Select to Formik
import { Formik, Form, Field } from 'formik'
import { Forms } from '../../constants'
import { Format } from './'

type Props = {
  activeForm: Forms
  handleSubmit: (format: Format) => void
}

const numberOfParticipantsOptions: { value: number; label: string }[] = [
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
  { value: 11, label: '11' },
  { value: 12, label: '12' },
]

const FormatForm = (props: Props): JSX.Element => {
  if (props.activeForm !== Forms.Format) return null
  return (
    <div>
      <p>Format Form</p>
      <Formik initialValues={{ perBlock: '', firstBlock: '', secondBlock: '' }} onSubmit={props.handleSubmit}>
        <Form>
          <label htmlFor="perBlock">Wrestlers per block:</label>
          <Field as="select" name="perBlock">
            <option></option>
            {numberOfParticipantsOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Field>
          <br />
          <label htmlFor="firstBlock">1st Block Name:</label>
          <Field name="firstBlock" type="text" />
          <br />
          <label htmlFor="secondBlock">2nd Block Name:</label>
          <Field name="secondBlock" type="text" />
          <br />
          <button type="submit">Save</button>
        </Form>
      </Formik>
    </div>
  )
}

export default FormatForm
