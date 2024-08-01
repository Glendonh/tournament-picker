import { useState } from 'react'
import Head from 'next/head'
import { Collapse } from 'react-collapse'
import CollapseSection from '../../components/CollapseSection'
import { getInitialPickEmVals } from '../../utils'
import { PickemFormVals, Pick, CompleteTournament } from '../../types'
import { UpdateForm } from '../tournamentDetails'

import { G1Climax2024, G1Picks24 } from '../../types/dummyData'

const getPickAccuracy = (pick: Pick, results: PickemFormVals) => {
  let correct = 0
  let completeMatches = 0
  const nightScores = []
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

interface PickSummaryProps {
  entry: Pick
  results: PickemFormVals
  tournament: CompleteTournament
}

const PickSummary = ({ entry, results, tournament }: PickSummaryProps) => {
  const tracker = getPickAccuracy(entry, results)
  const [isOpened, setIsOpened] = useState(false)
  const toggleOpened = () => setIsOpened((s) => !s)
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
            return (
              <div key={`night${nightIndex}`}>
                <span className="font-semibold">{`Night ${nightIndex + 1}`}</span>
                {nightScore.complete ? (
                  <CollapseSection title={`${nightScore.correct} ouf of ${nightScore.complete}`}>
                    {tournament.schedule.nights[nightIndex].matches.map((match, matchIndex) => {
                      // TODO: handle draw
                      const matchWinner = results.nights[nightIndex].matches[matchIndex].winner
                      const loser = matchWinner === match.wrestler1 ? match.wrestler1 : match.wrestler2
                      const fontColor =
                        entry.nights[nightIndex].matches[matchIndex].winner === matchWinner
                          ? 'text-green-600'
                          : 'text-red-600'
                      return (
                        <p
                          className={`${fontColor}`}
                          key={`n${nightIndex}m${matchIndex}`}
                        >{`${matchWinner} defeats ${loser}`}</p>
                      )
                    })}
                  </CollapseSection>
                ) : null}
              </div>
            )
          })}
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
        <UpdateForm tournament={tournament} onSubmit={setResults} />
      ) : (
        <>
          {G1Picks24.map((entry) => {
            return <PickSummary key={entry.id} results={results} entry={entry} tournament={tournament} />
          })}
        </>
      )}
    </div>
  )
}

export default GroupPage
