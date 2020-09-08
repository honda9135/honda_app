export const createBook = (book) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('books').add({
            ...book,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_BOOK', book})
        }).catch((err) => {
            dispatch({ type: 'CREATE_BOOK_ERROR', err })
        })
    }
};

export const searchBook = (tags) => {
    return (dispatch, getState) => {
        if (tags){
            dispatch({type:'SEARCH_BOOK',tags})
        }else{
            dispatch({type:'INIT_TAGS',tags})
        }
    }
};