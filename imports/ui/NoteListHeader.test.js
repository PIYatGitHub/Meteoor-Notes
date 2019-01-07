import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {NoteListHeader} from './NoteListHeader';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient) {

    describe('note list header', function () {

        it('should call method notes.insert',function () {
            const   spy = expect.createSpy(),
                    wrapper = mount(<NoteListHeader meteorCall={spy}/>);

            wrapper.find('button').simulate('click');
            expect(spy).toHaveBeenCalledWith('notes.insert');
        });

    });

}