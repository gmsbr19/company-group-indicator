import {Routes, Route} from 'react-router-dom'
import Admin from './views/Admin'
import Show from './views/Show'

import { golGroups, group } from './data'
import { useEffect, useState } from 'react'

// npm install @reduxjs/toolkit react-redux

function App() {
  const [groups, setGroups] = useState<group[]>([])
  const [showingGroups, setShowingGroups] = useState<group[]>([])

  useEffect(() => {
    setGroups(golGroups)
  }, [])

  useEffect(() => {
    // setShowingGroups(groups.filter(group => {
    //   return group.show === true
    // }))
  }, [groups])

  const setShow = () => {
    setShowingGroups(groups.filter(group => {
      return group.show === true
    }))
  }

  const toggleShow = (id: number) => {
    setGroups(groups.map(group => {
      return id === group.id ? {...group, show: !group.show} : group
    }))
  }

  const handleSideChange = (e: HTMLSelectElement, id: number) => {
    setGroups(groups.map(group => {
      return id === group.id ? {...group, side: e.options[e.selectedIndex].value} : group
    }))
  }

  const handleFromChange = (e: HTMLInputElement, id: number) => {
    setGroups(groups.map(group => {
      return id === group.id ? {...group, from: e.value} : group
    }))
  }

  const handleToChange = (e: HTMLInputElement, id: number) => {
    setGroups(groups.map(group => {
      return id === group.id ? {...group, to: e.value} : group
    }))
  }

  return (
    <div>
      <Routes>
        <Route element={<Admin golGroups={groups} showingGroups={showingGroups} handleSideChange={handleSideChange} toggleShow={toggleShow} handleFromChange={handleFromChange} handleToChange={handleToChange} setShow={setShow} />}  path="/" />
        <Route element={<Show showingGroups={showingGroups} />} path="/show" />
      </Routes>
    </div>
  )
}

export default App
