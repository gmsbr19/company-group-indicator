import { Routes, Route } from "react-router-dom";
import Admin from "./views/Admin";
import Show from "./views/Show";
import axios, { AxiosResponse } from "axios";
import Groups from "./views/Groups";
import Start from "./views/Start";

import { group } from "./data";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import audio from "./assets/sounds/call-to-attention.mp3";

// npm install @reduxjs/toolkit react-redux

function App() {
  const [groups, setGroups] = useState<group[]>([]);
  const [showingGroups, setShowingGroups] = useState<group[]>([]);
  const [currentGate, setCurrentGate] = useState<number>(0);
  const [currentCompany, setCurrentCompany] = useState<number>(0);

  const [storedCurrentGate, setStoredCurrentGate] = useState<any>(localStorage.getItem('currentGate'));
  const [storedCurrentCompany, setStoredCurrentCompany] = useState<any>(localStorage.getItem('currentCompany'));

  useEffect(() => {
    getGroups();
  }, []);

  const openGroupsWindow = () => {
    localStorage.setItem('currentGate', `${currentGate}`)
    localStorage.setItem('currentCompany', `${currentCompany}`)

    setStoredCurrentCompany(currentCompany)
    setStoredCurrentGate(currentGate)
    console.log(storedCurrentGate, storedCurrentCompany)
  }

  const getGroups = () => {
    axios
      .get("https://localhost:44353/api/group")
      .then((res) => setGroups(res.data));
  };

  const setShow = () => {
    const resArr: number[] = [];
    for (let group of showingGroups) {
      const res = axios.put(`https://localhost:44353/api/group`, {
        ...group,
        show: group.show === true ? 1 : 0,
      });
      res.then((r) => resArr.push(r.status));
    }
    if (resArr.every((e) => e === 200)) {
      toast.success("Atualizado com sucesso!");
      const play = new Audio(audio);
      play.play();
    }
    getGroups();
  };

  const handleCompAndGateChange = () => {
    if (currentCompany > 0 && currentGate > 0) {
      setShowingGroups(
        groups.filter(
          (e) => e.company_id === currentCompany && e.gate_id === currentGate
        )
      );
    } else {
      window.alert("Insira a companhia e o portão corretamente");
    }
    getGroups();
  };

  const toggleShow = (id: number) => {
    setShowingGroups(
      showingGroups.map((group) => {
        return id === group.id ? { ...group, show: !group.show } : group;
      })
    );
    console.log(showingGroups[id - 1]);
  };

  const handleSideChange = (e: HTMLSelectElement, id: number) => {
    setShowingGroups(
      showingGroups.map((group) => {
        return id === group.id
          ? { ...group, side: e.options[e.selectedIndex].value }
          : group;
      })
    );
  };

  const handleFromChange = (e: HTMLInputElement, id: number) => {
    setShowingGroups(
      showingGroups.map((group) => {
        return id === group.id
          ? { ...group, from_seat: parseInt(e.value) }
          : group;
      })
    );
  };

  const handleToChange = (e: HTMLInputElement, id: number) => {
    setShowingGroups(
      showingGroups.map((group) => {
        return id === group.id
          ? { ...group, to_seat: parseInt(e.value) }
          : group;
      })
    );
  };

  return (
    <div>
      <Routes>
        <Route
          element={
            <Admin
              groups={showingGroups}
              handleSideChange={handleSideChange}
              toggleShow={toggleShow}
              handleFromChange={handleFromChange}
              handleToChange={handleToChange}
              setShow={setShow}
              openGroupsWindow={openGroupsWindow}
            />
          }
          path="/admin"
        />
        <Route element={<Show showingGroups={showingGroups} />} path="/show" />
        <Route element={<Groups />} path="/groups" />
        <Route
          element={
            <Start
              groups={showingGroups}
              handleCompAndGateChange={handleCompAndGateChange}
              setCurrentGate={setCurrentGate}
              setCurrentCompany={setCurrentCompany}
              currentCompany={currentCompany}
              currentGate={currentGate}
              openGroupsWindow={openGroupsWindow}
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
  );
}

export default App;
