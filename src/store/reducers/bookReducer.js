const initState = {
                    tags:[],
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
        case 'INIT_TAGS':
                console.log(action.tags,'search')
                return {
                    ...state,
                    tags:[]
                }
        case 'SEARCH_BOOK':
            console.log(action.tags,'search')
            return {
                ...state,
                tags:action.tags
            }
        default: 
            return {
                ...state,
            }
    }
}

export default bookReducer