
import { useUser } from '../../hooks/UserContext';
import { Link } from "react-router-dom";
export default function UserPage(){
    const {user} = useUser()
    return (
        <div>
            <Link to='/'>tabela</Link>
            {JSON.stringify(user)}
        </div>
    );
}