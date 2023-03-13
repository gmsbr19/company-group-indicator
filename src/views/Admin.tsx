import { group } from "../data";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Show from "./Show";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import useScreenOrientation from 'react-hook-screen-orientation'

type Props = {
  groups: group[];
  toggleShow: (id: number) => void;
  setShow: () => void;
  handleSideChange: (e: HTMLSelectElement, id: number) => void;
  handleFromChange: (e: HTMLInputElement, id: number) => void;
  handleToChange: (e: HTMLInputElement, id: number) => void;
  handleMessageChange: (e: HTMLInputElement, id: number) => void;
  isLoading: boolean;
  getGroups: () => void;
  handleOnDragEnd: (result: DropResult) => void;
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
  handleOnDragEnd,
  isLoading,
}: Props) => {
  const navigate = useNavigate()
  const checkboxRef = useRef<HTMLInputElement>(null);
  const screenOrientation = useScreenOrientation()

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <div className="d-flex align-items-center vw-100 vh-100 flex-column">
      {isLoading && (
        <div className="position-absolute vw-100 vh-100 loadingScreen d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column align-items-center text-light gap-3">
            <div className="spinner-border" role="status"></div>
            <span>Carregando...</span>
          </div>
        </div>
      )}
      <div className={`h-75 w-100 bg-black flex-column align-items-center show`}>
        <div className="bg-light h-100 w-75 row m-0">
          <Show showingGroups={groups} />
        </div>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="configs" direction={`${screenOrientation === 'portrait-primary' ? 'vertical' : 'horizontal'}`}>
          {(provided) => (
            <ul
              className={`d-flex gap-2 row vw-100 px-4 mt-2 mb-0 ${screenOrientation === 'portrait-primary' ? 'flex-column mt-5' : 'flex-row'}`}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {groups.map((group, i) => (
                <Draggable key={group.id} draggableId={`${group.id}`} index={i}>
                  {(provided) => (
                    <li
                      className="card col p-0"
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <div className="card-header d-flex gap-1 align-items-center px-2">
                        <span {...provided.dragHandleProps} className="d-flex align-items-center justify-content-center" style={{width: "21px"}}>
                          <i className={`fa-solid fa-grip-lines${screenOrientation === 'portrait-primary' ? '' : '-vertical'} fs-5`}></i>
                        </span>
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
                          <label
                            className="form-check-label"
                            htmlFor={group.label}
                          >
                            Mostrar
                          </label>
                        </div>
                      </div>
                      <div className="card-body row">
                        <div className="d-flex flex-column col-6">
                          <span className="fs-6 mb-1">
                            Assentos:
                          </span>
                          <div className="row align-items-center">
                            <div className="col-12 col-xl-6 d-flex">
                              <label className="form-label me-2">De</label>
                              <input
                                type="number"
                                id="from"
                                className="form-control"
                                onChange={(e) =>
                                  handleFromChange(e.target, group.id)
                                }
                                value={
                                  group.from_seat > 0 ? group.from_seat : ''
                                }
                              />
                            </div>
                            <div className="col-12 col-xl-6 d-flex">
                              <label className="form-label me-1">Até</label>
                              <input
                                type="number"
                                id="to"
                                className="form-control"
                                onChange={(e) =>
                                  handleToChange(e.target, group.id)
                                }
                                value={group.to_seat > 0 ? group.to_seat : ''}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-6 d-flex flex-column">
                          <span className="fs-6 mb-1">
                            Lado da fila:{" "}
                          </span>
                          <select
                            className="form-select"
                            onChange={(e) =>
                              handleSideChange(e.target, group.id)
                            }
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
                            onChange={(e) =>
                              handleMessageChange(e.target, group.id)
                            }
                            maxLength={132}
                            value={group.message}
                          />
                        </div>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <footer className="d-flex w-100 align-items-end my-2 justify-content-end pe-4 pb-2">
        {groups.length > 1 && (
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              setShow();
            }}
          >
            <span>Aplicar</span>
          </button>
        )}
      </footer>
      <a
        href="/groups"
        className="btn btn-primary position-absolute mt-2 me-2 d-none"
        style={{ right: "0px" }}
        target="_blank"
      >
        Abrir visualização{" "}
        <i className="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
      <Link
        to="/"
        className="btn btn-primary position-absolute mt-2 ms-2 backBtn d-none d-md-block"
        style={{ left: "0px" }}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <Link
        to="/"
        className="p-2 position-absolute mt-2 ms-2 backBtn d-md-none"
        style={{ left: "0px" }}
      >
        <i className="fa-solid fa-arrow-left fs-2"></i>
      </Link>
    </div>
  );
};

export default Admin;
