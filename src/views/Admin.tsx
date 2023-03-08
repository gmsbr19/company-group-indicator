import { group } from "../data";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Show from "./Show";
import audio from "../assets/sounds/call-to-attention.mp3";

type Props = {
  groups: group[];
  toggleShow: (id: number) => void;
  setShow: () => void;
  handleSideChange: (e: HTMLSelectElement, id: number) => void;
  handleFromChange: (e: HTMLInputElement, id: number) => void;
  handleToChange: (e: HTMLInputElement, id: number) => void;
  handleMessageChange: (e: HTMLInputElement, id: number) => void;
  isLoading: boolean;
  getGroups: () => void
};

const Admin = ({
  groups,
  toggleShow,
  setShow,
  handleSideChange,
  handleFromChange,
  handleMessageChange,
  handleToChange,
  getGroups,
  isLoading
}: Props) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <div className="d-flex align-items-center vw-100 vh-100 flex-column">
      {isLoading && <div className="position-absolute vw-100 vh-100 loadingScreen d-flex align-items-center justify-content-center">
        <div className="d-flex flex-column align-items-center text-light gap-3">
          <div className="spinner-border" role="status"></div>
          <span>Carregando...</span>
        </div>
      </div>}
      <div className="h-75 w-100 bg-black d-flex flex-column align-items-center">
        <div className="bg-light h-100 w-75 row m-0 bg">
          <Show showingGroups={groups} />
        </div>
      </div>
      <div className="d-flex gap-2 row vw-100 px-4 mt-2">
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
                      value={group.from_seat > 0 ? group.from_seat : 0}
                    />
                  </div>
                  <div className="col-6 d-flex gap-2">
                    <label className="form-label">Até</label>
                    <input
                      type="number"
                      id="to"
                      className="form-control"
                      onChange={(e) => handleToChange(e.target, group.id)}
                      value={group.to_seat > 0 ? group.to_seat : 0}
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
              <div className="col-12 d-flex flex-column">
                <span className="fs-6 mb-1">Mensagem: </span>
                <input
                      type="text"
                      className="form-control mensagemInput"
                      onChange={(e) => handleMessageChange(e.target, group.id)}
                      maxLength={132}
                      value={group.message}
                    />
              </div>
            </div>
          </div>
        ))}
      </div>
      {groups.length > 1 && (
        <button
          className="btn btn-outline-primary align-self-end me-4 my-2"
          onClick={() => {
            setShow();
          }}
        >
          <span>Aplicar</span>
        </button>
      )}
      <a
        href="/groups"
        className="btn btn-primary position-absolute mt-2 me-2"
        style={{ right: "0px" }}
        target="_blank"
      >
        Abrir visualização{" "}
        <i className="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
      <Link
        to="/"
        className="btn btn-primary position-absolute mt-2 ms-2 backBtn"
        style={{ left: "0px" }}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
    </div>
  );
};

export default Admin;
