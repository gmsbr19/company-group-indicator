import {Routes, Route} from 'react-router-dom'
import Admin from './views/Admin'
import Show from './views/Show'

import { golGroups, group } from './data'
import { useEffect, useState } from 'react'

function App() {
  const [groups, setGroups] = useState<group[]>([])
  const [showingGroups, setShowingGroups] = useState<group[]>([])

  useEffect(() => {
    setGroups(golGroups)
  }, [])

  useEffect(() => {
    setShowingGroups(groups.filter(group => {
      return group.show === true
    }))
  }, groups)

  const toggleShow = (id: number) => {
    setGroups(groups.map(group => {
      return id === group.id ? {...group, show: !group.show} : group
    }))
  }

  return (
    <div>
      <Routes>
        <Route element={<Admin golGroups={groups} showingGroups={showingGroups} toggleShow={toggleShow} />}  path="/" />
        <Route element={<Show />} path="/show" />
      </Routes>
    </div>
  )
}

export default App
