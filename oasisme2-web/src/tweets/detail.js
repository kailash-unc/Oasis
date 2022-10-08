
import React, {useState}  from 'react'

import {ActionBtn} from './buttons'

import {
  UserDisplay,
  UserPicture
} from '../profiles'

export function Parentoasis(props){
    const {oasis} = props
    return oasis.parent ? <oasis isReoasis reoasiser={props.reoasiser} hideActions className={' '} oasis={oasis.parent} /> : null
  }
  export function oasis(props) {
      const {oasis, didReoasis, hideActions, isReoasis, reoasiser} = props
      const [actionoasis, setActionoasis] = useState(props.oasis ? props.oasis : null)
      let className = props.className ? props.className : 'col-10 mx-auto col-md-6'
      className = isReoasis === true ? `${className} p-2 border rounded` : className
      const path = window.location.pathname
      const match = path.match(/(?<oasisid>\d+)/)
      const urloasisId = match ? match.groups.oasisid : -1
      const isDetail = `${oasis.id}` === `${urloasisId}`
      
      const handleLink = (event) => {
        event.preventDefault()
        window.location.href = `/${oasis.id}`
      }
      const handlePerformAction = (newActionoasis, status) => {
        if (status === 200){
          setActionoasis(newActionoasis)
        } else if (status === 201) {
          if (didReoasis){
            didReoasis(newActionoasis)
          }
        }
        
      }
      
      return <div className={className}>
         {isReoasis === true && <div className='mb-2'>
          <span className='small text-muted'>Reoasis via <UserDisplay user={reoasiser} /></span>
        </div>}
        <div className='d-flex'>
       
          <div className=''>
            <UserPicture user={oasis.user} />
          </div>
          <div className='col-11'>
              <div>
             
                <p>
                  <UserDisplay includeFullName user={oasis.user} />
                </p>
                <p>{oasis.content}</p>
               
                <Parentoasis oasis={oasis} reoasiser={oasis.user} />
              </div>
          <div className='btn btn-group px-0'>
          {(actionoasis && hideActions !== true) && <React.Fragment>
                  <ActionBtn oasis={actionoasis} didPerformAction={handlePerformAction} action={{type: "like", display:"Likes"}}/>
                  <ActionBtn oasis={actionoasis} didPerformAction={handlePerformAction} action={{type: "unlike", display:"Unlike"}}/>
                  <ActionBtn oasis={actionoasis} didPerformAction={handlePerformAction} action={{type: "reoasis", display:"Reoasis"}}/>
                </React.Fragment>
          }
                  {isDetail === true ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>View</button>}
                </div>
                </div>
      </div>
      </div>
    }
  