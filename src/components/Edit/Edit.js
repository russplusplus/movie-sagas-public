import React, { Component } from 'react';
import { connect } from 'react-redux';

class Edit extends Component {

    state = {
        title: '',
        description: '',
        id: this.props.reduxState.selectedMovie.id
    }

    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    cancel = () => {
        console.log('cancel')
        this.props.history.push('/Details')
    }

    save = () => {
        console.log('save')
        this.props.dispatch({
            type: 'UPDATE_MOVIE',
            payload: this.state
        })
        this.props.history.push('/Details')
    }
  // Renders the entire app on the DOM
    render() {        
        return (
        <div>
            <button onClick={this.cancel}>Cancel</button>
            <button onClick={this.save}>Save</button><br></br>
            <h2>Title</h2><br></br>
            <input onChange={this.handleTitleChange}></input><br></br>
            <h2>Description</h2><br></br>
            <textarea onChange={this.handleDescriptionChange}></textarea>
        </div>
        );
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
})

export default connect(mapStateToProps)(Edit);