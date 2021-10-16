import { Formik, Form, Field, FieldArray } from 'formik'
import { Forms } from '../../constants'
import { Format } from './index'

type Props = {
  activeForm: Forms
  format: Format | null
  handleSubmit: (participants: ParticipantsFormVals) => void
}

type ParticipantsFormVals = {
  firstBlockParticipants: string[]
  secondBlockParticipants: string[]
}

const getInitialVals = (format?: Format): ParticipantsFormVals => {
  const vals = { firstBlockParticipants: [], secondBlockParticipants: [] }
  const numberPerBlock = Number(format.perBlock)
  if (format.perBlock && !isNaN(numberPerBlock)) {
    vals.firstBlockParticipants = Array(numberPerBlock).fill('')
    vals.secondBlockParticipants = Array(numberPerBlock).fill('')
  }
  return vals
}

const ParticipantsForm = (props: Props): JSX.Element => {
  const { format, handleSubmit } = props
  if (props.activeForm !== Forms.Participants || !format?.perBlock) return null
  return (
    <div>
      <p>Participants Form</p>
      <Formik onSubmit={handleSubmit} initialValues={getInitialVals(format)}>
        {({ values }) => (
          <Form>
            <div>
              <h3>{format?.firstBlock}</h3>
              <FieldArray
                name="firstBlock"
                render={() => (
                  <>
                    {values?.firstBlockParticipants?.length
                      ? values.firstBlockParticipants.map((participant, index) => (
                          <div key={'firstBlock' + index}>
                            <Field name={`firstBlockParticipants.${index}`} />
                            <br />
                          </div>
                        ))
                      : null}
                  </>
                )}
              />
            </div>
            <div>
              <h3>{format?.secondBlock}</h3>
              <FieldArray
                name="secondBlock"
                render={() => (
                  <div key="xyz">
                    {values?.secondBlockParticipants?.length
                      ? values.secondBlockParticipants.map((participant, index) => (
                          <div key={'secondBlock' + index}>
                            <Field name={`secondBlockParticipants.${index}`} />
                            <br />
                          </div>
                        ))
                      : null}
                  </div>
                )}
              />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ParticipantsForm
