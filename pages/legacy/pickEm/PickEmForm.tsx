import { useForm, useWatch } from 'react-hook-form'
import ControlledSelect from '../../../components/ControlledSelect'
import { exampleTournament } from '../../../utils'
import { Tournament } from '../../../constants'

const generateInitialValues = (tournament: Tournament) => {
  const finals = {
    firstBlockWinner: '',
    secondBlockWinner: '',
    champion: '',
  }
  const blockNightFields = tournament.nights.reduce((acc, night, nightIndex) => {
    night.matches.forEach((match, matchIndex) => {
      const matchKey = `night${nightIndex}match${matchIndex}`
      acc[matchKey] = ''
    })
    return acc
  }, {})
  return { ...blockNightFields, ...finals }
}

const createOptions = (vals: string[]): { value: string; label: string }[] => {
  return vals.map((v) => ({ value: v, label: v }))
}

const logVals = (data) => console.log(data)

const PickEmForm = (): JSX.Element => {
  const tournament = exampleTournament
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: generateInitialValues(exampleTournament) })
  const firstBlockWinner = useWatch({ control, name: 'firstBlockWinner' })
  const secondBlockWinner = useWatch({ control, name: 'secondBlockWinner' })
  return (
    <div className="px-4">
      <form onSubmit={handleSubmit(logVals)}>
        <div>
          {tournament.nights.map((night, nightIndex) => (
            <div className="border-t" key={'night' + nightIndex}>
              <p className="font-bold">{`Night ${nightIndex + 1}`}</p>
              {night.matches.map((match, matchIndex) => {
                const matchKey = `night${nightIndex}match${matchIndex}`
                return (
                  <div key={matchKey}>
                    <label htmlFor={matchKey}>{`${match.wrestler1} vs ${match.wrestler2}`}</label>
                    <div style={{ maxWidth: '25%' }}>
                      <ControlledSelect
                        name={matchKey}
                        control={control}
                        options={createOptions([match.wrestler1, match.wrestler2])}
                        required
                        errorMessage={errors?.[matchKey] ? 'Required' : null}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
          <hr />
          <p className="font-bold">Finals</p>
          <label htmlFor="firstBlockWinner">{`${tournament.format.firstBlock} Winner`}</label>
          <div style={{ maxWidth: '25%' }}>
            <ControlledSelect
              control={control}
              name="firstBlockWinner"
              options={createOptions(tournament.participants.firstBlockParticipants)}
              required
              errorMessage={errors?.firstBlockWinner ? 'Required' : null}
            />
          </div>
          <label htmlFor="secondBlockWinner">{`${tournament.format.secondBlock} Winner`}</label>
          <div style={{ maxWidth: '25%' }}>
            <ControlledSelect
              name="secondBlockWinner"
              control={control}
              options={createOptions(tournament.participants.secondBlockParticipants)}
              required
              errorMessage={errors?.secondBlockWinner ? 'Required' : null}
            />
          </div>
          <label htmlFor="champion">Champion</label>
          <div style={{ maxWidth: '25%' }}>
            <ControlledSelect
              name="champion"
              control={control}
              options={createOptions([firstBlockWinner, secondBlockWinner])}
              required
              disabled={!firstBlockWinner || !secondBlockWinner}
              errorMessage={errors?.champion ? 'Required' : null}
            />
          </div>
        </div>
        <button className="bg-green-600 p-2 border" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default PickEmForm
