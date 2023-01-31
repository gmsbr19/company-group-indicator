import { group } from "../data";
import gol from "../assets/gol.png";
import { useRef } from "react";
import Show from "./Show";

type Props = {
  golGroups: group[];
  showingGroups: group[];
  toggleShow: (id: number) => void;
  handleSideChange: (e: HTMLSelectElement, id: number) => void;
};

const Admin = ({ golGroups, showingGroups, toggleShow, handleSideChange }: Props) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  return (
    <div className="d-flex align-items-center vw-100 vh-100 flex-column">
      <div className="bg-light row h-75 w-100 m-0">
        <Show showingGroups={showingGroups} />
      </div>
      <div className="d-flex gap-4 row vw-100 px-4 mt-2">
        {golGroups.map((group, i) => (
            <div key={i} className="card col p-0">
              <div className="card-header d-flex gap-1 align-items-center">
                Grupo {group.label} |
                <div className="form-check d-flex align-items-center gap-1">
                  <input
                    type="checkbox"
                    ref={checkboxRef}
                    id={group.label}
                    onChange={() => toggleShow(group.id)}
                    checked={group.show}
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor={group.label}>Mostrar</label>
                </div>
              </div>
              <div className="card-body row">
                <div className="d-flex flex-column col-6">
                  <span className="fs-6 mb-1">Assentos grupo {group.label}:</span>
                  <div className="row align-items-center">
                    <div className="col-6 d-flex gap-2">
                      <label className="form-label">De</label>
                      <input type="number" id="from" className="form-control" />
                    </div>
                    <div className="col-6 d-flex gap-2">
                      <label className="form-label">Até</label>
                      <input type="number" id="to" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="col-6 d-flex flex-column">
                  <span className="fs-6 mb-1">Selecione o lado da fila: </span>
                  <select className="form-select" onChange={e => handleSideChange(e.target, group.id)}>
                    <option defaultValue="none">...</option>
                    <option value="left">Esquerda</option>
                    <option value="middle">Meio</option>
                    <option value="right">Direita</option>
                  </select>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
