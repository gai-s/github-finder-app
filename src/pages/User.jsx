import React from 'react'
import {useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import GithubContext from '../context/github/GithubContext'
import {FaCodepen, FaStore, FaUsers, FaUserFriends} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import ReposList from '../components/repos/ReposList'
import Spinner from '../components/layout/Spinner'
import {getUserAndRepos} from '../context/github/GithubRequests'

function User() {
    const {user, isLoading, repos, dispatch} = useContext(GithubContext)
    const params = useParams()
    useEffect(()=>{
        const userFetch = async () => {
            dispatch({type: 'SET_LOADING'})
            const data = await getUserAndRepos(params.login)
            dispatch({type: 'GET_USER_AND_REPOS', payload:{user: data.user, repos: data.repos}})
        }
        userFetch()
    }, [params.login, dispatch])

    const {
        name,
        type,
        avatar_url,
        location,
        bio,
        blog,
        twitter_username,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
      } = user

    if(isLoading){
        return <Spinner />
    }else{
        return <>
        <div className="w-full mx-auto lg:w-10/12">
            
            <div className="mb-4">
                <Link to='/' className='btn btn-ghost'>
                    Back to search
                </Link>
            </div>
            
            <div className="grid grid-cols-1 x:grid-cols-3 lg:grid-cols-3 md:grid-colss-3 mb-3 md:gap-8">
                {/*avatar*/}
                <div className="custom-card-image mb-6 md:mb-0">
                    <div className="rounded-lg shadow-xl card image-full">
                        <figure>
                            <img src={avatar_url} alt='profile_img'/>
                        </figure>
                        <div className="card-body justify-end">
                            <h2 className="card-title mb-0">
                                {name}
                            </h2>
                            <p className='flex-grow-0'>{login}</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="mb-6">
                        {/*name and two badges of user type and if hireable*/}
                        <h1 className="text-3xl card-title">
                            {name}  
                            <div className="ml-2 mr-1 badge badge-success">
                            {type}
                            </div>
                            {hireable && (
                                <div className="mx-1 badge badge-info">Hireable</div>
                            )}
                        </h1> 

                        <p>{bio}</p>
                        <div className="mt-4 card-actions">
                            <a href={html_url} target='_blank' rel="noreferrer" className="btn btn-outline">
                                Visit Github Profile
                            </a>
                        </div>
                    </div>
                    <div className="rounded-lg w-full shadow-md bg-base-100 stats">
                        {location && (
                            <div className="stat">
                                <div className="stat-title text-md">Location</div>
                                <div className="text-lg stat-value">{location}</div>
                            </div>
                        )}
                        {blog && (
                            <div className="stat">
                                <div className="stat-title text-md">Website</div>
                                <div className="text-lg stat-value">
                                    <a href={`https://${blog}`} target="_blank" rel="noreferrer">{blog}</a>    
                                </div>
                            </div>
                        )}
                        {twitter_username && (
                            <div className="stat">
                                <div className="stat-title text-md">Twitter</div>
                                <div className="text-lg stat-value">
                                    <a href={`https://twitter.com/${twitter_username}`} target='_blank' rel='noreferrer'>
                                        {twitter_username}
                                    </a>
                                </div>
                            </div>
                        )}                       
                    </div>
                </div>  
            </div>

            <div className="w-full py-5 mb-6 rounded-lg shadow-mb bg-base-100 stats">
                <div className='grid grid-cols-1 md:grid-cols-4'>    
                    <div className="stat">
                        <div className="stats-figure text-secondary">
                            <FaUsers className="text-3xl md:text-5xl"  />
                        </div>
                        <div className="stat-title pr-5">
                            Followers
                        </div>
                        <div className="stat-value pr-5 text-3xl md:text-4xl">
                            {followers}
                        </div>
                    </div>
                    
                    <div className="stat">
                        <div className="stats-figure text-secondary">
                            <FaUserFriends className="text-3xl md:text-5xl"  />
                        </div>
                        <div className="stat-title pr-5">
                            Following
                        </div>
                        <div className="stat-value pr-5 text-3xl md:text-4xl">
                            {following}
                        </div>
                    </div>

                    <div className="stat">
                        <div className="stats-figure text-secondary">
                            <FaCodepen className="text-3xl md:text-5xl"  />
                        </div>
                        <div className="stat-title pr-5">
                            Public Repos
                        </div>
                        <div className="stat-value pr-5 text-3xl md:text-4xl">
                            {public_repos}
                        </div>
                    </div>

                    <div className="stat">
                        <div className="stats-figure text-secondary">
                            <FaStore className="text-3xl md:text-5xl"  />
                        </div>
                        <div className="stat-title pr-5">
                            Public Gists
                        </div>
                        <div className="stat-value pr-5 text-3xl md:text-4xl">
                            {public_gists}
                        </div>
                    </div>
                </div>
            </div>
            <ReposList repos={repos}/>
            
        </div>
        </>
    }
}

export default User
