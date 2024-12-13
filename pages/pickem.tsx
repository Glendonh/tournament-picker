import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PickemFormVals } from '../types'
import { getBracketMatchDetails, getInitialPickEmVals } from '../utils'
import NightMatches from '../components/pickForms/NightMatches'
import SeedsSection from '../components/pickForms/SeedsSection'
import BracketSection from '../components/pickForms/BracketSection'
import CollapseSection from '../components/CollapseSection'

import { MarvelPrix } from '../types/dummyData'

const PickEmPage = () => {
  // Placeholder until fetching logic is decided
  const activeTournament = MarvelPrix
  const [picks, setPicks] = useState([])
  const { control, watch, handleSubmit, register } = useForm<PickemFormVals>({
    defaultValues: getInitialPickEmVals(activeTournament),
  })
  const bracketPicks = watch('bracket')
  const currentSeeds = watch('seeds')
  const matchDetails = getBracketMatchDetails({
    seeds: currentSeeds,
    bracketPicks,
    bracket: activeTournament.bracket,
    lookup: activeTournament.participants.lookup,
  })
  const wrestlerLookup = activeTournament.participants.lookup
  const addPicksAndPrint = (vals) => {
    const newVals = picks.concat(vals)
    setPicks(newVals)
  }

  // TODO: Add tracking to summarize win totals when picking seeds

  return (
    <div className="container mx-3 mb-4 pt-8">
      <form onSubmit={handleSubmit(addPicksAndPrint)}>
        {activeTournament.schedule.nights.map((night, nIndex) => (
          <div key={`night${nIndex + 1}`}>
            <CollapseSection title={`Night ${nIndex + 1}`}>
              <NightMatches
                control={control}
                nightIndex={nIndex}
                schedule={activeTournament.schedule}
                lookup={wrestlerLookup}
              />
            </CollapseSection>
          </div>
        ))}
        <CollapseSection title="Seeds">
          <SeedsSection control={control} participants={activeTournament.participants} currentSeeds={currentSeeds} />
        </CollapseSection>
        <CollapseSection title="Bracket">
          <BracketSection
            control={control}
            bracket={activeTournament.bracket}
            picks={bracketPicks}
            matchDetails={matchDetails}
          />
          <div className="mt-2">
            <label htmlFor="tiebreaker" className="mr-1">
              Tiebreaker, length of finals in MM:SS
            </label>
            <input {...register('tiebreaker')} />
          </div>
        </CollapseSection>
        <button className="p-3 rounded-xl border border-blue-500 mt-3" type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default PickEmPage
