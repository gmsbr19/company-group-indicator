import { group } from "../data";
import gol from "../assets/gol.png";
import { useEffect, useState } from "react";

type Props = {
  showingGroups: group[];
};

const Show = ({ showingGroups }: Props) => {
  return (
    <div className="row m-0 p-0">
      {showingGroups.map((group, i) => (
        <div
          key={i}
          className="col h-100 text-white position-relative"
          style={{ backgroundColor: group.color }}
        >
          <img src={gol} alt="" width="130px" style={{marginBottom: '-50px'}} />
          <div className="d-flex flex-column ms-3">
            <div className="d-flex flex-column fs-1 justify-content-center">
              <span>Grupo</span>
              <small className="fs-4 text-muted ms-1">Group</small>
            </div>
            <span className="group-label">{group.label}</span>
          </div>
          <div className="bg-white priority-footer"></div>
          {i === 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              fill="currentColor"
              className="bi bi-arrow-down-left position-absolute bottom-0"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0v6z"
              />
            </svg>
          ) : i === showingGroups.length - 1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              fill="currentColor"
              className="bi bi-arrow-down-right position-absolute end-0 bottom-0"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              fill="currentColor"
              className="bi bi-arrow-down position-absolute start-50 translate-middle"
              viewBox="0 0 16 16"
              style={{bottom: "-55px"}}
            >
              <path
                fillRule="evenodd"
                d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default Show;
