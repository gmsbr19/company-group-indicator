import { group } from "../data";
import { useRef, useState } from "react";
import Show from "./Show";
import audio from "../assets/sounds/call-to-attention.mp3";

type Props = {
  groups: group[];
  toggleShow: (id: number) => void;
  setShow: () => void;
  handleSideChange: (e: HTMLSelectElement, id: number) => void;
  handleFromChange: (e: HTMLInputElement, id: number) => void;
  handleToChange: (e: HTMLInputElement, id: number) => void;
  setCurrentCompany: React.Dispatch<React.SetStateAction<number>>;
  setCurrentGate: React.Dispatch<React.SetStateAction<number>>;
  handleCompAndGateChange: () => void;
};

const Admin = ({
  groups,
  toggleShow,
  setShow,
  handleSideChange,
  handleFromChange,
  handleToChange,
  setCurrentGate,
  setCurrentCompany,
  handleCompAndGateChange
}: Props) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  return (
    <div className="d-flex align-items-center vw-100 vh-100 flex-column">
      <div className="h-75 w-100 bg-black d-flex flex-column align-items-center">
        <div className="bg-light h-100 w-75 row m-0 bg">
          <Show showingGroups={groups} />
        </div>
      </div>
      <div className="d-flex gap-4 row vw-100 px-4 mt-2">
        <div className="col-12 row m-0 p-0">
          <div className="d-flex col-3 me-0">
            <span className="fs-6">Companhia aérea: </span>
            <select className="form-select" onChange={e => setCurrentCompany(parseInt(e.target.options[e.target.selectedIndex].value))}>
              <option defaultValue="0">
                Selecione
              </option>
              <option value="1">Gol</option>
              <option value="3">Azul</option>
              <option value="2">Latam</option>
            </select>
          </div>
          <div className="d-flex col-3">
            <span className="fs-6">Portão de embarque: </span>
            <select className="form-select" onChange={e => setCurrentGate(parseInt(e.target.options[e.target.selectedIndex].value))}>
              <option defaultValue="0">
                Selecione
              </option>
              <option value="1">G1</option>
              <option value="2">G2</option>
              <option value="3">G3</option>
              <option value="4">G4</option>
              <option value="5">G5</option>
              <option value="6">G6</option>
              <option value="7">G7</option>
              <option value="8">G8</option>
            </select>
          </div>
          <button className="col-1 btn btn-outline-primary" onClick={() => handleCompAndGateChange()}>Alterar</button>
        </div>
        {groups.map((group, i) => (
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
                <label className="form-check-label" htmlFor={group.label}>
                  Mostrar
                </label>
              </div>
            </div>
            <div className="card-body row">
              <div className="d-flex flex-column col-6">
                <span className="fs-6 mb-1">Assentos grupo {group.label}:</span>
                <div className="row align-items-center">
                  <div className="col-6 d-flex gap-2">
                    <label className="form-label">De</label>
                    <input
                      type="number"
                      id="from"
                      className="form-control"
                      onChange={(e) => handleFromChange(e.target, group.id)}
                      value={group.from_seat > 0 ? group.from_seat : ""}
                    />
                  </div>
                  <div className="col-6 d-flex gap-2">
                    <label className="form-label">Até</label>
                    <input
                      type="number"
                      id="to"
                      className="form-control"
                      onChange={(e) => handleToChange(e.target, group.id)}
                      value={group.to_seat > 0 ? group.to_seat : ""}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex flex-column">
                <span className="fs-6 mb-1">Selecione o lado da fila: </span>
                <select
                  className="form-select"
                  onChange={(e) => handleSideChange(e.target, group.id)}
                  value={group.side}
                >
                  <option defaultValue="none">Nenhum</option>
                  <option value="left">Esquerda</option>
                  <option value="middle">Meio</option>
                  <option value="right">Direita</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
      {groups.length > 1 && <button
        className="btn btn-outline-primary align-self-end me-4 mt-2"
        onClick={() => {
          const play = new Audio(audio);
          play.play();
          setShow();
        }}
      >
        <span>Aplicar</span>
      </button>}
      <a
        href="/groups"
        className="btn btn-primary position-absolute mt-2 me-2"
        style={{ right: "0px" }}
        target="_blank"
      >
        Abrir visualização{" "}
        <i className="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    </div>
  );
};

export default Admin;
