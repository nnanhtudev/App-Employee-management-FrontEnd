import { Route, useHistory } from "react-router-dom";
import { useEffect } from "react"
const PrivateRoutes = (props) =>{
  let history = useHistory()
  useEffect(() => {
    let session = sessionStorage.getItem('account')
    if (!session) {
      history.push('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Route path={props.path} component={props.component}/>
    </>
  )
}

export default PrivateRoutes