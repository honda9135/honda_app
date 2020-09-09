import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import FollowBookCatalog from '../books/FollowBookCatalog'
import Loading from '../../config/Loading'

class FollowCatalogDisplay extends Component {
    render(){
         if(this.props.users&&this.props.users.length!==0){
             console.log(this.props.users[0])
             return (<FollowBookCatalog follower={this.props.users[0]}　history={this.props.history} />)
         }
         else{             
             return (
                 <Loading />
             )
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