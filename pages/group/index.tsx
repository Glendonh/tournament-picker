import { useState } from 'react'
import Head from 'next/head'
import { Collapse } from 'react-collapse'
import CollapseSection from '../../components/CollapseSection'
import { getInitialPickEmVals, getMatchResultString, getBracketMatchDetails } from '../../utils'
import { PickemFormVals, Pick, CompleteTournament } from '../../types'
import UpdateForm from '../../components/UpdateForm'

import { G1Climax2024, G1Picks24 } from '../../types/dummyData'

const getPickAccuracy = (pick: Pick, results: PickemFormVals) => {
  let correct = 0
  let completeMatches = 0
  const nightScores: Array<{ correct: number; complete: number }> = []
  pick.nights.forEach((night, nightIndex) => {
    let nightMatches = 0
    let nightCorrect = 0
    night.matches.forEach((match, matchIndex) => {
      const resultsWinner = results.nights[nightIndex].matches[matchIndex].winner
      if (resultsWinner) {
        completeMatches++
        nightMatches++
        if (resultsWinner === match.winner) {
          correct++
          nightCorrect++
        }
      }
    })
    nightScores.push({ correct: nightCorrect, complete: nightMatches })
  })
  return { correct, completeMatches, nightScores }
}

interface ScoredPick extends Pick {
  tracker: {
    correct: number
    completeMatches: number
    nightScores: {
      complete: number
      correct: number
    }[]
  }
}

const sortedScoredPicks = (picks: Pick[], results: PickemFormVals): ScoredPick[] => {
  const scoredPicks = picks.map((pick) => ({ ...pick, tracker: getPickAccuracy(pick, results) }))
  return scoredPicks.sort((a, b) => b.tracker.correct - a.tracker.correct)
}

interface PickSummaryProps {
  entry: ScoredPick
  results: PickemFormVals
  tournament: CompleteTournament
}

const PickSummary = ({ entry, results, tournament }: PickSummaryProps) => {
  const { tracker } = entry
  const [isOpened, setIsOpened] = useState(false)
  const toggleOpened = () => setIsOpened((s) => !s)
  const bracketMatchDetails = getBracketMatchDetails({
    seeds: results.seeds,
    bracketPicks: entry.bracket,
    bracket: tournament.bracket,
  })
  return (
    <div key={entry.id} className="mb-1">
      <div className="p-2 w-1/2 border border-black rounded-lg flex flex-row justify-between" onClick={toggleOpened}>
        <span>{entry.userName}</span>
        <span>{`${tracker.correct}/${tracker.completeMatches}`}</span>
      </div>
      <Collapse isOpened={isOpened}>
        <div className="pl-2">
          {entry.nights.map((night, nightIndex) => {
            const nightScore = tracker.nightScores[nightIndex]
            const sectionTitle = nightScore.complete
              ? `Night ${nightIndex + 1}: ${nightScore.correct}/${nightScore.complete}`
              : `Night ${nightIndex + 1} picks`
            return (
              <div key={`night${nightIndex}`}>
                <CollapseSection title={sectionTitle}>
                  <>
                    {tournament.schedule.nights[nightIndex].matches.map((match, matchIndex) => {
                      const matchWinner = results.nights[nightIndex].matches[matchIndex].winner
                      const pickedWinner = entry.nights[nightIndex].matches[matchIndex].winner
                      const matchResult = getMatchResultString(matchWinner, match)
                      const fontColor = nightScore.complete
                        ? pickedWinner === matchWinner
                          ? 'text-green-600'
                          : 'text-red-600'
                        : ''
                      return (
                        <p className={`${fontColor}`} key={`n${nightIndex}m${matchIndex}`}>
                          {matchResult}
                        </p>
                      )
                    })}
                  </>
                </CollapseSection>
              </div>
            )
          })}
          <CollapseSection title="Seeds">
            <div className="flex flex-row">
              {results.seeds.map((block, blockIndex) => (
                <div key={block.blockName + 'seeds'} className="ml-3">
                  <p className="font-semibold">{block.blockName}</p>
                  {block.seeds.map((seed, seedIndex) => {
                    const pickedSeed = entry.seeds[blockIndex].seeds[seedIndex].name
                    const fontColor = pickedSeed === seed.name ? 'text-green-600' : 'text-red-600'
                    return (
                      <div key={`${block.blockName}seed${seedIndex + 1}`}>
                        <span>{`${seedIndex + 1}.`}</span>
                        <span className={fontColor}>{` ${seed.name}`}</span>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </CollapseSection>
          <CollapseSection title="Bracket">
            {tournament.bracket.bracketMatches.map((match, i) => {
              const matchWinner = results.bracket[i].winner
              const fontColor = matchWinner
                ? entry.bracket[i].winner === matchWinner
                  ? 'text-green-600'
                  : 'text-red-600'
                : ''
              const details = bracketMatchDetails[i]
              return (
                <div key={`Bracket${match.matchNumber}`}>
                  <p className={fontColor}>{details.label}</p>
                </div>
              )
            })}
          </CollapseSection>
        </div>
      </Collapse>
    </div>
  )
}

const GroupPage = () => {
  const tournament = G1Climax2024
  const [showEdit, setShowEdit] = useState(false)
  const [results, setResults] = useState<PickemFormVals>(getInitialPickEmVals(tournament))
  const toggleShowEdit = () => setShowEdit((s) => !s)
  const sortedPicks = sortedScoredPicks(G1Picks24, results)
  return (
    <div className="container p-2">
      <Head>
        <title>Group</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-2xl text-center">{tournament.format.tournamentName}</h2>
      <button className="border border-black p-1 rounded-sm bg-blue-400 mb-2" onClick={toggleShowEdit}>
        Toggle Edit
      </button>
      {showEdit ? (
        <UpdateForm tournament={tournament} results={results} onSubmit={setResults} />
      ) : (
        <>
          {sortedPicks.map((entry) => {
            return <PickSummary key={entry.id} results={results} entry={entry} tournament={tournament} />
          })}
        </>
      )}
    </div>
  )
}

export default GroupPage
