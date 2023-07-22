import { Navigate } from 'react-router-dom';

export default function Protected({children}) {
    if((localStorage.getItem("isAdmin"))==="false"){
      return <Navigate to="/"/>
    }
    return children;
}