//followerの登録
//followerの検索
const initState = {
    //諸事上より初期値を全角スペースとする
    new_uid:' ',
}
const followReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SEARCH_FOLLOW':
            console.log('new follow', action.uid);
            return {
            ...state,
            new_uid:action.uid
            }
        case 'CLEAR_FOLLOW':
            console.log('clear follow', action);
            return {
            ...state,
            new_uid:' '
            }
        case 'REGIST_FOLLOW':
            return{
                ...state,
                new_uid:' '
            }
        case 'REGIST_ERROR':
            return {
                 ...state,
            }
        case 'DELE_FOLLOW':
            alert('followerの削除をしました')
            return{
                ...state,
            }
        case 'DELE_FOLLOW_ERROR':
            alert('followerの削除を失敗しました')
            return {
                ...state,
            }        
        default: 
           return {
            ...state,
            }
    }
}
export default followReducer