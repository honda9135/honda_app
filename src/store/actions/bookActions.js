export const createBook = (book) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        //const profile = getState().firebase.profile;
        //const authorId = getState().firebase.auth.uid;
        firestore.collection('books').add({
            ...book,
           // authorFirstName: profile.firstName,
           // authorLastName: profile.lastName,
           // authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_BOOK', book})
        }).catch((err) => {
            dispatch({ type: 'CREATE_BOOK_ERROR', err })
        })
    }
};