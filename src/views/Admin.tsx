import { group } from "../data";
import gol from "../assets/gol.png";
import { useRef } from "react";
import Show from "./Show";

type Props = {
  golGroups: group[];
  showingGroups: group[];
  toggleShow: (id: number) => void;
};

const Admin = ({ golGroups, showingGroups, toggleShow }: Props) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  return (
    <div className="d-flex align-items-center justify-content-center vw-100 vh-100 flex-column">
      <div className="bg-light row h-50 w-50">
        <Show showingGroups={showingGroups} />
      </div>
      <div className="d-flex gap-4">
        {golGroups.map((group, i) => (
          <div key={i} className="d-flex align-items-center gap-1">
            <input
              type="checkbox"
              ref={checkboxRef}
              id={group.label}
              onChange={() => toggleShow(group.id)}
            />
            <label htmlFor={group.label}>{group.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
