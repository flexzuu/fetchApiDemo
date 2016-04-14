import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {RestEndpoints} from 'meteor/appworkshop:rest-api-wrapper'
import {Random} from 'meteor/random'

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
    var apiSettings = [
        {
            actionName: "getPosts",
            httpMethod: "get",
            endpoint: "http://jsonplaceholder.typicode.com/posts"
        }
    ];
    var functionLibrary = new RestEndpoints(apiSettings);
    Meteor.publish('getPosts', function() {
        var self = this;
        try {
            var response =  functionLibrary.getPosts();

            _.each(response.data, function(item) {
                self.added('posts', Random.id(), item);
            });

            self.ready();

        } catch(error) {
            console.log(error);
        }
    });
}
