Meteor.subscribe('Materials');
var chosen = new Mongo.Collection();
var discarded = new Mongo.Collection();

Template.steps.helpers({
	'step1': function(){
    var aux = chosen.find();
    var extraShapes = [];
    aux.forEach(function(entry) {
    	var aux2 = entry.Extrashape;
    	aux2.forEach(function(entry) {
    		if(searchStringInArray(entry,extraShapes) == -1) extraShapes.push(entry);
    	});
    });
    return extraShapes;
        }

	});

Template.steps.events({
  "submit .step1": function (event) {
    // This function is called when the search form is submitted
    event.preventDefault();
    	
    var text = event.target.shape.value;

    aux = MaterialList.find()
    aux.forEach(function(entry) {
    	if(searchStringInArray(text,entry.Shape)==1)
    		chosen.insert(entry);
    	else discarded.insert(entry);
    	
});
   
  },

  "submit .step2": function (event) {
    // This function is called when the search form is submitted
    event.preventDefault();

    var text = event.target.ExtraShape.value;
    	       	console.log(chosen.find().fetch());

    aux = chosen.find()
    aux.forEach(function(entry) {
    	if(searchStringInArray(text,entry.Extrashape) == -1){
    		chosen.remove(entry);
    		discarded.insert(entry);
    	}
});
       	console.log(chosen.find().fetch());

  }
});
/*
console.log("test");

aux.forEach(function (mat) {
            console.log("asdf");        
          }); */
function searchStringInArray (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return 1;
    }
    return -1;
}