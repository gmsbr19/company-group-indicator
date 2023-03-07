import { group } from "../data";
import axios from "axios";
import { useEffect, useState } from "react";
import Show from "./Show";

const Groups = () => {
  const [groups, setGroups] = useState<group[]>([])
  const [showingGroups, setShowingGroups] = useState<group[]>([]);
  const [currentCompany, setCurrentCompany] = useState<string>("")
  const [currentGate, setCurrentGate] = useState<string>("")

  useEffect(() => {
    let cookies = document.cookie;
    setCurrentCompany(cookies.split(" ").map(e => e.split("="))[0][1].charAt(0))
    setCurrentGate(cookies.split(" ").map(e => e.split("="))[1][1].charAt(0))
    
    getGroups()
    setInterval(() => {
      getGroups()
    }, 5000)

  }, []);

  const getGroups = () => {
    axios
      .get("https://localhost:44353/api/group")
      .then((res) => setGroups(res.data));
  };

  return (
    <div className="row m-0 p-0 vh-100">
      <Show showingGroups={groups.filter(
          (e: group) => e.company_id === parseInt(currentCompany) && e.gate_id === parseInt(currentGate)
        )} />
    </div>
  );
};

export default Groups;
