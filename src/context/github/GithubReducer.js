const GithubReducer = (state, action) => {
    switch(action.type){
        case 'GET_USERS':
            return{
                ...state,
                users: action.payload.users,
                isLoading: false
            }
        case  'GET_USER_AND_REPOS':
            return{
                ...state,
                user: action.payload.user,
                repos: action.payload.repos,
                isLoading: false
            }
        case 'SET_LOADING':
            return{
                ...state,
                isLoading: true
            }
        case 'RESET_USERS':
            return{
                ...state,
                users: [],
                user: {},
                isLoading: false
            }
        default: return state
    }
}

export default GithubReducer