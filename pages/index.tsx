import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export const Home = (): JSX.Element => (
  <div className="container">
    <Head>
      <title>Tournament Thing</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <p className="description">
        Get started by editing <code>pages/index.tsx</code>
      </p>
      <button
        onClick={() => {
          window.alert('With typescript and Jest')
        }}
      >
        Test Button
      </button>
      Functionality
      <ul>
        <li>{`Pick 'em form`}</li>
        <li>Create/Manage Group</li>
        <li>Track Group Results</li>
      </ul>
      <div className="grid">
        <Link href="/tournamentBuilder">
          <div className="card">
            <h3>{`V2 Builder`} &rarr;</h3>
            <p>For multiple formats</p>
          </div>
        </Link>
        <Link href="/pickem">
          <div className="card">
            <h3>{`V2 Builder`} &rarr;</h3>
            <p>Pickem Form</p>
          </div>
        </Link>
        {/* <Link href="/legacy/tournamentBuilder">
          <div className="card">
            <h3>Legacy Build a Tournament &rarr;</h3>
            <p>Form for putting together a G1 style tourney</p>
          </div>
        </Link>

        <Link href="/legacy/pickEm">
          <div className="card">
            <h3>{`Legacy Pick 'em Form`} &rarr;</h3>
            <p>For legacy tournament format</p>
          </div>
        </Link> */}

        {/* <a href="https://github.com/vercel/next.js/tree/master/examples" className="card">
          <h3>Examples &rarr;</h3>
          <p>Discover and deploy boilerplate example Next.js projects.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className="card"
        >
          <h3>Deploy &rarr;</h3>
          <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
        </a> */}
      </div>
    </main>

    <footer>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by <Image src="/vercel.svg" alt="Vercel Logo" height={'32'} width={'64'} />
      </a>
    </footer>

    <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      footer img {
        margin-left: 0.5rem;
      }

      footer a {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .title a {
        color: #0070f3;
        text-decoration: none;
      }

      .title a:hover,
      .title a:focus,
      .title a:active {
        text-decoration: underline;
      }

      .title {
        margin: 0;
        line-height: 1.15;
        font-size: 4rem;
      }

      .title,
      .description {
        text-align: center;
      }

      .description {
        line-height: 1.5;
        font-size: 1.5rem;
      }

      code {
        background: #fafafa;
        border-radius: 5px;
        padding: 0.75rem;
        font-size: 1.1rem;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono,
          Courier New, monospace;
      }

      .grid {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        max-width: 800px;
        margin-top: 3rem;
      }

      .card {
        margin: 1rem;
        flex-basis: 45%;
        padding: 1.5rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        transition: color 0.15s ease, border-color 0.15s ease;
      }

      .card:hover,
      .card:focus,
      .card:active {
        color: #0070f3;
        border-color: #0070f3;
      }

      .card h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
      }

      .card p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
      }

      @media (max-width: 600px) {
        .grid {
          width: 100%;
          flex-direction: column;
        }
      }
    `}</style>

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
