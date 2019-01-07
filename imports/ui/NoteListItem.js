import React from 'react';
import {Session} from 'meteor/session';
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import moment from 'moment';

export const NoteListItem = (props) => {
    return(
        <div onClick={() => props.Session.set('selectedNoteId', props.note._id)}>
            <h5>
                {props.note.title || 'Untitled note'}
            </h5>
            <p>
                {moment(props.note.updatedAt).format('DD/MM/YYYY')}
            </p>

        </div>
    );
};
NoteListItem.propTypes =  {
    note: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired,
};

export default withTracker( () => {
    return {
        Session
    };
}) (NoteListItem);
