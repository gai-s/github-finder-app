const AlertReducer = (state, action) => {
    switch(action.type){
        case 'SET_MESSAGE':
            return {
                message: action.payload.text,
                type: action.payload.type
            }
        case 'CLEAR_MESSAGE':
            return null
        default:
            return state
    }
}

export default AlertReducer