import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {notes} from "../fixtures/fixtures";
import {NoteListItem} from './NoteListItem';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient) {

    describe('note list item', function () {
        let Session;

        beforeEach(() => {
            Session = {
                set: expect.createSpy()
            };
        });
        it('should show title and timestamp',function () {
            const   wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>),
                    targetP =wrapper.find('p').getElements()[1];

            expect (wrapper.find('h5').text().trim()).toBe (notes[0].title);
            expect (targetP.props.children).toBe ('07/01/2019');
            // because date is formatted as DD/MM/YYYY!!!
        });

        it('should show default title if none is provided',function () {
            const   wrapper = mount(<NoteListItem note={notes[1]} Session={Session}/>);
            expect (wrapper.find('h5').text().trim()).toBe ('Untitled note');
        });

        it('should call set onClick',function () {
            const   wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>);
            wrapper.find('div').simulate('click');
            expect (Session.set).toHaveBeenCalledWith ('selectedNoteId',notes[0]._id);
        });

    });

}