import { Formik, Form, Field, FieldArray } from 'formik'
import { Forms } from '../../constants'
import { Participants, Format, Night } from './index'

type Props = {
  activeForm: Forms
  participants: Participants | null
  format: Format | null
  handleSubmit: (nights: { nights: Night[] }) => void
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

const getOptionsForMatch = (
  values: { nights: Night[] },
  participants: Participants,
  format: Format,
  nightIndex: number,
  matchIndex: number,
  position: number
) => {
  const activeNight = values.nights[nightIndex]
  const blockCompetitors =
    format.firstBlock === activeNight.block ? participants.firstBlockParticipants : participants.secondBlockParticipants
  const wrestlersUsedTonight = activeNight.matches.reduce((acc, match, index) => {
    if (index !== matchIndex) {
      return acc.concat([match.wrestler1, match.wrestler2].filter((x) => x))
    }
    const opponent = position === 1 ? match.wrestler2 : match.wrestler1
    if (opponent) {
      return acc.concat(opponent)
    }
    return acc
  }, [])
  const hasAlreadyFacedOpponent = values.nights.reduce((acc, night, index) => {
    const opponent =
      position === 1 ? activeNight.matches[matchIndex].wrestler2 : activeNight.matches[matchIndex].wrestler1
    if (opponent && night.block === activeNight.block && index !== nightIndex) {
      const opponentsOpponents = night.matches.reduce((acc, match) => {
        if (match.wrestler1 === opponent) {
          return acc.concat(match.wrestler2)
        }
        if (match.wrestler2 === opponent) {
          return acc.concat(match.wrestler1)
        }
        return acc
      }, [])
      return acc.concat(opponentsOpponents)
    }
    return acc
  }, [])
  const availableOptions = blockCompetitors.filter(
    (wrestler) => !wrestlersUsedTonight.includes(wrestler) && !hasAlreadyFacedOpponent.includes(wrestler)
  )
  return availableOptions
}

const ScheduleForm = (props: Props): JSX.Element => {
  if (props.activeForm !== Forms.Schedule || !props.participants) return null
  const { participants, format, handleSubmit } = props
  const nights = generateNights(participants, format)
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
                              <Field as="select" name={`nights.${nightIndex}.matches.${matchIndex}.wrestler1`}>
                                <option />
                                {getOptionsForMatch(values, participants, format, nightIndex, matchIndex, 1).map(
                                  (wrestler) => (
                                    <option key={wrestler} value={wrestler}>
                                      {wrestler}
                                    </option>
                                  )
                                )}
                              </Field>
                              <label htmlFor={`nights.${nightIndex}.matches.${matchIndex}.wrestler2`}>Wrestler 2</label>
                              <Field as="select" name={`nights.${nightIndex}.matches.${matchIndex}.wrestler2`}>
                                <option />
                                {getOptionsForMatch(values, participants, format, nightIndex, matchIndex, 2).map(
                                  (wrestler) => (
                                    <option key={wrestler} value={wrestler}>
                                      {wrestler}
                                    </option>
                                  )
                                )}
                              </Field>
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
    </div>
  )
}

export default ScheduleForm
