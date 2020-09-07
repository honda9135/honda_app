import React, { Component } from 'react'
//import firebase from '../config/fbConfig'
// import { connect } from 'react-redux'
// import { firestoreConnect } from 'react-redux-firebase'
// import { compose } from 'redux'
import FollowBookCatalog from '../components/books/FollowBookCatalog'

export default class Test extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            page:1 //Paginationの現在のページ番号
        }
    }

    render(){
        console.log(this.props,'testtesttest')
        //var db = firebase.firestore()
        const follower = {
            uid:'FcQJVn5JRMXik0CSxnTwzN4TUZB3',
            firstName:'honda',
            lastName:'daigo',
            initials:'hd'
        }
        return (
           <FollowBookCatalog follower={follower} />
        )
    }
}


// const mapStateToProps = (state) => {
//     return {
//         users: state.firestore.ordered.users,
//         books:state.firestore.ordered.books,
//         tags: state.book.tags,
//         auth: state.firebase.auth
//     }
// }

// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect( (props)  =>{
//         console.log(props.auth.uid,'props')
//         var firebaseQueries = [];

//         firebaseQueries.push(
//             {
//                 collection: 'users',
//                 doc:props.auth.uid,
//             }
//         )

//         if (props.users){
//             firebaseQueries.push(
//                 {
//                     collection:'books',
//                     orderBy:['createdAt','desc'],
//                     where:['user','in',[...props.users[0].follow,props.auth.uid]],
//                     limit:3
//                 }
//             )
//         }

//         console.log(firebaseQueries,'Query')
    
//         return firebaseQueries
//     })
// )(Test);