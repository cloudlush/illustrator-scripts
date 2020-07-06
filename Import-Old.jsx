/*
Problems:
1. All items must be grouped prior to execution
    
    
 */
#target Illustrator
//GLOBAL VARIABLES
var docSize = 1000

function scaleIcon(newItem, docSize){
   if(newItem.height>newItem.width){
       scaleFactor = docSize/newItem.height
        newItem.resize (scaleFactor*100,scaleFactor*100, true, false, false, true, scaleFactor*100 )
        newItem.top=docSize
        newItem.left=(docSize - newItem.width)/2
        //doc.artboards[0].artboardRect = [docSize+((docSize - newItem.width)/2-docSize),docSize,docSize-((docSize - newItem.width)/2),0]//uncomment to crop Artboard
       }
   else if(newItem.height<newItem.width){
       scaleFactor = docSize/newItem.width
       //alert(newItem.height+','+newItem.width+' vs Geo='+newItem.geometricBounds)
        newItem.resize (scaleFactor*100, scaleFactor*100, true, false, false, true, scaleFactor*100   )
        //alert((docSize - newItem.height)/2)
        newItem.top=docSize-(docSize - newItem.height)/2
        newItem.left=0
        //doc.artboards[0].artboardRect = [0,docSize-(docSize - newItem.height)/2,docSize,(docSize - newItem.height)/2]//uncomment to crop Artboard
       }
   else if(newItem.height==newItem.width){//Pefect Square
       alert('A perfect square?  Really?  Do it yourself.')
       newItem.height = docSize
       newItem.width = docSize  
       } 
    }

function groupSelection(docSelected){//if the selection is ungrouped(greater than length=1), execute grouping function
    if(docSelected.length>1){
    var myGroup = app.activeDocument.groupItems.add()
    myGroup.name = 'Scene7 Object'
    for(i=0;docSelected.length>i;i++){
            //alert(docSelected[i])
        try{
            //alert('success')
            //docSelected[i].moveToBeginning(myGroup)
            docSelected[i].moveToEnd(myGroup)
            docSelected[i].selected=false
            }
        catch(err){
            alert('failed to group item '+docSelected[i])
            }
        }
    myGroup.selected = true
    }
}

var newItem;
var docSelected = app.activeDocument.selection;
groupSelection(docSelected)
docSelected = app.activeDocument.selection
if ( docSelected.length > 0 ) {
    //alert(docSelected)
    //groupSelection(docSelected)
// Create a new document and move the selected items to it.
var newDoc = app.documents.add(DocumentColorSpace.RGB,1000,1000);
newDoc.rasterEffectSettings.resolution = 72
if ( docSelected.length > 0 ) {
for ( i = 0; i < docSelected.length; i++ ) {
docSelected[i].selected = false;
newItem = docSelected[i].duplicate( newDoc,
ElementPlacement.INSIDE );

scaleIcon(newItem,docSize)
}
}
else {
docSelected.selected = false;
newItem = docSelected.parent.duplicate( newDoc,
ElementPlacement.PLACEATEND );
}
}
else {
alert( "Please select one or more art objects" );
}
//alert(doc.artboards[0].artboardRect)
//doc.artboards[0].artboardRect = [100,1000,900,0]
//doc.artboards[0].artboardRect = [left location,top location,right location,bottom location]