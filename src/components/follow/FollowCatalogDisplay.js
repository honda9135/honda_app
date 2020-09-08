import React, { Component } from 'react'
//import firebase from '../config/fbConfig'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import FollowBookCatalog from '../books/FollowBookCatalog'

class FollowCatalogDisplay extends Component {
    render(){
        console.log(this.props.users,'testtesttest')
        console.log('ああああああああああああああああああああああ')
        //var db = firebase.firestore()
         if(this.props.users&&this.props.users.length!==0){
             console.log(this.props.users[0])
             return (<FollowBookCatalog follower={this.props.users[0]} />)
         }
         else{
             return (<h1>ロードナウ</h1>)
         }
    }
}

const mapStateToProps = (state) => {
     return {
         users: state.firestore.ordered.users,
         auth: state.firebase.auth
     }
 }

 export default compose(
     connect(mapStateToProps),
     firestoreConnect( (props)  =>{
         console.log(props.match.params.uid,'props')
         var firebaseQueries = [{
                 collection: 'users',
                 doc:props.match.params.uid,
             }]
         return firebaseQueries
     })
)(FollowCatalogDisplay);


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