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
    <div className="d-flex align-items-center vw-100 vh-100 flex-column">
      <div className="bg-light row h-75 w-100 m-0">
        <Show showingGroups={showingGroups} />
      </div>
      <div className="d-flex gap-4">
        {golGroups.map((group, i) => (
          <div key={i} className="d-flex align-items-center gap-1">
            <div className="form-check">
              <input
                type="checkbox"
                ref={checkboxRef}
                id={group.label}
                onChange={() => toggleShow(group.id)}
                checked={group.show}
                className="form-check-input"
              />
              <label className="form-check-label" htmlFor={group.label}>{group.label}</label>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex gap-4">
        {golGroups.map((group, i) => (
          <div key={i} className="d-flex align-items-center">
            <div className="d-flex flex-column">
              Assentos grupo {group.label}:
              <div className="d-flex flex-column">
                <div className="input-group w-50">
                  <span className="input-group-text">De</span>
                  <input type="number" id="from" className="form-control" />
                </div>
                <div className="input-group w-50">
                  <label className="input-group-text">Até</label>
                  <input type="number" id="to" className="form-control" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
