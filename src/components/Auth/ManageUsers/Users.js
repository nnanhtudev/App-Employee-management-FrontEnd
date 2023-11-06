import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Users = (props) =>{
  let history = useHistory()
  useEffect(()=>{
    let session = sessionStorage.getItem('account')
    if (!session) {
      history.push('/login')
    }
  },[])
  return (
    <div>
      <h1>Users</h1>
    </div>
  )
}

export default Users;