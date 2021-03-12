import React, { useEffect } from 'react'
import {ACTIONS} from '../reducer'

const Alert = ({list, dispatch, type, msg}) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({type:ACTIONS.CLOSE_ALERT})
    }, 3000);
    
    return () => clearTimeout(timeout); 
  }, [list])

  return (
    <div>
      <p className={`alert alert-${type}`}>{msg}</p>
    </div>
  )
}

export default Alert
