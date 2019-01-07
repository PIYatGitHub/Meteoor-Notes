import {Meteor} from "meteor/meteor";
import React from "react";
import expect from "expect";
import {mount} from "enzyme";
import {Signup} from "./Signup";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient) {
    describe('signup', function () {


        it("should show err msg",function () {
            const error = "This is not working...";
            const wrapper = mount (<Signup createUser={() => {} }/>);
            wrapper.setState({
                error
            });
            expect(wrapper.find('p').text().trim()).toEqual(error);

            wrapper.setState({
                error: ""
            });

            expect(wrapper.find('p').length).toEqual(0);

        });


        it("should call signup with password with the form data",function () {
            const   email = "test@test.com",
                password = "password123446578",
                spy = expect.createSpy(),
                wrapper = mount(<Signup createUser={spy}/>);

            wrapper.ref('email').value = email;
            wrapper.ref('password').value = password;
            wrapper.find('form').simulate('submit');

            expect(spy.calls[0].arguments[0]).toEqual({email, password});
        });

        it("should set err if password is short",function () {
            const   email = "test@test.com",
                password = "123                        ",
                spy = expect.createSpy(),
                wrapper = mount(<Signup createUser={spy}/>);

            wrapper.ref('email').value = email;
            wrapper.ref('password').value = password;
            wrapper.find('form').simulate('submit');

            expect(wrapper.state('error')).toNotEqual("");
        });


        it("should set createUser callback errors",function () {
            const   spy = expect.createSpy(),
                    reason = "this is why we failed...",
                    password = "password123446578",
                    wrapper = mount(<Signup createUser={spy}/>);

            wrapper.ref('password').value = password;
            wrapper.find('form').simulate('submit');

            spy.calls[0].arguments[1]({reason});
            expect(wrapper.state('error')).toEqual(reason);

            spy.calls[0].arguments[1]();
            expect(wrapper.state('error')).toEqual("");

        });
    })
}

