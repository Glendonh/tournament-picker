import Link from 'next/link'
import PickEmForm from './PickEmForm'

const PickEm = (): JSX.Element => (
  <div className="flex-col">
    <Link href="/">Go Home, Dipshit</Link>
    <PickEmForm />
    <ul>
      <li>Interface to pick winner</li>
      <li>Tracker to show standings from picks</li>
    </ul>
  </div>
)

export default PickEm
