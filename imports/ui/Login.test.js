import {Meteor} from "meteor/meteor";
import React from "react";
import expect from "expect";
import {mount} from "enzyme";
import {Login} from "./Login";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient) {
    describe('login', function () {


        it("should show err msg",function () {
            const error = "This is not working...";
            const wrapper = mount (<Login loginWithPassword={() => {} }/>);
            wrapper.setState({
                error
            });
            expect(wrapper.find('p').text().trim()).toEqual(error);

            wrapper.setState({
                error: ""
            });

            expect(wrapper.find('p').length).toEqual(0);

        });


        it("should call login with password with the form data",function () {
            const   email = "test@test.com",
                    password = "password123",
                    spy = expect.createSpy(),
                    wrapper = mount(<Login loginWithPassword={spy}/>);

            wrapper.ref('email').value = email;
            wrapper.ref('password').value = password;
            wrapper.find('form').simulate('submit');

             expect(spy.calls[0].arguments[0]).toEqual({email});
             expect(spy.calls[0].arguments[1]).toEqual(password);

        });

        it("should set loginWithPassword callback errors",function () {
            const   spy = expect.createSpy(),
                    wrapper = mount(<Login loginWithPassword={spy}/>);

            wrapper.find('form').simulate('submit');

            spy.calls[0].arguments[2]({});
            expect(wrapper.state('error')).toNotEqual("");

            spy.calls[0].arguments[2]();
            expect(wrapper.state('error')).toEqual("");

        });
    })
}

