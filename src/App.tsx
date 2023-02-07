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

  useEffect(() => {
    axios
        .get<group[]>("http://localhost:3000/content/1")
        .then((res: AxiosResponse) => {
            console.log(res.data)
            setGroups(res.data)
        });
  }, [])

  useEffect(() => {
    // setShowingGroups(groups.filter(group => {
    //   return group.show === true
    // }))
  }, [groups])

  const setShow = () => {
    axios.put('http://localhost:3000/content/1', [...groups])
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
        <Route element={<Admin golGroups={groups} handleSideChange={handleSideChange} toggleShow={toggleShow} handleFromChange={handleFromChange} handleToChange={handleToChange} setShow={setShow} />}  path="/" />
        <Route element={<Show showingGroups={groups} />} path="/show" />
        <Route element={<Groups />} path="/groups" />
      </Routes>
    </div>
  )
}

export default App
