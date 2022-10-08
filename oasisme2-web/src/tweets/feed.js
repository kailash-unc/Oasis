import React, {useEffect, useState}  from 'react'

import {apioasisFeed} from './lookup'

import {oasis} from './detail'

export function FeedList(props) {
    const [postsInit, setpostsInit] = useState([])
    const [posts, setposts] = useState([])
    const [nextUrl, setNextUrl] = useState(null)
    const [postsDidSet, setpostsDidSet] = useState(false)
    useEffect(()=>{
      const final = [...props.newposts].concat(postsInit)
      if (final.length !== posts.length) {
        setposts(final)
      }
    }, [props.newposts, posts, postsInit])

    useEffect(() => {
      if (postsDidSet === false){
        const handleoasisListLookup = (response, status) => {
          if (status === 200){
            setNextUrl(response.next)
            setpostsInit(response.results)
            setpostsDidSet(true)
          }
        }
        apioasisFeed(handleoasisListLookup)
      }
    }, [postsInit, postsDidSet, setpostsDidSet, props.username])


    const handleDidReoasis = (newoasis) => {
      const updatepostsInit = [...postsInit]
      updatepostsInit.unshift(newoasis)
      setpostsInit(updatepostsInit)
      const updateFinalposts = [...posts]
      updateFinalposts.unshift(posts)
      setposts(updateFinalposts)
    }
    const handleLoadNext = (event) => {
      event.preventDefault()
      if (nextUrl !== null) {
        const handleLoadNextResponse = (response, status) =>{
          if (status === 200){
            setNextUrl(response.next)
            const newposts = [...posts].concat(response.results)
            setpostsInit(newposts)
            setposts(newposts)
          }
        }
        apioasisFeed(handleLoadNextResponse, nextUrl)
      }
    }

    return <React.Fragment>{posts.map((item, index)=>{
      return <oasis  
        oasis={item} 
        didReoasis={handleDidReoasis}
        className='my-5 py-5 border bg-white text-dark' 
        key={`${index}-{item.id}`} />
    })}
    {nextUrl !== null && <button onClick={handleLoadNext} className='btn btn-outline-primary'>Load next</button>}
    </React.Fragment>
  }


