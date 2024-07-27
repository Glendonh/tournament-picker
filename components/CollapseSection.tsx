import { useState } from 'react'
import { Collapse } from 'react-collapse'

const CollapseSection = ({ title, children }: { title: string; children: any }) => {
  const [isOpened, setIsOpened] = useState(false)
  const toggleIsOpened = () => setIsOpened((s) => !s)
  return (
    <div>
      <div className="w-40 border border-black p-1" onClick={toggleIsOpened}>
        {title}
      </div>
      <Collapse isOpened={isOpened}>{children}</Collapse>
    </div>
  )
}

export default CollapseSection
