import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import FollowCatalog from './FollowCatalog'
import Loading from '../../config/Loading'

class FollowPage extends Component {
    render() {
        if (this.props.users && this.props.users.length !== 0) {

            return (<FollowCatalog follower={this.props.users[0]} history={this.props.history} />)
        }
        else {
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
    firestoreConnect((props) => {

        var firebaseQueries = [{
            collection: 'users',
            doc: props.match.params.uid,
        }]
        return firebaseQueries
    })
)(FollowPage);