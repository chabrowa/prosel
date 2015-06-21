Session.setDefault('suitable-visible', true);
Session.setDefault('rejected-visible', false);

Template.materials.helpers({
  showSuitable: function () {
    return Session.get('suitable-visible');
  },
  showRejected: function () {
    return Session.get('rejected-visible');
  }
});

Template.materials.events({
  'click #toggle-suitable': function(e) {
    Session.set('suitable-visible', !Session.get('suitable-visible'))
  },
  'click #toggle-rejected': function(e) {
    Session.set('rejected-visible', !Session.get('rejected-visible'));
  }
});
