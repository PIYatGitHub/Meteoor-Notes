import React from "react";
import {withTracker} from "meteor/react-meteor-data";
import {Session} from "meteor/session";
import {Meteor} from 'meteor/meteor';
import {Notes} from "../api/notes";
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';

export class Editor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
    }

    handleBodyChange (e) {
        e.preventDefault();
        const body = e.target.value;
        this.setState({body});
        this.props.call('notes.update', this.props.note._id, {body })
    }
    handleTitleChange (e) {
        e.preventDefault();
        const title = e.target.value;
        this.setState({title});
        this.props.call('notes.update', this.props.note._id, {title});
    }
    handleNoteRemoval (e) {
        this.props.call('notes.remove', this.props.note._id);
        this.props.browserHistory.push('/dashboard');
    }
    componentDidUpdate(prevProps, prevState) {
        const   currentNoteId = this.props.note ? this.props.note._id : undefined,
                prevNoteId = prevProps.note ? prevProps.note._id : undefined;
        if (currentNoteId && currentNoteId !== prevNoteId) {
            this.setState({
                title: this.props.note.title,
                body: this.props.note.body,
            })
        }
    }
    render() {
        if(this.props.note){
            return(
                <div>
                    <input value={this.state.title}  placeholder='Untitled note'
                           onChange={this.handleTitleChange.bind(this)}/>
                    <textarea value={this.state.body} placeholder='Your note here'
                    onChange={this.handleBodyChange.bind(this)}> </textarea>
                    <button onClick={this.handleNoteRemoval.bind(this)}> Delete Note </button>
                </div>
            );
        } else {
            return(
                <div>
                   <p>{this.props.selectedNoteId? 'Note not found': 'Pick or create a note to get started'}</p>
                </div>
            );
        }


    }
}

Editor.propTypes = {
    note:PropTypes.object,
    selectedNoteId:PropTypes.string,
    call: PropTypes.func.isRequired,
    browserHistory: PropTypes.object.isRequired
};

export default withTracker( () => {
    const selectedNoteId = Session.get('selectedNoteId');
    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call,
        browserHistory
    };
}) (Editor);