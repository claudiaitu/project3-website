import React from 'react'
import { LoadingContext } from '../context/loading.context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { get } from '../services/authService'



const Profile = () => {
  const {user, setUser} = useContext(LoadingContext)
  const deleteRegistry = (registryId) => {
    get(`/registry/delete-registry/${registryId}/${user._id}`).then((results) => {
      console.log(results.data);
      setUser(results.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
    <div>Profile</div>
    <div>
      {user ? user.registries.map((registry) => {
        return (
          <>
            <h2>Title: {registry.title}</h2>
            <p>Price: {registry.price}</p>
            <p>Description: {registry.description}</p>
            <Link to={`/edit-registry/${registry._id}`}>Edit</Link>
            <button onClick={() => deleteRegistry(registry._id)}>Delete</button>

          </>
        )
      }):
      <p>No registries found</p>
      }
    </div>
    </>
  )
}

export default Profile