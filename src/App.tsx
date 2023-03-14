import { Routes, Route, useNavigate } from 'react-router-dom'
import Console from './views/Console'
import axios from 'axios'
import Groups from './views/Groups'
import Start from './views/Start'

import { group } from './data'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DropResult } from 'react-beautiful-dnd'

function App() {
  const [groups, setGroups] = useState<group[]>([])
  const [currentGate, setCurrentGate] = useState<number>(0)
  const [currentCompany, setCurrentCompany] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
  }, [])

  const getGroups = () => {
    setIsLoading(true)
    axios
      .get(
        `https://localhost:44353/api/Group?currentGate=${currentGate}&currentCompany=${currentCompany}`
      )
      .then((res) => {
        setGroups([...res.data].sort((a, b) => a.position - b.position))
      })
      .then(() => setIsLoading(false))
  }

  const setShow = () => {
    const resArr: number[] = []
    console.log(groups)
    groups.forEach((group, i) => {
      const res = axios.put(`https://localhost:44353/api/Group`, {
        ...group,
        show: group.show === true ? 1 : 0,
        position: i,
        to_seat: !group.to_seat ? 0 : group.to_seat,
        from_seat: !group.from_seat ? 0 : group.from_seat,
      })
      res.then((r) => resArr.push(r.status))
    })

    if (resArr.every((e) => e === 200)) {
      toast.success('Atualizado com sucesso!')
    }
  }

  const handleCompAndGateChange = () => {
    if (currentCompany > 0 && currentGate > 0) {
      document.cookie = `currentGate=${currentGate}`
      document.cookie = `currentCompany=${currentCompany}`
      getGroups()
      navigate('/console')
    } else {
      window.alert('Insira a companhia e o portão corretamente')
      return false
    }
  }

  const toggleShow = (id: number) => {
    setGroups(
      groups.map((group) => {
        return id === group.id ? { ...group, show: !group.show } : group
      })
    )
  }

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const items = Array.from(groups)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination?.index as number, 0, reorderedItem)

    setGroups(items)
  }

  const handleMessageChange = (e: HTMLInputElement, id: number) => {
    setGroups(
      groups.map((group) => {
        return id === group.id ? { ...group, message: e.value } : group
      })
    )
  }

  const handleSideChange = (e: HTMLSelectElement, id: number) => {
    setGroups(
      groups.map((group) => {
        return id === group.id
          ? { ...group, side: e.options[e.selectedIndex].value }
          : group
      })
    )
  }

  const handleFromChange = (e: HTMLInputElement, id: number) => {
    setGroups(
      groups.map((group) => {
        return id === group.id
          ? { ...group, from_seat: parseInt(e.value) }
          : group
      })
    )
  }

  const handleToChange = (e: HTMLInputElement, id: number) => {
    setGroups(
      groups.map((group) => {
        return id === group.id
          ? { ...group, to_seat: parseInt(e.value) }
          : group
      })
    )
  }

  return (
    <div>
      <Routes>
        <Route
          element={
            <Console
              groups={groups}
              handleSideChange={handleSideChange}
              toggleShow={toggleShow}
              handleFromChange={handleFromChange}
              handleToChange={handleToChange}
              handleMessageChange={handleMessageChange}
              setShow={setShow}
              isLoading={isLoading}
              getGroups={getGroups}
              handleOnDragEnd={handleOnDragEnd}
            />
          }
          path="/console"
        />
        <Route element={<Groups />} path="/groups" />
        <Route
          element={
            <Start
              handleCompAndGateChange={handleCompAndGateChange}
              setCurrentGate={setCurrentGate}
              setCurrentCompany={setCurrentCompany}
              currentCompany={currentCompany}
              currentGate={currentGate}
            />
          }
          path="/"
        />
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App
