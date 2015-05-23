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
    event.preventDefault(); 	
    var text = event.target.shape.value;
    var aux = MaterialList.find()
    aux.forEach(function(entry) {
    	if(searchStringInArray(text,entry.Shape)==1)
    		chosen.insert(entry);
    	else discarded.insert(entry);    	
    });  
  },

  "submit .step2": function (event) {
    event.preventDefault();
    var text = event.target.ExtraShape.value;
    var aux = chosen.find()
    aux.forEach(function(entry) {
    	if(searchStringInArray(text,entry.Extrashape) == -1){
    		chosen.remove(entry);
    		discarded.insert(entry);
    	}
    });
  },

    "submit .step3": function (event) {
    event.preventDefault();
    var dim1 = event.target.maxSize1.value;
    var dim2 = event.target.maxSize2.value; 
    var aux = chosen.find()
    aux.forEach(function(entry) {
        if( dim1 > entry.MaxSize[0]  || dim2 > entry.MaxSize[1] ){
           chosen.remove(entry);  
           discarded.insert(entry);   
        }
    });
  },

    "submit .step4": function (event) {
    event.preventDefault();
    var dim1 = event.target.minSize1.value;
    var dim2 = event.target.minSize2.value; 
    var aux = chosen.find()
    aux.forEach(function(entry) {
        if( dim1 < entry.MinSize[0]  || dim2 < entry.MinSize[1] ){
           chosen.remove(entry);
           discarded.insert(entry);
        }
    });
  },

    "submit .step5": function (event) {
    event.preventDefault();
    var maxThickness = event.target.MaxThickness.value;
    var aux = chosen.find()
    aux.forEach(function(entry) {
        if(entry.maxThickness != "NL"){
        if( maxThickness > entry.MaxThickness){
           chosen.remove(entry);
           discarded.insert(entry);
        }
       }
    });
  },  

    "submit .step6": function (event) {
    event.preventDefault();
    var minThickness = event.target.MinThickness.value;
    var aux = chosen.find()
    aux.forEach(function(entry) {
        if( minThickness < entry.MinThickness){
           chosen.remove(entry);
           discarded.insert(entry);
        }
    });
  },

    "submit .step7": function (event) {
    event.preventDefault();  
    var SFvalue = event.target.SurfaceFinish.value;
    var higher = event.target.orHigher.checked;
    var aux = chosen.find()
    aux.forEach(function(entry) {
        if(higher){ 
            if( entry.SurfaceFinish < SFvalue){
             chosen.remove(entry);
             discarded.insert(entry);
            } 
        }else{
                if( entry.SurfaceFinish != SFvalue ){
                                 chosen.remove(entry);
                                 discarded.insert(entry);
                }
            }
    });
  },     

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