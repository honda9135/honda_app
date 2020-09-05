import React, { Component } from 'react';
import firebase from '../config/fbConfig';

export default class Test extends Component {
    render(){
        var db = firebase.firestore();
        var ret = ''
        db.collection('books').get().then(snap => {
            console.log(snap.size,'snapshot')
            console.log(snap,'tsnapshot')
            snap.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                ret = doc.id
              });
            return <h1>{ret}</h1>
        })
        return <h1>test</h1>
    }
}