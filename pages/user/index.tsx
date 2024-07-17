import Head from 'next/head'
const user = {
  name: 'GlendonH',
  groups: [{ name: 'Cageside Seats' }, { name: 'SquaredCircle' }, { name: 'POST Wrestling' }],
  brackets: [
    {
      tournament: 'G1 Climax 34',
      name: 'r/SC G1 Climax 34',
      score: 8,
      possible: 15,
      group: 'Squared Circle',
      standing: '23',
    },
    {
      tournament: 'G1 Climax 34',
      name: 'POST G1 2024',
      score: 8,
      possible: 15,
      group: 'POST Wrestling',
      standing: '23',
    },
  ],
}

const tournaments = [
  { name: 'G1 Climax 34', inProgress: true, complete: false },
  { name: 'G1 Climax 33', inProgress: false, complete: true },
]

const UserPage = () => {
  const tournamentsInProgress = tournaments.filter((t) => t.inProgress)
  const recentTournaments = tournaments.filter((t) => t.complete)
  return (
    <div className="container mx-3">
      <Head>
        <title>Tournament Thing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-xl text-center mt-12">{`Welcome ${user.name}`}</h1>
      <div className="flex flex-row space-x-3 justify-center mt-12">
        <div className="border rounded-md px-3 py-1">
          <p className="text-lg font-bold">My Groups</p>
          <hr />
          {user.groups.map((group) => (
            <p key={group.name}>{group.name}</p>
          ))}
          <button className="p-2 border rounded-sm w-full">+ Join Group</button>
        </div>
        <div className="border rounded-md px-3 py-1">
          <p className="text-lg font-bold">Tournaments</p>
          <hr />
          <p className="text-sm">In Progress</p>
          {tournamentsInProgress.map((t) => {
            const relevantBrackets = user.brackets.filter((bracket) => bracket.tournament === t.name)
            return (
              <div key={t.name}>
                <p className="font-semibold">{t.name}</p>
                {relevantBrackets.map((bracket) => (
                  <div className="pl-2" key={bracket.name}>
                    <p className="font-medium text-sky-600 underline">{bracket.name}</p>
                    <div className="pl-1">
                      <p>{`${bracket.score} out of ${bracket.possible} points`}</p>
                      <p>{`Place: ${bracket.standing}`}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
          <p className="text-sm">Recent</p>
          {recentTournaments.map((t) => (
            <p key={t.name} className="font-semibold">
              {t.name}
            </p>
          ))}
        </div>
        <div className="border rounded-md px-3 py-1">
          <p className="text-lg font-bold">Profile</p>
          <hr />
          <p>Settings</p>
        </div>
      </div>
    </div>
  )
}

export default UserPage
