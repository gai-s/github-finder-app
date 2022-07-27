const GITHUB_API_URL = process.env.REACT_APP_GITHUB_URL

export const searchUsers = async (text) => {
    const params = `q=${text}`
    const response = await fetch(`${GITHUB_API_URL}/search/users?${params}`, {
        headers: {
        },
    })
    const {items} = await response.json()
    console.log(items)
    return items
}

    //Get single user and get his repos
    export const getUserAndRepos = async (login) => {
        const response = await fetch(`${GITHUB_API_URL}/users/${login}`)        
        if(response === 404){
            window.location = '/notfound'
        } else{
            const data = await response.json()
            console.log(data)
            const params = new URLSearchParams({
                sort: 'created',
                per_page: 10,
            })
            const res = await fetch(`${GITHUB_API_URL}/users/${login}/repos?${params}`)
            const repos_data = await res.json()
            return{
                    user: data,
                    repos: repos_data
                }
        }
    
    }