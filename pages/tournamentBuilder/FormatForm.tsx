//import Select from 'react-select' TODO: hook up React Select to Formik
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
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

const FormatSchema = yup.object().shape({
  perBlock: yup.string().required('Wrestlers per Block is required'),
  firstBlock: yup.string().required('1st Block Name is required'),
  secondBlock: yup.string().required('2nd Block Name is required'),
})

const FormatForm = (props: Props): JSX.Element => {
  if (props.activeForm !== Forms.Format) return null
  return (
    <div>
      <p>Format Form</p>
      <Formik
        initialValues={{ perBlock: '', firstBlock: '', secondBlock: '' }}
        validationSchema={FormatSchema}
        onSubmit={props.handleSubmit}
      >
        {({ errors, touched }) => (
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
            {errors.perBlock && touched.perBlock ? <div className="text-red-700 text-sm">{errors.perBlock}</div> : null}
            <br />
            <label htmlFor="firstBlock">1st Block Name:</label>
            <Field name="firstBlock" type="text" />
            {errors.firstBlock && touched.firstBlock ? (
              <div className="text-red-700 text-sm">{errors.firstBlock}</div>
            ) : null}
            <br />
            <label htmlFor="secondBlock">2nd Block Name:</label>
            <Field name="secondBlock" type="text" />
            {errors.secondBlock && touched.secondBlock ? (
              <div className="text-red-700 text-sm">{errors.secondBlock}</div>
            ) : null}
            <br />
            <button type="submit">Save</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormatForm
