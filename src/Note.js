import React from 'react';
import './App.css';
import Draggable from 'react-draggable';

var Note = React.createClass({
  getInitialState(){
    return{editing: false}
  },
  componentWillMount(){
    this.style = {
      position: 'absolute',
      top: this.randomBetween(0, window.innerHeight-150, 'px'),
      right: this.randomBetween(0, window.innerWidth-150, 'px')
    }
  },
  componentDidUpdate(){
    if(this.state.editing){
      this.refs.newText.focus()
      this.refs.newText.select()
    }
  },
  shouldComponentUpdate(nextProps, nextState){
    return this.props.children !== nextProps.children || this.state !== nextState
  },
  randomBetween(x,y,s){
     return (x + Math.ceil(Math.random() * (y-x))) + s
  },
  save(){
    this.props.onChange(this.refs.newText.value, this.props.id)
    this.setState({editing: false})
  },
  edit(){
    this.setState({editing: true})
  },
  remove(){
     this.props.onRemove(this.props.id)
  },
  renderForm(){
    return(
      <div className="note" style={this.style}>
        <textarea name="noteText" id="" cols="30" rows="10" ref="newText" defaultValue={this.props.children}></textarea>
        <button className="save" onClick={this.save}>save</button>
      </div>
    )
  },
  renderDisplay(){
    return (
      <div className="note" style={this.style}>
         <p>{this.props.children}</p>
         <span><button className="edit" onClick={this.edit}>edit</button><button className="delete" onClick={this.remove}>x</button></span>
      </div>
    )
  },
  render(){

     return (
       <Draggable>
       {(this.state.editing ? this.renderForm() : this.renderDisplay())}
       </Draggable>

     )
  }
})

export default Note;
