import {Meteor} from "meteor/meteor";
import React from "react";
import expect from "expect";
import {mount} from "enzyme";
import {PrivateHeader} from "./PrivateHeader";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient) {

    describe("private header",function () {

        it("should set btn txt to logout",function () {
            const wrapper =  mount(<PrivateHeader title="test title" handleLogout={() => {}}/>);
            const btnTxt = wrapper.find('button').text().trim();
            expect(btnTxt).toEqual ('Logout');
        });

        it("should use the title prop",function () {
            const title = "Abra Cadabra";
            const wrapper =  mount(<PrivateHeader title={title} handleLogout={() => {}}/>);
            const headerTxt = wrapper.find('h1').text().trim();
            expect(headerTxt).toEqual (title);
        });

        it("should call the function handleLogout onclick",function () {
            const spy = expect.createSpy();
            const wrapper =  mount(<PrivateHeader title="Abra Cadabra" handleLogout={spy}/>);
            wrapper.find('button').simulate('click');
            expect(spy).toHaveBeenCalled();
        });

    });
//next vid: 127
//end of if Meteor.isClient
}
