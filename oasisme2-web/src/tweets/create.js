import React from 'react'
import {apioasisCreate} from './lookup'


export function oasisCreate(props){
  const textAreaRef = React.createRef()
  const {didoasis} = props
    const handleBackendUpdate = (response, status) =>{
      if (status === 201){
        didoasis(response)
      } else {
        console.log(response)
        alert("An error occured please try again")
      }
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      const newVal = textAreaRef.current.value
      // backend api request
      apioasisCreate(newVal, handleBackendUpdate)
      textAreaRef.current.value = ''
    }
    return <div className={props.className}>
          <form onSubmit={handleSubmit}>
            <textarea ref={textAreaRef} required={true} className='form-control' name='oasis'>

            </textarea>
            <button type='submit' className='btn btn-primary my-3'>oasis</button>
        </form>
  </div>
}