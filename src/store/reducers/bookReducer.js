const initState = {}
const bookReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_BOOK':
            console.log('created book', action.book);
            return state;
        case 'CREATE_BOOK_ERROR':
            console.log('create book error', action.err);
            return state;        
        default: 
            return state;
    }
}

export default bookReducer