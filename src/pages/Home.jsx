import React from 'react'
import UserResults from '../components/users/UserResults'
import UserSearch from '../components/users/UserSearch'
import AlertMessage from '../components/users/AlertMessage'

function Home() {
  return (
    <>
        <AlertMessage/>
        {/* SEARCH COMPONENT*/}
        <UserSearch/>
        <UserResults/>
    </>
  )
}

export default Home