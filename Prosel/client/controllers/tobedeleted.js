Template.wzornik.events({
  'click #menu-toggle': function(e) {
    e.preventDefault();
    $('#personal-information').toggleClass('col-0 col-md-2');
    $('#basic-container').toggleClass('col-md-9 col-md-7');
  },
  'click #part-function': function(e) {
    Session.set('selectionPage', 'first');
  },
  'click #weight-saving': function(e) {
    Session.set('selectionPage', 'second');
  },
  'click #structural-approach': function(e) {
    Session.set('selectionPage', 'third');
  },
  'click #cost-comparison': function(e) {
    Session.set('selectionPage', 'fourth');
  }
});
