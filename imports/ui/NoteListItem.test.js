import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import NoteListItem from './NoteListItem';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient) {

    describe('note list item', function () {

        it('should show title and timestamp',function () {
            const   title = "Pick any value you like...",
                    updatedAt = 1546861222834,
                    wrapper = mount(<NoteListItem note={{title, updatedAt}}/>);
            expect (wrapper.find('h5').text().trim()).toBe (title);
            expect (wrapper.find('p').text().trim()).toBe ('07/01/2019');
            // because date is formatted as DD/MM/YYYY!!!
        });

        it('should show default title if none is provided',function () {
            const   title = '',
                updatedAt = 1546861222834,
                wrapper = mount(<NoteListItem note={{title, updatedAt}}/>);
            expect (wrapper.find('h5').text().trim()).toBe ('Untitled note');
        });


    });

}