import React from 'react';
import {Session} from 'meteor/session';
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import moment from 'moment';

export const NoteListItem = (props) => {
    const className = props.note.selected ? 'item item--selected' : 'item';
    return(
        <div className={className} onClick={() => props.Session.set('selectedNoteId', props.note._id)}>
            <h5 className='item__title'>
                {props.note.title || 'Untitled note'}
            </h5>
            <p className='item__subtitle'>
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
