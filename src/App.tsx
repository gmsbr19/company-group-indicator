import { Routes, Route } from "react-router-dom";
import Admin from "./views/Admin";
import Show from "./views/Show";
import axios, { AxiosResponse } from "axios";
import Groups from "./views/Groups";

import { group } from "./data";
import { useEffect, useState } from "react";

// npm install @reduxjs/toolkit react-redux

function App() {
  const [groups, setGroups] = useState<group[]>([]);
  const [showingGroups, setShowingGroups] = useState<group[]>([]);
  const [currentGate, setCurrentGate] = useState<number>(0);
  const [currentCompany, setCurrentCompany] = useState<number>(0);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = () => {
    axios
      .get("https://localhost:44353/api/group")
      .then((res) => setGroups(res.data));
  };

  const setShow = () => {
    for (let group of showingGroups){
      console.log(group)
      axios.put(`https://localhost:44353/api/group`, {...group, show: group.show === true ? 1 : 0});
    }
    getGroups()
  };

  const handleCompAndGateChange = () => {
    if(currentCompany > 0 && currentGate > 0){
      setShowingGroups(
        groups.filter(
          (e) => e.company_id === currentCompany && e.gate_id === currentGate
        )
      );
      console.log(showingGroups, currentCompany, currentGate);
    } else {
      window.alert("Insira a companhia e o portão corretamente")
    }
    getGroups()
  };

  const toggleShow = (id: number) => {
    console.log(id)
    setShowingGroups(
      showingGroups.map((group) => {
        return id === group.id
          ? { ...group, show: !group.show }
          : group;
      })
    );
    console.log(showingGroups[id - 1])
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
        return id === group.id ? { ...group, from_seat: parseInt(e.value) } : group;
      })
    );
  };

  const handleToChange = (e: HTMLInputElement, id: number) => {
    setShowingGroups(
      showingGroups.map((group) => {
        return id === group.id ? { ...group, to_seat: parseInt(e.value) } : group;
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
              setCurrentGate={setCurrentGate}
              setCurrentCompany={setCurrentCompany}
              handleCompAndGateChange={handleCompAndGateChange}
            />
          }
          path="/"
        />
        <Route element={<Show showingGroups={showingGroups} />} path="/show" />
        <Route element={<Groups />} path="/groups" />
      </Routes>
    </div>
  );
}

export default App;
