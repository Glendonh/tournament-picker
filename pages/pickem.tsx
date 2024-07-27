import { useForm } from 'react-hook-form'
import { PickemFormVals } from '../types'
import { getBracketMatchDetails, getInitialPickEmVals } from '../utils'
import NightMatches from '../components/pickForms/NightMatches'
import SeedsSection from '../components/pickForms/SeedsSection'
import BracketSection from '../components/pickForms/BracketSection'
import CollapseSection from '../components/CollapseSection'

// import { snowPrixSix } from '../test/__mocks__/tournaments'
import { G1Climax2024 } from '../types/dummyData'

const PickEmPage = () => {
  // Placeholder until fetching logic is decided
  const activeTournament = G1Climax2024
  const { control, watch } = useForm<PickemFormVals>({ defaultValues: getInitialPickEmVals(activeTournament) })
  const bracketPicks = watch('bracket')
  const currentSeeds = watch('seeds')
  const matchDetails = getBracketMatchDetails({ seeds: currentSeeds, bracketPicks, bracket: activeTournament.bracket })
  return (
    <div className="container mx-3 mb-4 pt-8">
      <form>
        {activeTournament.schedule.nights.map((night, nIndex) => (
          <div key={`night${nIndex + 1}`}>
            <CollapseSection title={`Night ${nIndex + 1}`}>
              <NightMatches control={control} nightIndex={nIndex} schedule={activeTournament.schedule} />
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
        </CollapseSection>
      </form>
    </div>
  )
}

export default PickEmPage
