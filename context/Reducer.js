const Reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            // console.log(action);
            return {...state, name:action.name, room: action.room}
        case 'CHANGE_ROOM':
            state.room=action.updated_room
            return state
        case 'ADD_PAGE_LOADING':
            state.pageLoading=true
            return state
        case 'REMOVE_PAGE_LOADING':
            state.pageLoading=false
            console.log(state);
            return state
        default:
            return state
    }
}

export default Reducer