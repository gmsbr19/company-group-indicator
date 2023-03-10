import { group } from "../data";
import axios from "axios";
import { useEffect, useState } from "react";
import Show from "./Show";
import usePrevious from "../usePrevious";
import audio from "../assets/sounds/call-to-attention.mp3";

const Groups = () => {
  const [groups, setGroups] = useState<group[]>([])
  const [sortedGroups, setSortedGroups] = useState<group[]>([])
  const [currentCompany, setCurrentCompany] = useState<string>("")
  const [currentGate, setCurrentGate] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const prevSorted = usePrevious(sortedGroups)

  useEffect(() => {
    let cookies = document.cookie;
    setCurrentCompany(cookies.split(" ").map(e => e.split("="))[0][1].charAt(0))
    setCurrentGate(cookies.split(" ").map(e => e.split("="))[1][1].charAt(0))
  }, [])

  useEffect(() => {
    if(currentCompany !== '' && currentGate !== ''){
      setInterval(() => {
        getGroups()
        
      }, 5000)
    }
  }, [currentCompany, currentGate]);

  useEffect(() => {
    let hasChanged: boolean = !sortedGroups.every((e, i) => isDeepEqual(e, (prevSorted as any)[i]))
    if(hasChanged){
      const play = new Audio(audio);
      play.play();
    }
  }, [sortedGroups])

  const isDeepEqual = (object1: group, object2: group): boolean => {
    if(!object1 || !object2) return false

    const objKeys1 = Object.keys(object1);
    const objKeys2 = Object.keys(object2);
  
    if (objKeys1.length !== objKeys2.length) return false;
  
    for (var key of objKeys1) {
      const value1 = (object1 as any)[key];
      const value2 = (object2 as any)[key];
  
      const isObjects = isObject(value1) && isObject(value2);
  
      if ((isObjects && !isDeepEqual(value1, value2)) ||
        (!isObjects && value1 !== value2)
      ) {
        return false;
      }
    }
    return true;
  };
  
  const isObject = (object: group) => {
    return object != null && typeof object === "object";
  };
  
  const getGroups = () => {
    axios
      .get(`https://localhost:44353/api/Group?currentGate=${currentGate}&currentCompany=${currentCompany}`)
      .then((res) => {
        const newGroups = res.data;
        setGroups(newGroups);
        const newSortedGroups = [...newGroups].sort((a, b) => a.position - b.position);
        setSortedGroups(newSortedGroups);
        setIsLoading(false);
      })
  
  };

  return (
    <div className="row m-0 p-0 vh-100">
      <Show showingGroups={sortedGroups} />
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
