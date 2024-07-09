import { Mongo } from 'meteor/mongo';
import 'meteor/aldeed:collection2/static';
import SimpleSchema from 'meteor/aldeed:simple-schema';
//import SimpleSchema from 'simpl-schema';

console.log("DEFINING LinksCollection");

export const LinksCollection = new Mongo.Collection('links');

console.log("DEFINING LinksCollection Schema");

//  Setup simple schema for Answers collection
LinksCollection.attachSchema(new SimpleSchema({
    linkType: {
        type: String,
        allowedValues: ['article', 'profile', 'website', 'video'],
        defaultValue: 'article',
        optional: false
    },
    title: {
        type: String,
        defaultValue: 'Check out Meteor JS',
        optional: false
    },
    url: {
        type: String,
        defaultValue: 'https://www.meteor.com/',
        optional: false
    },
    description: {
        type: String,
        defaultValue: 'An informative website that explains the Meteor framework',
        optional: false
    },
    //  No user authentication in this repo.
    /* userId: {
        type: String,
        autoValue: function () {
            if (this.isSet) {
                return this.value;
            }
            else if (this.isInsert) {
                if (this.userId)
                    return this.userId;
            }
            else if (this.isUpsert) {
                return {
                    $setOnInsert: function () {
                        if (this.userId)
                            return this.userId;
                    }
                };
            }
            else {
                this.unset();
            }
        }
    }, */
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isSet) {
                return this.value;
            }
            else if (this.isInsert) {
                return new Date;
            }
            else if (this.isUpsert) {
                return { $setOnInsert: new Date };
            }
            else {
                this.unset();
            }
        }
    }
}));

console.log("DEFINING LinksCollection Methods");

//  Client and server Answer Collection Meteor Methods
Meteor.methods({
    //  Method used to insert new answer option from the Dashboard only
    'links.insert': function (link, isDirect = false) {
        console.log("Called links.insert...");

        //  Insert the link
        if(isDirect)
            LinksCollection.direct.insert(link);
        else
            LinksCollection.insert(link);
    }
});