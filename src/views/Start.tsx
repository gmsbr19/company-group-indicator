import logo from '../assets/imgs/airport_logo.jpg'
import { group } from '../data'
import { Link } from 'react-router-dom'

type Props = {
  setCurrentCompany: React.Dispatch<React.SetStateAction<number>>
  setCurrentGate: React.Dispatch<React.SetStateAction<number>>
  handleCompAndGateChange: () => void
  currentGate: number
  currentCompany: number
}

const Start = ({
  setCurrentCompany,
  setCurrentGate,
  handleCompAndGateChange,
  currentCompany,
  currentGate,
}: Props) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-start vw-100 vh-100">
      <img src={logo} />
      <div className="d-flex justify-content-center align-items-center flex-column p-2">
        <p className="fs-4 fs-sm-2">Console grupos de embarque:</p>
        <div className="row m-0 p-0 justify-content-end">
          <div className="col-6 me-0 mb-3 mb-sm-0">
            <span className="fs-6">Companhia aérea: </span>
            <select
              className="form-select"
              onChange={(e) =>
                setCurrentCompany(
                  parseInt(e.target.options[e.target.selectedIndex].value)
                )
              }
              value={currentCompany}
            >
              <option defaultValue="0">Selecione</option>
              <option value="1">Gol</option>
              <option value="3">Azul</option>
              <option value="2">Latam</option>
            </select>
          </div>
          <div className="col-6">
            <span className="fs-6">Portão de embarque: </span>
            <select
              className="form-select"
              onChange={(e) =>
                setCurrentGate(
                  parseInt(e.target.options[e.target.selectedIndex].value)
                )
              }
              value={currentGate}
            >
              <option defaultValue="0">Selecione</option>
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
          <div className="col-12 mt-2 d-flex justify-content-end">
            <button
              className="btn btn-primary col-4"
              onClick={() => handleCompAndGateChange()}
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Start
