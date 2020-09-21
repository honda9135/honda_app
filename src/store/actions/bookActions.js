//本を登録する。
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

//本をタグで検索
export const searchBook = (tags) => {
    return (dispatch, getState) => {
        if (tags){
            dispatch({type:'SEARCH_BOOK',tags})
        }else{
            dispatch({type:'INIT_TAGS',tags})
        }
    }
};

//本の編集
export const editBook = (book) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const id = book.id;
        delete book.id
        firestore.collection('books').doc(id).set({
            ...book,
        }).then(() => {
            alert('本の編集をしました')
            dispatch({ type: 'EDIT_BOOK', book})
        }).catch((err) => {
            alert('本の編集に失敗しました。')
            dispatch({ type: 'EDIT_BOOK_ERROR', err })
        })
    }
};

//本の削除
export const deleBook = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('books').doc(id).delete().then(() => {
            alert('本を削除しました。');
            dispatch({ type: 'DELL_BOOK'})
        }).catch((err) => {
            alert('本の削除に失敗しました。')
            dispatch({ type: 'DELL_BOOK_ERROR', err })
        })
    }
};