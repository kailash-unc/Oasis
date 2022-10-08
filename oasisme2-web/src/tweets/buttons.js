import React from 'react'

import {apioasisAction} from './lookup'

export function ActionBtn(props) {
    const {oasis, action, didPerformAction} = props
    const likes = oasis.likes ? oasis.likes : 0
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    
    const handleActionBackendEvent = (response, status) =>{
      console.log(response, status)
      if ((status === 200 || status === 201) && didPerformAction){
        didPerformAction(response, status)
      }
    }
    const handleClick = (event) => {
      event.preventDefault()
      apioasisAction(oasis.id, action.type, handleActionBackendEvent)
        
    }
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay
    return <button className={className} onClick={handleClick}>{display}</button>
  }