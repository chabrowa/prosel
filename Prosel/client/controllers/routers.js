Session.setDefault('selectionPage', 'first');

Template.selectionRouter.helpers({
  goToFirst: function () {
    return Session.get('selectionPage') === 'first';
  },
  goToSecond: function () {
    return Session.get('selectionPage') === 'second';
  },
  goToThird: function () {
    return Session.get('selectionPage') === 'third';
  }
});
