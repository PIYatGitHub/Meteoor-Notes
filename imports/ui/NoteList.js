import React from "react";
import {withTracker} from "meteor/react-meteor-data";
import PropTypes from 'prop-types';
import {Meteor} from "meteor/meteor";
import {Session} from "meteor/session";
import {Notes} from "../api/notes";
import NoteListHeader from "./NoteListHeader";
import NoteListItem from "./NoteListItem";
import NoteListEmptyItem from './NoteListEmptyItem';


export class NoteList extends React.Component  {
    constructor(props) {
        super(props);
    }
    renderNotes() {
        if(this.props.notes.length ===0) {
            return (
              <NoteListEmptyItem/>
            );

        }

        return this.props.notes.map ((note)=>{
            return <NoteListItem key = {note._id} note={note}/>
        });
    }

    render () {
        return (
            <div>
                <NoteListHeader/>
                {this.renderNotes()}

                Note List {this.props.notes.length}
            </div>
        );
    }
}

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
};

export default withTracker( () => {
    Meteor.subscribe('notes');
    const selectedNoteId = Session.get('selectedNoteId');
    return {
        notes: Notes.find({}, {sort: {updatedAt:-1}}).fetch().map((note)=> {
            return {
                ...note,
                selected: note._id === selectedNoteId
            }

        }

        )
    };
}) (NoteList);