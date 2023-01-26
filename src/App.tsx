import {Routes, Route} from 'react-router-dom'
import Admin from './views/Admin'
import Show from './views/Show'

import { golGroups, group } from './data'
import { useState } from 'react'

function App() {
  const [group, setGroup] = useState<group[]>([])

  return (
    <div>
      <Routes>
        <Route element={<Admin golGroups={golGroups} />}  path="/" />
        <Route element={<Show />} path="/show" />
      </Routes>
    </div>
  )
}

export default App
