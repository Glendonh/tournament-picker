import { useState } from 'react'
import Head from 'next/head'
import { PickemFormVals, ParticipantsFormVals } from '../types'
import { getInitialPickEmVals, getBracketMatchDetails, getMatchResultString } from '../utils'
import CollapseSection from '../components/CollapseSection'
import UpdateForm from '../components/UpdateForm'

// import { snowPrixSix } from '../test/__mocks__/tournaments'
import { MarvelPrix } from '../types/dummyData'

const getScores = (participants: ParticipantsFormVals, results: PickemFormVals) => {
  const scores = participants.blocks.reduce((acc, block) => {
    block.blockParticipants.forEach((p) => (acc[p.name] = 0))
    return acc
  }, {})
  results.nights.forEach((night) => {
    night.matches.forEach((match) => {
      const { winner } = match
      if (winner) {
        scores[winner] += 2
      }
    })
  })
  return scores
}

const TournamentDetails = () => {
  const { format, participants, schedule, bracket } = MarvelPrix
  const [showEdit, setShowEdit] = useState(false)
  const [results, setResults] = useState<PickemFormVals>(getInitialPickEmVals(MarvelPrix))
  const toggleShowEdit = () => setShowEdit((s) => !s)
  const matchDetails = getBracketMatchDetails({
    seeds: results.seeds,
    bracketPicks: results.bracket,
    bracket: bracket,
    lookup: participants.lookup,
  })
  const scores = getScores(participants, results)

  return (
    <div className="container px-3">
      <Head>
        <title>Tournament Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className="text-3xl text-center">{format.tournamentName}</p>
      <button className="border border-black p-1 rounded-sm bg-blue-400 mb-2" onClick={toggleShowEdit}>
        Toggle Edit
      </button>
      {showEdit ? (
        <div>
          <UpdateForm tournament={MarvelPrix} onSubmit={setResults} results={results} />
          <ul className="list-inside list-disc">
            <li>update results on a nightly basis</li>
            <li>update seeds and brackets after nights are complete</li>
            <li>store results</li>
            <li>display results on summary page</li>
          </ul>
        </div>
      ) : (
        <div>
          <p className="text-xl text-center">Summary</p>
          <p className="text-xl">Participants</p>
          <div className="flex flex-row">
            {participants.blocks.map((block) => (
              <div key={block.blockName} className="mx-2">
                <p className="text-l font-semibold">{block.blockName}</p>
                {block.blockParticipants.map((p) => (
                  <p key={p.name}>{`${p.name} - ${scores[p.name]}pts`}</p>
                ))}
              </div>
            ))}
          </div>
          <p className="text-xl">Schedule</p>
          {schedule.nights.map((n, nIndex) => (
            <div key={nIndex} className="ml-2 mb-4">
              <CollapseSection title={`Night ${nIndex + 1}`}>
                <p>Matches</p>
                <div className="ml-2">
                  {n.matches.map((match, mIndex) => {
                    const matchWinner = results?.nights[nIndex]?.matches[mIndex]?.winner
                    const resultString = getMatchResultString(matchWinner, match, participants)
                    return <div key={`N${nIndex}M${mIndex}`}>{`${mIndex + 1}. ${resultString}`}</div>
                  })}
                </div>
              </CollapseSection>
            </div>
          ))}
          <div>
            <p className="text-xl">Seeds</p>
            <div className="flex flex-row">
              {results.seeds.map((block) => (
                <div key={block.blockName + 'seeds'} className="ml-3">
                  <p className="text-l font-semibold">{block.blockName}</p>
                  {block.seeds.map((seed, i) => (
                    <p key={`${block.blockName}seed${i}`}>{`${i + 1}. ${seed.name}`}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xl">Bracket</p>
            {matchDetails.map((details, i) => (
              <div key={details.label}>{`${i + 1}. ${details.label}`}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TournamentDetails
