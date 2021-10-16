import { Formik, Form, Field, FieldArray } from 'formik'
import { Forms } from '../../constants'
import { Participants, Format } from './index'

type Props = {
  activeForm: Forms
  participants: Participants | null
  format: Format | null
}

// TODO: this can probably be hoisted to the tournamentBuilder page
const generateNights = (participants: Participants, format: Format) => {
  if (!participants || !format) {
    return []
  }
  const perBlock = Number(format.perBlock)
  const numberOfNights = (perBlock - 1) * 2
  const matchesPerNight = Math.floor(perBlock / 2)
  const matches = Array.from(Array(matchesPerNight)).fill({ wrestler1: '', wrestler2: '' })
  return Array.from(Array(numberOfNights)).map((night, index) => {
    const block = index % 2 === 0 ? format.firstBlock : format.secondBlock
    return { block, matches }
  })
}

const handleSubmit = (vals) => {
  console.log(vals)
}

const ScheduleForm = (props: Props): JSX.Element => {
  if (props.activeForm !== Forms.Schedule || !props.participants) return null
  const { participants, format } = props
  const nights = generateNights(participants, format)
  console.log(nights)
  return (
    <div>
      <p>Schedule Form</p>
      Number of Nights: {nights.length}
      <Formik onSubmit={handleSubmit} initialValues={{ nights }}>
        {({ values }) => (
          <Form>
            <FieldArray
              name="schedule"
              render={() => (
                <div>
                  {values?.nights?.length ? (
                    <>
                      {values.nights.map((night, nightIndex) => (
                        <div key={nightIndex}>
                          Night {nightIndex + 1}
                          <br />
                          <label htmlFor={`nights.${nightIndex}.block`}>Active Block</label>
                          <Field as="select" name={`nights.${nightIndex}.block`}>
                            {format ? (
                              <>
                                <option key={format.firstBlock} value={format.firstBlock}>
                                  {format.firstBlock}
                                </option>
                                <option key={format.secondBlock} value={format.secondBlock}>
                                  {format.secondBlock}
                                </option>
                              </>
                            ) : null}
                          </Field>
                          {night.matches.map((match, matchIndex) => (
                            <div key={`${nightIndex - matchIndex}`}>
                              <label htmlFor={`nights.${nightIndex}.matches.${matchIndex}.wrestler1`}>Wrestler 1</label>
                              <Field name={`nights.${nightIndex}.matches.${matchIndex}.wrestler1`} />
                              <label htmlFor={`nights.${nightIndex}.matches.${matchIndex}.wrestler2`}>Wrestler 2</label>
                              <Field name={`nights.${nightIndex}.matches.${matchIndex}.wrestler2`} />
                            </div>
                          ))}
                          <hr />
                        </div>
                      ))}
                    </>
                  ) : null}
                </div>
              )}
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
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
