Template.wzornik.events({
  'click #menu-toggle': function(e) {
    e.preventDefault();
    $('#personal-information').toggleClass('col-0 col-md-2');
    $('#basic-container').toggleClass('col-md-9 col-md-8');
    $('#help-container-new').toggleClass('col-md-3 col-md-2');
  },
  'click #part-function':
});