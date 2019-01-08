import {Meteor} from "meteor/meteor";
import React from "react";
import expect from "expect";
import {mount} from "enzyme";
import {Editor} from "./Editor";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {notes} from "../fixtures/fixtures";

Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient) {

    describe('editor', function () {
     let    browserHistory = undefined,
            call = undefined;
        beforeEach(function () {
            call = expect.createSpy();
            browserHistory = {
                push:expect.createSpy()
            }
        });

        it("should render pick a note msg",function () {
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>);
            expect (wrapper.find('p').text().trim()).toBe('Pick or create a note to get started');
        });

        it("should render not found note msg",function () {
            const wrapper = mount(<Editor selectedNoteId={notes[0]._id} call={call} browserHistory={browserHistory}/>);
            expect (wrapper.find('p').text().trim()).toBe('Note not found');
        });

        it("should remove note",function () {
            const wrapper = mount(<Editor note={notes[0]} selectedNoteId={notes[0]._id} call={call} browserHistory={browserHistory}/>);
            wrapper.find('button').simulate('click');
            expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
            expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
        });

        it("should update the note body on txtarea change",function () {
            const   wrapper = mount(<Editor note={notes[0]} selectedNoteId={notes[0]._id} call={call} browserHistory={browserHistory}/>),
                    newBody = 'This is the new body';
            wrapper.find('textarea').simulate('change', {
                target: {
                    value: newBody
                }
            });
            expect(wrapper.state('body')).toBe(newBody);
            expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {body: newBody});
        });

        it("should update the title on input change",function () {
            const   wrapper = mount(<Editor note={notes[0]} selectedNoteId={notes[0]._id} call={call} browserHistory={browserHistory}/>),
                    newTitle = 'This is the title';
            wrapper.find('input').simulate('change', {
                target: {
                    value: newTitle
                }
            });
            expect(wrapper.state('title')).toBe(newTitle);
            expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {title: newTitle});
        });

        it("should set the state for a new note",function () {
            const   wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>);
            wrapper.setProps({
                selectedNoteId: notes[0]._id,
                note: notes[0]
            });
            expect(wrapper.state('title')).toBe(notes[0].title);
            expect(wrapper.state('body')).toBe(notes[0].body);
        });

        it("should not set the state if note prop is not provided",function () {
            const   wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>);
            wrapper.setProps({
                selectedNoteId: notes[0]._id
            });
            expect(wrapper.state('title')).toBe('');
            expect(wrapper.state('body')).toBe('');
        });


    })
    //end if
}