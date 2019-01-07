import expect from "expect";
import {validateNewUser} from "./users";
import {Meteor} from "meteor/meteor";

if(Meteor.isServer) {
    describe("users", function () {
            it('should allow a valid email', function () {
                const testUser = {
                    emails: [
                        {
                            address: "test@exaple.com"
                        }
                    ]
                };
                const result = validateNewUser(testUser);
                expect(result).toBe(true);
            });

            it('should fail with an invalid email', function () {
                const testUser = {
                    emails: [
                        {
                            address: "123"
                        }
                    ]
                };
                expect(() => {
                    validateNewUser(testUser)
                }).toThrow();
            });
    });
}


