//followerの登録
export const registFollow = (reg) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('users').doc(reg.auth.uid).set({
            ...reg.profile,
            follow: [...reg.profile.follow, reg.uid]
        }).then(() => {
            dispatch({ type: 'REGIST_FOLLOW' })
        }).catch((err) => {
            dispatch({ type: 'REGIST_ERROR', err })
        })
    }
};

//followerの削除
export const deleFollow = (auth, profile, delUid) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const follow = profile.follow.filter(elm => {
            return elm !== delUid
        })
        firestore.collection('users').doc(auth.uid).set({
            ...profile,
            follow: follow
        }).then(() => {
            dispatch({ type: 'DELE_FOLLOW' })
        }).catch((err) => {
            dispatch({ type: 'DELE_FOLLOW_ERROR', err })
        })
    }
};