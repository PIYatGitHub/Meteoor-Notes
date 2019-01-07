import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {NoteList} from './NoteList';
import {notes} from "../fixtures/fixtures";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient) {

    describe('note list',function () {

        it('should render note list item for each note',function () {
            const wrapper = mount(<NoteList notes={notes}/>);
            expect(wrapper.find('NoteListItem').length).toBe(2);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
        });

        it('should render note list empty item if there are no notes',function () {
            const wrapper = mount(<NoteList notes={[]}/>);
            expect(wrapper.find('NoteListItem').length).toBe(0);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
        });

    });

//end of if Meteor.isClient
}