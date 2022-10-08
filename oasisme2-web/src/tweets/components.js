import React, {useEffect, useState}  from 'react'

import {oasisCreate} from './create'
import {oasis} from './detail'
import {apioasisDetail} from './lookup'
import {FeedList} from './feed'
import {postsList} from './list'

export function FeedComponent(props) {
  const [newposts, setNewposts] = useState([])
  const canoasis = props.canoasis === "false" ? false : true
  const handleNewoasis = (newoasis) =>{
    let tempNewposts = [...newposts]
    tempNewposts.unshift(newoasis)
    setNewposts(tempNewposts)
  }
  return <div className={props.className}>
          {canoasis === true && <oasisCreate didoasis={handleNewoasis} className='col-12 mb-3' />}
        <FeedList newposts={newposts} {...props} />
  </div>
}

export function postsComponent(props) {
    const [newposts, setNewposts] = useState([])
    const canoasis = props.canoasis === "false" ? false : true
    const handleNewoasis = (newoasis) =>{
      let tempNewposts = [...newposts]
      tempNewposts.unshift(newoasis)
      setNewposts(tempNewposts)
    }
    return <div className={props.className}>
            {canoasis === true && <oasisCreate didoasis={handleNewoasis} className='col-12 mb-3' />}
          <postsList newposts={newposts} {...props} />
    </div>
}


export function oasisDetailComponent(props){
  const {oasisId} = props
  const [didLookup, setDidLookup] = useState(false)
  const [oasis, setoasis] = useState(null)

  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      setoasis(response)
    } else {
      alert("There was an error finding your oasis.")
    }
  }
  useEffect(()=>{
    if (didLookup === false){

      apioasisDetail(oasisId, handleBackendLookup)
      setDidLookup(true)
    }
  }, [oasisId, didLookup, setDidLookup])

  return oasis === null ? null : <oasis oasis={oasis} className={props.className} />
 }