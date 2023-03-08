import { group } from "../data";
import { useLocation } from "react-router-dom";
import gol from "../assets/gol.png";
type Props = {
  showingGroups: group[];
};

const Show = ({ showingGroups }: Props) => {
  const location = useLocation();
  const { pathname } = location;
  const arrowSize = pathname === "/groups" ? "200" : "128";

  const duration = (length: number) => {
    return length < 30 ? 15 : length / 2.5;
  };

  return (
    <div className="row m-0 p-0">
      {showingGroups.map(
        (group, i) =>
          group.show && (
            <div
              key={i}
              className={`col-${
                12 / showingGroups.filter((e) => e.show).length
              } h-100 text-white position-relative p-0`}
              style={{ backgroundColor: group.color }}
            >
              <img
                src={gol}
                alt=""
                width="130px"
                style={{ marginBottom: "-50px" }}
              />
              <div className="d-flex flex-column">
                <div className="d-flex flex-column fs-1 justify-content-center ms-3">
                  <span>Grupo</span>
                  <small className="fs-4 text-muted ms-1">Group</small>
                </div>
                <span className="group-label">{group.label}</span>
                {group.message && (
                  <>
                    <div
                      className="text-warning fw-semibold fs-3 overflow-hidden d-flex flex-row message-container"
                      style={{
                        borderColor: group.color,
                        borderBottom: "2px solid white",
                      }}
                    >
                      <i className="bi bi-exclamation-triangle fs-3" style={{backgroundColor: group.color, zIndex: 2, width: "32px", color: "white"}}></i>
                      <div className="sliding">
                        <span
                          style={{
                            animation: `slide ${duration(
                              group.message.length
                            )}s linear infinite`,
                          }}
                        >
                          {group.message}&nbsp;&nbsp;&nbsp;
                        </span>
                      </div>
                      <div className="sliding sliding2">
                        <span
                          style={{
                            animation: `slide ${duration(
                              group.message.length
                            )}s linear infinite`,
                            animationDelay: `${
                              duration(group.message.length) / 2
                            }s`,
                          }}
                        >
                          {group.message}&nbsp;&nbsp;&nbsp;
                        </span>
                      </div>
                    </div>
                  </>
                )}
                {group.from_seat > 0 && group.to_seat > 0 && (
                  <span className="align-self-center fs-1">
                    Assentos {group.from_seat} a {group.to_seat}
                  </span>
                )}
              </div>
              {group.priority === 1 && (
                <div
                  style={{ height: "40%" }}
                  className="bg-white text-dark priority-footer w-100 position-absolute bottom-0 d-flex justify-content-center"
                >
                  <div className="d-flex flex-column align-items-center mt-2">
                    <h1 className="mb-0">Prioridades por lei</h1>
                    <p className="text-muted m-0 mb-1 fs-5">
                      Special assistance
                    </p>
                    <div className="fs-2 mt-1 d-flex gap-4">
                      <i className="fa-solid fa-wheelchair"></i>
                      <i className="fa-solid fa-person-cane"></i>
                      <i className="fa-solid fa-person-breastfeeding"></i>
                      <i className="fa-solid fa-person-pregnant"></i>
                      <i className="fa-solid fa-ribbon"></i>
                    </div>
                  </div>
                </div>
              )}
              {group.side === "left" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={arrowSize}
                  height={arrowSize}
                  fill={group.priority === 1 ? "black" : "white"}
                  className="bi bi-arrow-down-left position-absolute bottom-0"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0v6z"
                  />
                </svg>
              ) : group.side === "right" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={arrowSize}
                  height={arrowSize}
                  fill={group.priority === 1 ? "black" : "white"}
                  className="bi bi-arrow-down-right position-absolute end-0 bottom-0"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z"
                  />
                </svg>
              ) : (
                group.side === "middle" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={arrowSize}
                    height={arrowSize}
                    fill={group.priority === 1 ? "black" : "white"}
                    className="bi bi-arrow-down position-absolute start-50 translate-middle"
                    viewBox="0 0 16 16"
                    style={{ bottom: "-55px" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                    />
                  </svg>
                )
              )}
            </div>
          )
      )}
    </div>
  );
};

export default Show;
