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

    "submit .step7": function (event, template) {
    event.preventDefault();  
    var selected = template.findAll( ".step7 input[type=checkbox]:checked");  
    var array = mapItems(selected);
    var aux = chosen.find()
    aux.forEach(function(entry) {
        if(searchStringInArray(entry.SurfaceFinish, array) == -1){
             chosen.remove(entry);
             discarded.insert(entry);
            } 

    });
  },  

    "submit .step8": function (event) {
    event.preventDefault();  
    var MBRvalue = event.target.MinBendRadious.value;
    var higher = event.target.MBRorHigher.checked;
    var aux = chosen.find()
    aux.forEach(function(entry) {
        if(higher){ 
            if( entry.MinBendRadious > MBRvalue){
             chosen.remove(entry);
             discarded.insert(entry);
            } 
        }else{
                if( entry.MinBendRadious != MBRvalue ){
                                 chosen.remove(entry);
                                 discarded.insert(entry);
                }
            }
    });
  },   

    "submit .step9": function (event, template) {
    event.preventDefault();  
    var selected = template.findAll( ".step9 input[type=checkbox]:checked");  
    var array = mapItems(selected);
    var aux = chosen.find()
    aux.forEach(function(entry) {
        if(searchStringInArray(entry.Warpage, array) == -1){
             chosen.remove(entry);
             discarded.insert(entry);
            } 

    });
  },  

  //step10 not yet implemented  

    "submit .step11" : function (event, template) {
    event.preventDefault();
    var selected = template.findAll( ".step11 input[type=checkbox]:checked");  
    var array = mapItems(selected);
    var aux = chosen.find()
    aux.forEach(function(entry) {
        if(searchStringInArray(entry.StressingPrecision, array) == -1){
             chosen.remove(entry);
             discarded.insert(entry);
            } 

    }); console.log(chosen.find().fetch());
},  

    "submit .step12": function (event) {
    event.preventDefault();
    var TensileStiffness = event.target.TensileStiffness.value;
    var aux = chosen.find()
    aux.forEach(function(entry) {
        if( TensileStiffness > entry.TensileStiffness){
           chosen.remove(entry);
           discarded.insert(entry);
        }
    });
  },

    "submit .step13": function (event) {
    event.preventDefault();
    var TensileStrength = event.target.TensileStrength.value;
    var aux = chosen.find()
    aux.forEach(function(entry) {
        if( TensileStrength > entry.TensileStrength){
           chosen.remove(entry);
           discarded.insert(entry);
        }
    }); 
  }, 

    "submit .step14" : function (event, template) {
    event.preventDefault();
    var selected = template.findAll( ".step14 input[type=checkbox]:checked");  
    var array = mapItems(selected); 
    var aux = chosen.find();
    aux.forEach(function(entry) {
        if(searchStringInArray(entry.PlyAngle, array) == -1){
             chosen.remove(entry);
             discarded.insert(entry);
            } 

    }); console.log(chosen.find().fetch());
},

    "submit .step15" : function (event, template) {
    event.preventDefault();
    var selected = template.findAll( ".step15 input[type=checkbox]:checked");  
    var array = mapItems(selected); 
    var aux = chosen.find();
    aux.forEach(function(collectionElement) {
        var aux2 = collectionElement.ThicknessTailoring; 
        var found = false;
        aux2.forEach(function(entry) { 
            if(searchStringInArray(entry, array) == 1){ found = true; return }   
            if(!found){
             chosen.remove(collectionElement);
             discarded.insert(collectionElement);
            } 
        });
    });
},

    "submit .step16": function (event) {
    event.preventDefault();
    var Aprod = event.target.Aprod.value;
    var aux = chosen.find();
    aux.forEach(function(entry) {
        if( Aprod > entry.AnnualProductionVolume){
           chosen.remove(entry);
           discarded.insert(entry);
        }
    }); console.log(chosen.find().fetch());
  },

    "submit .step17": function(event){
    event.preventDefault();
    var MS = event.target.MS.checked;
    if(MS){ 
    var aux = chosen.find();
    aux.forEach(function(entry) {
        if(entry.MatchedSurface == "N"){
           chosen.remove(entry);
           discarded.insert(entry);
        }
    });
    } console.log(chosen.find().fetch());
    },

    "submit .step18": function(event){
    event.preventDefault();
    var EI = event.target.EI.checked;
    if(EI){
    var aux = chosen.find();
    aux.forEach(function(entry) {
        if( entry.EmbeddedInserts == "N"){
           chosen.remove(entry);
           discarded.insert(entry);
        }
    });
    } console.log(chosen.find().fetch());
    },

    "submit .step19": function(event){
    event.preventDefault();
    var CC = event.target.CC.checked;
    if(CC){
    var aux = chosen.find();
    aux.forEach(function(entry) {
        if(entry.CoCuring == "N"){
           chosen.remove(entry);
           discarded.insert(entry);
        }
    });
    } console.log(chosen.find().fetch());
    },

    "submit .step20a": function(event){
    event.preventDefault();
    var Sbeading = event.target.Sbeading.checked;
    if(Sbeading){
    var aux = chosen.find();
    aux.forEach(function(entry) {
        if(entry.Sbeading == "N"){
           chosen.remove(entry);
           discarded.insert(entry);
        }
    });
    } console.log(chosen.find().fetch());
    },

    "submit .step20b": function(event){
    event.preventDefault();
    var Sblades = event.target.Sblades.checked;
    if(Sblades){
    var aux = chosen.find();
    aux.forEach(function(entry) {
        if(entry.Sblades == "N"){
           chosen.remove(entry);
           discarded.insert(entry);
        }
    });
    } console.log(chosen.find().fetch());
    },

    "submit .step20c": function(event){
    event.preventDefault();
    var Shats = event.target.Shats.checked;
    if(Shats){
    var aux = chosen.find();
    aux.forEach(function(entry) {
        if(entry.Shats == "N"){
           chosen.remove(entry);
           discarded.insert(entry);
        }
    });
    } console.log(chosen.find().fetch());
    },

    "submit .step20d": function(event){
    event.preventDefault();
    var Sfoam = event.target.Sfoam.checked;
    if(Sfoam){
    var aux = chosen.find();
    aux.forEach(function(entry) {
        if(entry.Sfoam  == "N"){
           chosen.remove(entry);
           discarded.insert(entry);
        }
    });
    } console.log(chosen.find().fetch());
    },   

    "submit .step20e": function(event){
    event.preventDefault();
    var Shoneycomb = event.target.Shoneycomb.checked;
    if(Shoneycomb){
    var aux = chosen.find();
    aux.forEach(function(entry) {
        if(entry.Shoneycomb  == "N"){
           chosen.remove(entry);
           discarded.insert(entry);
        }
    });
    } console.log(chosen.find().fetch());
    },                 

});

function searchStringInArray (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return 1;
    }
    return -1;
}

function mapItems(selected){
    var array = _.map(selected, function(item) {
     return item.defaultValue;
  });
    return array;
}

