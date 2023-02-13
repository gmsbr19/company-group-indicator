import {Routes, Route} from 'react-router-dom'
import Admin from './views/Admin'
import Show from './views/Show'
import axios, {AxiosResponse} from 'axios'
import Groups from './views/Groups'

import { golGroups, group } from './data'
import { useEffect, useState } from 'react'

// npm install @reduxjs/toolkit react-redux

function App() {
  const [groups, setGroups] = useState<group[]>([])
  const [currentGate, setCurrentGate] = useState<string>("gate1")

  useEffect(() => {
    getGroups(currentGate)
  }, [])
  
  const getGroups = (group: string) => {
    axios
        .get<group[]>(`http://localhost:3000/content/${group}`)
        .then((res: AxiosResponse) => {
            setGroups(res.data.groups)
        });
  }

  useEffect(() => {
    // setShowingGroups(groups.filter(group => {
    //   return group.show === true
    // }))
  }, [groups])

  const setShow = () => {
    axios.put(`http://localhost:3000/content/${currentGate}`, {id: currentGate, groups: [...groups]})
  }

  const toggleShow = (id: number) => {
    setGroups(groups.map(group => {
      return id === group.id ? {...group, show: !group.show} : group
    }))
  }

  const handleCurrentGroupChange = (e: HTMLSelectElement) => {
    setCurrentGate(e.options[e.selectedIndex].value)
    getGroups(e.options[e.selectedIndex].value)
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
        <Route element={<Admin groups={groups} handleSideChange={handleSideChange} toggleShow={toggleShow} handleFromChange={handleFromChange} handleToChange={handleToChange} setShow={setShow} handleCurrentGroupChange={handleCurrentGroupChange} />}  path="/" />
        <Route element={<Show showingGroups={groups} />} path="/show" />
        <Route element={<Groups />} path="/groups" />
      </Routes>
    </div>
  )
}

export default App
