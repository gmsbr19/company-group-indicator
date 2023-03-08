import { Routes, Route, useNavigate } from "react-router-dom";
import Admin from "./views/Admin";
import Show from "./views/Show";
import axios, { AxiosResponse } from "axios";
import Groups from "./views/Groups";
import Start from "./views/Start";

import { group } from "./data";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import audio from "./assets/sounds/call-to-attention.mp3";

// npm install @reduxjs/toolkit react-redux

function App() {
  const [groups, setGroups] = useState<group[]>([]);
  const [currentGate, setCurrentGate] = useState<number>(0);
  const [currentCompany, setCurrentCompany] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
   
  }, []);

  const getGroups = () => {
    setIsLoading(true);
    axios
      .get(
        `https://localhost:44353/api/Group?currentGate=${currentGate}&currentCompany=${currentCompany}`
      )
      .then((res) => setGroups(res.data))
      .then(() => setIsLoading(false));
  };

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const setShow = () => {
    const resArr: number[] = [];
    console.log(groups);
    for (let group of groups) {
      sleep(1).then(() => {
        const res = axios.put(`https://localhost:44353/api/Group`, {
          ...group,
          show: group.show === true ? 1 : 0,
        });
        res.then((r) => resArr.push(r.status));
      });
    }
    if (resArr.every((e) => e === 200)) {
      toast.success("Atualizado com sucesso!");
      const play = new Audio(audio);
      play.play();
    }
  };

  const handleCompAndGateChange = () => {
    if (currentCompany > 0 && currentGate > 0) {
      document.cookie = `currentGate=${currentGate}`;
      document.cookie = `currentCompany=${currentCompany}`;
      getGroups();
      navigate("/admin");
      console.log(groups);
    } else {
      window.alert("Insira a companhia e o portão corretamente");
      return false;
    }
  };

  const toggleShow = (id: number) => {
    setGroups(
      groups.map((group) => {
        return id === group.id ? { ...group, show: !group.show } : group;
      })
    );
    console.log(groups[id - 1]);
  };

  const handleMessageChange = (e: HTMLInputElement, id: number) => {
    setGroups(
      groups.map((group) => {
        return id === group.id ? { ...group, message: e.value } : group;
      })
    );
  };

  const handleSideChange = (e: HTMLSelectElement, id: number) => {
    setGroups(
      groups.map((group) => {
        return id === group.id
          ? { ...group, side: e.options[e.selectedIndex].value }
          : group;
      })
    );
  };

  const handleFromChange = (e: HTMLInputElement, id: number) => {
    setGroups(
      groups.map((group) => {
        return id === group.id
          ? { ...group, from_seat: parseInt(e.value) }
          : group;
      })
    );
  };

  const handleToChange = (e: HTMLInputElement, id: number) => {
    setGroups(
      groups.map((group) => {
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
              groups={groups}
              handleSideChange={handleSideChange}
              toggleShow={toggleShow}
              handleFromChange={handleFromChange}
              handleToChange={handleToChange}
              handleMessageChange={handleMessageChange}
              setShow={setShow}
              isLoading={isLoading}
              getGroups={getGroups}
            />
          }
          path="/admin"
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
  );
}

export default App;
