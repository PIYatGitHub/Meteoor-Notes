import expect from "expect";
import {Notes} from "./notes";
import {Meteor} from "meteor/meteor";

if(Meteor.isServer) {
    describe("notes", function () {
            const noteOne = {
                _id:"testNoteId1",
                title: "Default Title",
                body: "My body for the note",
                updatedAt: "0",
                userId: "testUserId1"
            };

        const noteTwo = {
            _id:"testNoteId2",
            title: "Favorite Guitars",
            body: "PRS Custom 22",
            updatedAt: "0",
            userId: "testUserId2"
        };
            beforeEach(function () {
               Notes.remove({});
               Notes.insert(noteOne);
               Notes.insert(noteTwo);
            });

        describe("insert", function () {
            it('should insert a new note', function () {
                const userId = 'testId';
                const _id = Meteor.server.method_handlers['notes.insert'].apply({userId});
                expect(Notes.findOne({_id, userId})).toBeTruthy();
            });

            it('should not insert a new note if not authenticated', function () {
                expect(() => {
                    Meteor.server.method_handlers['notes.insert']();
                }).toThrow();
            });

        });

        describe("remove", function () {
            it('should remove a note', function () {
                Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId}, [noteOne._id]);
                expect(Notes.findOne({_id:noteOne._id})).toBeFalsy();
            });

            it('should not remove a note if not authenticated', function () {
                expect(() => {
                    Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
                }).toThrow();

            });

            it('should fail if _id is not valid', function () {
                expect(() => {
                    Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId}, []);
                }).toThrow();

            });

        });

       describe("update", function () {
           it('should update a note', function () {
               const title = "Updated Note title";
               Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId},
                   [noteOne._id,
                       {title}
                   ]);

               const note = Notes.findOne(noteOne._id);

               expect(note.updatedAt).toBeGreaterThan(0);
               //because the dumb code DOES NOT work as expected...
               expect(note.title).toEqual(title);
               expect(note.body).toEqual(noteOne.body);
           });


           it('should throw errors if there are illegal object properties', function () {
               const title = "Updated Note title";
               const hack  = "Hacked you!!!";

               expect(() => {
                   Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId},
                       [noteOne._id,
                           {title, hack}
                       ]);
               }).toThrow();
           });


           it('should not update the note if the user is not the creator', function () {
               const title = "Updated Note title";
               Meteor.server.method_handlers['notes.update'].apply({userId: "e1qeq13eqaq"},
                   [noteOne._id,
                       {title}
                   ]);
               const note = Notes.findOne(noteOne._id);
               expect(note).toEqual(noteOne);

           });

           it('should not update a note if not authenticated', function () {
               expect(() => {
                   Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
               }).toThrow();

           });

           it('should fail if _id is not valid', function () {
               expect(() => {
                   Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId}, []);
               }).toThrow();

           });
        });

       describe("publications", function () {
           it('should return the users notes', function () {
             const result = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
             const notes = result.fetch();
             expect(notes.length).toEqual(1);
             expect(notes[0]).toEqual (noteOne);
           });

           it('should return 0 notes if the user does not have any', function () {
               const result = Meteor.server.publish_handlers.notes.apply({userId: "e1qeq13eqaq"});
               const notes = result.fetch();
               expect(notes.length).toEqual(0);
           });


       });

    });
}