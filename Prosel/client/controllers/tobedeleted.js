Template.wzornik.events({
  'click #menu-toggle': function(e) {
    e.preventDefault();
    $('#personal-information').toggleClass('col-0 col-md-2');
    $('#basic-container').toggleClass('col-md-9 col-md-8');
    $('#help-container-new').toggleClass('col-md-3 col-md-2');
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