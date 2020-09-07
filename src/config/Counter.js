import React,{Component} from 'react';

export default class Counter extends Component {
    constructor(props) {
      super(props)
      this.state ={
        count:props.count
      }
    }
  
    increment() {
      this.setState({
        count:this.state.count + 1
      })
    }
  
    decrement() {
      this.setState({
        count:this.state.count - 1
      })
    }

    render(){
      return (<p>test99</p>)
    }
}