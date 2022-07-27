import axios from 'axios'
const GITHUB_API_URL = process.env.REACT_APP_GITHUB_URL
const github = axios.create({
    baseURL: GITHUB_API_URL
})

export const searchUsers = async (text) => {
    const params = `q=${text}`
    const response = await github.get(`/search/users?${params}`)
    console.log(response.data.items)
    return response.data.items
}

    //Get single user and get his repos
    export const getUserAndRepos = async (login) => {
        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10,
        })
        const [user, repos] = await Promise.all([
            github.get(`/users/${login}`),
            github.get(`/users/${login}/repos?${params}`)
        ])
        if(user === 404){
            window.location = '/notfound'
        } else{
            return{
                    user: user.data,
                    repos: repos.data
                }
        }  
    }