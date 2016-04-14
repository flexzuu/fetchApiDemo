import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Posts } from '../api/posts.js';

Template.posts.onCreated(function (){
  Meteor.subscribe('getPosts');
});

Template.posts.helpers({
  posts() {
    return Posts.find();
  },
});
