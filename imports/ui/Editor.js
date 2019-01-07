import React from "react";
import {withTracker} from "meteor/react-meteor-data";
import {Session} from "meteor/session";
import {Meteor} from 'meteor/meteor';
import {Notes} from "../api/notes";
import PropTypes from 'prop-types';


export class Editor extends React.Component{
    handleBodyChange (e) {
        e.preventDefault();
        this.props.call('notes.update', this.props.note._id,
            {
                body:e.target.value
            })
    }
    handleTitleChange (e) {
        e.preventDefault();
        this.props.call('notes.update', this.props.note._id,
            {
                title:e.target.value
            })
    }

    render() {
        if(this.props.note){
            return(
                <div>
                    <input value={this.props.note.title}  placeholder='Untitled note'
                           onChange={this.handleTitleChange.bind(this)}/>
                    <textarea value={this.props.note.body} placeholder='Your note here'
                    onChange={this.handleBodyChange.bind(this)}> </textarea>
                    <button> Delete Note </button>
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
    selectedNoteId:PropTypes.string
};

export default withTracker( () => {
    const selectedNoteId = Session.get('selectedNoteId');
    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call
    };
}) (Editor);