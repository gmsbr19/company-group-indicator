import { group } from "../data";

type Props = {
    golGroups: group[]
}

const Admin = ({golGroups}: Props) => {
    return (
        <div className="d-flex align-items-center justify-content-center vw-100 vh-100">
            <div className="bg-light row h-50 w-50">
                {golGroups.map((group, i) => (
                    group.show && <div key={i} className="col h-100 text-white" style={{backgroundColor: group.color}}>{group.label}</div>
                ))}
            </div>
        </div>
    );
}
 
export default Admin;