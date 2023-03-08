import { group } from "../data";
import axios from "axios";
import { useEffect, useState } from "react";
import Show from "./Show";

const Groups = () => {
  const [groups, setGroups] = useState<group[]>([])
  const [currentCompany, setCurrentCompany] = useState<string>("")
  const [currentGate, setCurrentGate] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    let cookies = document.cookie;
    setCurrentCompany(cookies.split(" ").map(e => e.split("="))[0][1].charAt(0))
    setCurrentGate(cookies.split(" ").map(e => e.split("="))[1][1].charAt(0))
  }, [])

  useEffect(() => {
    if(currentCompany !== '' && currentGate !== ''){
      setInterval(() => {
        getGroups()
        console.log(currentCompany, currentGate)
      }, 5000)
    }

  }, [currentCompany, currentGate]);

  const getGroups = () => {
    axios
      .get(`https://localhost:44353/api/Group?currentGate=${currentGate}&currentCompany=${currentCompany}`)
      .then((res) => setGroups(res.data))
      .then(() => setIsLoading(false))
  };

  return (
    <div className="row m-0 p-0 vh-100">
      <Show showingGroups={groups} />
      {isLoading && <div className="position-absolute vw-100 vh-100 loadingScreen d-flex align-items-center justify-content-center">
        <div className="d-flex flex-column align-items-center text-light gap-3">
          <div className="spinner-border" role="status"></div>
          <span>Carregando...</span>
        </div>
      </div>}
    </div>
  );
};

export default Groups;
