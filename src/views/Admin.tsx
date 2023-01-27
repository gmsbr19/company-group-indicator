import { group } from "../data";
import gol from '../assets/gol.png'

type Props = {
    golGroups: group[]
    showingGroups: group[]
    toggleShow: (id: number) => void
}

const Admin = ({golGroups, showingGroups, toggleShow}: Props) => {
    return (
        <div className="d-flex align-items-center justify-content-center vw-100 vh-100 flex-column">
            <div className="bg-light row h-50 w-50">
                {showingGroups.map((group, i) => (
                    <div key={i} className="col h-100 text-white" style={{backgroundColor: group.color}}>
                        <img src={gol} alt="" width="130px" />
                        <div className="container d-flex flex-column">
                            <div className="d-flex flex-column fs-1 justify-content-center">
                                <span>Grupo</span>
                                <small className="fs-4 text-muted ms-1">Group</small>
                            </div>
                            <span className="group-label">{group.label}</span>
                        </div>
                        <div className="bg-white priority-footer">

                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex gap-4">
                {golGroups.map((group, i) => (
                    <div key={i} className="d-flex align-items-center gap-1">
                        <input type="checkbox" id={group.label} onChange={() => toggleShow(group.id)} />
                        <label htmlFor={group.label}>{group.label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Admin;