import { group } from "../data";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Show from "./Show";

const Groups = () => {
  const [groups, setGroups] = useState<group[]>([])
  const [showingGroups, setShowingGroups] = useState<group[]>([]);
  const [currentCompany, setCurrentCompany] = useState<any>(localStorage.getItem('company'))
  const [currentGate, setCurrentGate] = useState<any>(localStorage.getItem('gate'))

  useEffect(() => {
    const gate = localStorage.getItem('gate');
    const company = localStorage.getItem('company');
    console.log(gate, company)
    setInterval(() => {
      getGroups()
    }, 1000)

  }, []);

  const getGroups = () => {
    axios
      .get("https://localhost:44353/api/group")
      .then((res) => setShowingGroups(
        res.data.filter(
          (e: group) => e.company_id === parseInt(currentCompany) && e.gate_id === parseInt(currentGate)
        )
      ));
  };

  return (
    <div className="row m-0 p-0 vh-100">
      <Show showingGroups={showingGroups} />
    </div>
  );
};

export default Groups;
