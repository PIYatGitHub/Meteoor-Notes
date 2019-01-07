import React from "react";
import {withTracker} from "meteor/react-meteor-data";
import PropTypes from 'prop-types';
import {Meteor} from "meteor/meteor";

export const NoteListHeader = (props)  => {
    return (
        <div>
           <button onClick={() => props.meteorCall('notes.insert') }> Create note</button>
        </div>
    );
};

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired
};

export default withTracker( () => {
    return {
        meteorCall: Meteor.call
    };
}) (NoteListHeader);

