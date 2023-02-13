import { group } from "../data";
import gol from "../assets/gol.png";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Show from "./Show";

const Groups = () => {
  const [showingGroups, setShowingGroups] = useState<group[]>([]);

  useEffect(() => {
    setInterval(() => {
        axios
        .get<group[]>("http://localhost:3000/content/gate1")
        .then((res: AxiosResponse) => {
            console.log(res.data)
            setShowingGroups(res.data.groups)
        });
    }, 2000)
  }, []);

  return (
    <div className="row m-0 p-0 vh-100">
      <Show showingGroups={showingGroups} />
    </div>
  );
};

export default Groups;
