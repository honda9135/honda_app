//followerの登録
//followerの検索
export const registFollow = (reg) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('users').doc(reg.auth.uid).set({
            ...reg.profile,
            follow:[...reg.profile.follow,reg.uid]
        }).then(() => {
            dispatch({type:'REGIST_FOLLOW'})
        }).catch((err) => {
            dispatch({ type: 'REGIST_ERROR', err })
        })
    }
};