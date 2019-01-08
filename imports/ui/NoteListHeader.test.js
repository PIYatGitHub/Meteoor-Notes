import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {NoteListHeader} from './NoteListHeader';
import {notes} from "../fixtures/fixtures";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient) {

    describe('note list header', function () {
        let meteorCall = undefined,
            Session = undefined;
        beforeEach(function () {
            meteorCall= expect.createSpy();
            Session = {
                set: expect.createSpy()
            }
        });
        it('should call method notes.insert',function () {
            const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);
            wrapper.find('button').simulate('click');
            meteorCall.calls[0].arguments[1](undefined,notes[0]._id);
            expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
        });

        it('should not set Session for failed insert',function () {
            const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);
            wrapper.find('button').simulate('click');
            meteorCall.calls[0].arguments[1]('something failed',undefined);
            expect(Session.set).toNotHaveBeenCalled();
        });


    });

}