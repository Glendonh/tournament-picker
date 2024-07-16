import Head from 'next/head'
import Link from 'next/link'

export const Home = (): JSX.Element => (
  <div className="container pt-12">
    <Head>
      <title>Tournament Thing</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <h1 className="title text-3xl text-center">{`Glendon's Tournament Picker Thing`}</h1>
      <h3 className="text-xl text-center">Functionality</h3>
      <div className="flex flex-row justify-center">
        <div className="flex-col mr-6">
          <Link href="/user">
            <p className="text-lg text-sky-600 underline">User</p>
          </Link>
          <Link href="/pickem" className="text-sky-600 underline">{`Pick 'em form`}</Link>
          <p>Create/Manage Group</p>
          <p>Track Group Results</p>
        </div>
        <div className="flex-col">
          <p className="text-lg">Admin</p>
          <Link href="/tournamentBuilder" className="text-sky-600 underline">
            Design Tournament
          </Link>
          <p>Enter Results</p>
          <p>General Admin</p>
        </div>
      </div>
    </main>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
          Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
)

export default Home
