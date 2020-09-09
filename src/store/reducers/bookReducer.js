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
        case 'EDIT_BOOK':
                console.log('edit book')
                return {
                    ...state,
            }
        case 'EDIT_BOOK_ERROR':
            console.log('edit book error', action.err);
            return {
                ...state,
            }
        case 'DELL_BOOK':
                console.log('dele book')
                return {
                    ...state,
            }
        case 'DELL_BOOK_ERROR':
            console.log('dele book error', action.err);
            return {
                ...state,
            }
        default: 
            return {
                ...state,
            }
    }
}

export default bookReducer