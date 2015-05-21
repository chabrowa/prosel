 Meteor.publish('Materials', function(){
    return MaterialList.find()
});
/*
 Meteor.methods({
  'insertMaterialData': function(mat){
   materials.insert(mat);

  },

  'removeMaterialData': function(mat){
   PlayersList.remove(mat);
  },
  'modifyMaterialScore' : function(mat){
    PlayersList.update(mat);

  }
});*/