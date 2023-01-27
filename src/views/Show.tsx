import { group } from "../data";
import gol from "../assets/gol.png";
import { useEffect, useState } from "react";

type Props = {
  showingGroups: group[];
};

const Show = ({ showingGroups }: Props) => {
  return (
    <div className="row">
        {showingGroups.map(
          (group, i) => (
              <div
                key={i}
                className="col h-100 text-white"
                style={{ backgroundColor: group.color }}>
                <img src={gol} alt="" width="130px" />
                <div className="container d-flex flex-column">
                  <div className="d-flex flex-column fs-1 justify-content-center">
                    <span>Grupo</span>
                    <small className="fs-4 text-muted ms-1">Group</small>
                  </div>
                  <span className="group-label">{group.label}</span>
                </div>
                <div className="bg-white priority-footer"></div>
              </div>
            )
        )}
    </div>
  );
};

export default Show;
