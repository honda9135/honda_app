const initState = {
                    tags:[],
                    sum:-1
                }
const bookReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_BOOK':
            console.log('created book', action.book);
            return {
                ...state,
            }
        case 'CREATE_BOOK_ERROR':
            console.log('create book error', action.err);
            return {
                ...state,
            }
        case 'SEARCH_BOOK':
            console.log(action.tags,'search')
            return {
                ...state,
                tags:action.tags
            }
        case 'INIT_SUM':
            console.log(action.tags,)
            return {
                ...state
            }
        default: 
            return {
                ...state,
            }
    }
}

export default bookReducer