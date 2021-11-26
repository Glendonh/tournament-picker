import Link from 'next/link'

const PickEm = (): JSX.Element => (
  <div className="flex-col">
    <Link href="/">Go Home, Dipshit</Link>
    <ul>
      <li>Interface to pick winner</li>
      <li>Tracker to show standings from picks</li>
    </ul>
  </div>
)

export default PickEm
