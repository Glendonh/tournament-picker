import { useForm } from 'react-hook-form'
import { PickemFormVals } from '../types'
import { getBracketMatchDetails, getInitialPickEmVals } from '../utils'
import NightMatches from '../components/pickForms/NightMatches'
import SeedsSection from '../components/pickForms/SeedsSection'
import BracketSection from '../components/pickForms/BracketSection'

import { snowPrixSix } from '../test/__mocks__/tournaments'

const PickEmPage = () => {
  // Placeholder until fetching logic is decided
  const activeTournament = snowPrixSix
  const { control, watch } = useForm<PickemFormVals>({ defaultValues: getInitialPickEmVals(activeTournament) })
  const bracketPicks = watch('bracket')
  const currentSeeds = watch('seeds')
  const matchDetails = getBracketMatchDetails({ seeds: currentSeeds, bracketPicks, bracket: activeTournament.bracket })
  return (
    <div className="container mx-3 mb-4">
      <form>
        {activeTournament.schedule.nights.map((night, nIndex) => (
          <div key={`night${nIndex + 1}`}>
            <p className="text-lg">{`Night ${nIndex + 1}`}</p>
            <NightMatches control={control} nightIndex={nIndex} schedule={activeTournament.schedule} />
          </div>
        ))}
        <SeedsSection control={control} participants={activeTournament.participants} currentSeeds={currentSeeds} />
        <BracketSection
          control={control}
          bracket={activeTournament.bracket}
          picks={bracketPicks}
          matchDetails={matchDetails}
        />
      </form>
    </div>
  )
}

export default PickEmPage
