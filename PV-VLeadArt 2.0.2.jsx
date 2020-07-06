/*=========================
 * Author: Lan Nguyen
 * Usage: This script is to create a .PV file without using the .FXG file
 * This script requires the artist to use Spot Colors in order for transparency masks to be applied correctly.
 * The script saves the .PV file to the vectror folder on the I: drive
 *Version made specifically for VLead
 * Added funcitonality: Copies file name to clipboard
 * Updated 5/31/2019
 
 Steps:
 -Load PV Actions file in iIlustrator
 -Select Artwork in illustrator
 -Run Script
==========================*/

#target illustrator

main();

function main(){
    var doc = app.activeDocument
    var vectorName = decodeURI(activeDocument.name).replace(/\.[^\.]+$/, '');
    var prepName = prompt('Enter the Vector Version: ' + vectorName + '___. ');
    var aiFile = vectorName + prepName + '.ai'
    var aiFolder = new Folder(doc.path+ "\u005c" + "PV-Assets");
    
    if (!aiFolder.exists);
    //alert ("Creating Folder");
    aiFolder.create();
    
    convertArt();
    
    //***Save AI File in PV-Assets Folder
    aiDest= doc.fullName.parent.fsName + "\\" + "PV-Assets"
    //$.write("AI: " + aiDest + "\n") 
    hexcode =aiDest.toString(); 
    activeDocument.saveAs(File(aiDest + "\\" + aiFile));
    
    //***Export Pulse File  
    azDest = doc.fullName.parent.fsName + "\\" + vectorName + prepName + ".pv";
    //$.write("Pulse: " + azDest + "\n")
    hexcode =azDest.toString();
    exportPV(azDest);
    
    copyFilename();
    
    activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }

/*=========================
Copy Filename to Clipboard
==========================*/
function copyFilename(){
  var doc = app.activeDocument;
  var VectorName = decodeURI(activeDocument.name).replace(/\.[^\.]+$/, '');
  var height = 100;
  var text1 = doc.textFrames.pointText( [20,-height+50] );
  text1.contents = VectorName;
  app.executeMenuCommand('deselectall');
  doc.textFrames[0].textRange.select(true);
  app.executeMenuCommand('Selection Hat 9');
  app.executeMenuCommand('Selection Hat 8');
  app.executeMenuCommand('copy');
  doc.textFrames[0].remove(true);
}
/*=========================
Art Conversion
==========================*/
function convertArt(){
    UserInteractionLevel.DONTDISPLAYALERTS;
    checkFile();
    //convertClippingMask();
    removeGroups();
    app.executeMenuCommand ("selectall")
    app.doScript('Divide', 'PV Actions') 
    app.redraw();
    app.executeMenuCommand("cleanup menu item"); 
    app.executeMenuCommand ("ungroup")
    app.executeMenuCommand ("deselectall")
    colorGroup();
    swatchBatch();
    moveGroupsToLayers();
    app.executeMenuCommand ("selectall");
    app.executeMenuCommand ("ungroup");
    renameLayer();
    whiteOut();
    app.doScript ('Delete Swatches', 'PV Actions');
    setSpotColors();
    createMask();
    groupMask();
    clipMask();
    app.doScript ('Flatten Artwork', 'PV Actions');
    renameActiveLayer("Template");
    UserInteractionLevel.DISPLAYALERTS;
    }
/*=========================
renameActiveLayer(newName)
==========================*/
function renameActiveLayer(newName){
     var doc = app.activeDocument;
     doc.activeLayer.name = newName
     }
/*=========================
clipMask()
==========================*/
function clipMask(){
    var doc = app.activeDocument
    doc.selection = null; 

    for(i=doc.layers.length -1; i > -1; i--){
        selLayer = doc.layers[i]
        if(selLayer.name.match ('Color')){
            selLayer.selected = true;
            selLayer.hasSelectedArtwork = true;  
            app.doScript ('Transparency Mask', 'PV Actions')
            doc.selection = null;  
            }
        }
    }
/*=========================
groupMask()
==========================*/
function groupMask(){
    var doc= app.activeDocument;  
    doc.selection = null;

        for(var i=0; i<doc.pageItems.length; i++){
        thisItem = doc.pageItems[i];
        if(thisItem.name.match("Color")){
            thisItem.selected = true;
            app.executeMenuCommand ('group');
            doc.selection = null;
            }
        }
    }
/*=========================
createMask()
==========================*/ 
function createMask(){
    var doc = app.activeDocument
    doc.selection = null; 
    doc.defaultStroked = false;
    doc.defaultFilled = false; 

    for(j=doc.layers.length -1; j > -1; j--){
        iLayer = doc.layers[j]
        try{
            if(iLayer.name.match ('Color')){
                iLayer.selected = true;
                
                var maxPixelValue = 1000;
                var width = maxPixelValue; 
                var height = maxPixelValue; 
                var rect = iLayer.pathItems.rectangle(maxPixelValue,0,width, height);  
                //rect.name = iLayer.name.substr(3);
                rect.name = iLayer.name;
                doc.defaultFill = rect.name;
                rect.selected = true;
                resizeMask()
                
                var kulerID = doc.swatches.getByName(rect.name).color; 
                doc.defaultFillColor = kulerID;
                app.executeMenuCommand("Find Fill Color menu item");
                rect.zOrder(ZOrderMethod.SENDTOBACK);
                doc.selection = null;
                }
            }
        catch(e){
            }
        }
    app.redraw();
    }
/*=========================
resizeMask()
==========================*/ 
function resizeMask(){
    var doc = app.activeDocument  
    selec = doc.selection  
    if(selec.length==1){
        var docW = doc.width  
        var docH = doc.height 
        var activeAB = doc.artboards[doc.artboards.getActiveArtboardIndex()]
        
        docLeft = activeAB.artboardRect[0];  
        docTop = activeAB.artboardRect[1];   
        
        var sel = doc.selection[0];  
        var selVB = sel.visibleBounds;  
        var selVw = selVB[2]-selVB[0];  
        var selVh = selVB[1]-selVB[3];  
        
        var selGB = sel.geometricBounds;  
        var selGw = selGB[2]-selGB[0];  
        var selGh = selGB[1]-selGB[3];  
        
        // get the difference between Visible & Geometric Bounds  
        var deltaX = selVw-selGw;  
        var deltaY = selVh-selGh;  
        
        sel.width = docW-deltaX; // width is Geometric width, so we need to make it smaller...to accomodate the visible portion.  
        sel.height = docH-deltaY;  
        sel.top = docTop; // Top is actually Visible top  
        sel.left = docLeft; // dito for Left  
        }else{
            //alert("select ONE object before running");  
            }
        }

/*===============================
setSpotColors()
================================*/
function setSpotColors() {
    spotColorGeneral (0, 0, 0, 'Color1');
    spotColorGeneral (255, 0, 125, 'Color2');
    spotColorGeneral (0, 255, 0, 'Color3');
    spotColorGeneral (0, 125, 255, 'Color4');
    spotColorGeneral (255, 255, 0, 'Color5');
    spotColorGeneral (0, 255, 255, 'Color6');
    spotColorGeneral (125, 0, 255, 'Color7');
    spotColorGeneral (255, 125, 0, 'Color8');
    spotColorGeneral (255, 125, 255, 'Color9');
    spotColorGeneral (255, 0, 0, 'Color10');
    }

/*===============================
spotColorGeneral
================================*/  
function spotColorGeneral(r, g, b, kulerName) {
   if (app.documents.length === 0) return;
   
   try {
       var doc = app.activeDocument;
       var newSpot = doc.spots.add();
       var newColor = new RGBColor();
       
       newColor.red = r;
       newColor.green = g;
       newColor.blue = b;
       
       newSpot.name = kulerName;
       newSpot.colorType = ColorModel.SPOT;
       newSpot.color = newColor;
       var newSpotColor = new SpotColor();
       newSpotColor.spot = newSpot;
       //newSpotColor.tint = 80;
      }
      catch (err) {
         return;
         }
     app.redraw();
     }
/*===============================
whiteOut()
================================*/
function whiteOut(){
    var doc = app.activeDocument;  
    var rgbCol = new RGBColor();  
    
    rgbCol.red = 255;  
    rgbCol.green = 255;  
    rgbCol.blue = 255;  
    
    doc.defaultFillColor = rgbCol;  
    app.executeMenuCommand("Find Fill Color menu item");  
    doc.selection = null;   
    }
/*===============================
renameLayer()
================================*/
function renameLayer(){
    var doc= app.activeDocument;  
    for (var i=0; i < doc.layers.length; i++){
        doc.layers[i].name = "Color" + [i+1];
        }
    app.redraw();
    }
/*===============================
moveGroupsToLayers()
================================*/  
function moveGroupsToLayers(){
    var doc = app.activeDocument
    for (i=0; i < doc.layers.length; i++){
        var eachLayer = doc.layers[i];
        
        if (eachLayer.groupItems.length > 1){
            for(var ii= 0; doc.groupItems.length > ii; ii++){ 
                if(doc.groupItems[ii].selected = true){
                    reStructureLayers();
                    }
                }
            }
        }
    app.redraw();
    }

function reStructureLayers(){ //Move all pageItems to indivudal Layers 
    var doc = app.activeDocument;  
    var originalLayer = doc.layers[0];  
    var newLayer, thisGroup, thisContent; 
    
    for(var i=originalLayer.pageItems.length - 1; i > -1; i--){  
        thisItem = originalLayer.pageItems[i];  
        newLayer = doc.layers.add();  
        //newLayer.name = thisItem.name;  
        thisItem.move(newLayer, ElementPlacement.PLACEATBEGINNING);  
        }

    //app.redraw();  
    if(originalLayer.pageItems.length == 0){  
        originalLayer.remove();  
        }
    app.redraw();
    }
/*===============================
swatchBatch() - select objects with same active color
================================*/
function swatchBatch(){  
    var doc = activeDocument;
    var swatchGroup = doc.swatchGroups.getByName('ActiveColors');    
    var colorSwatches = swatchGroup.getAllSwatches();      
    var thisSwatch;  
      
    for(var i=0; i<colorSwatches.length; i++){  
        thisSwatch = colorSwatches[i]; 
        doc.defaultFillColor = thisSwatch.color;   
        app.executeMenuCommand("Find Fill Color menu item");  
        app.executeMenuCommand("compoundPath");    
        //renamePath()
        app.executeMenuCommand("group");  
        doc.selection = null;    
        }  
        app.redraw();
    }  
/*===============================
removeGroups()
================================*/
function removeGroups(){
    var doc= app.activeDocument;  
    doc.selection = null;  
    var itemKinds = ["pathItems","compoundPathItems","textFrames","placedItems","rasterItems","meshItems","pluginItems","graphItems","symbolItems","groupItems"];
    app.doScript ('Delete Swatches', 'PV Actions');
    
    function getChildAll(obj){
        var childsArr = [];
        for(var i=0;i<obj.pageItems.length;i++)childsArr.push(obj.pageItems[i]);
        return childsArr;
        }
    
    if(app.activeDocument){
        doc = app.activeDocument;
        if(doc.layers.length)for(var i=0;i<doc.layers.length;i++)ungroup(doc.layers[i]);
        }
    
    function ungroup(obj){
        var elements = getChildAll(obj);
        if(elements.length<1){
            obj.remove();
            return;
            }else{
                for(var i=0;i<elements.length;i++){
                    try{
                        if(elements[i].parent.typename!="Layer")elements[i].moveBefore(obj);
                        if(elements[i].typename=="GroupItem")ungroup(elements[i]);
                        }catch(e){
                            }
                        }
                    }
                }
            //app.redraw()
            }
/*===============================
colorGroup()
================================*/
function colorGroup(){
    var doc = activeDocument;
    if (doc.spots.length >1) {
        var colorgroup = doc.swatchGroups.add();
        colorgroup.name = 'ActiveColors';
        for (i = 0; i < doc.spots.length-1; i++) {
            colorgroup.addSpot(doc.spots[i]);
            }
        }
    app.redraw();
    }
  
/*===============================
convertClippingMask()
================================*/
function convertClippingMask(){
    var doc = app.activeDocument;
    app.executeMenuCommand("Clipping Masks menu item");
    var thisClipItem;
    var esc = 50; // make sure to have an escape route for the while statement
    while(doc.selection.length != 0 && esc > 0){
        esc--;
        thisClipItem = doc.selection[0];
        doc.selection = null;
        thisClipItem.parent.selected = true;
        app.doScript("Trim","PV Actions");
        doc.selection = null;
        app.executeMenuCommand("Clipping Masks menu item");
        }
    }
/*===============================
checkFile()
================================*/
function checkFile(){
    var doc= app.activeDocument;  
    if (doc.selected == doc.groupItems){
        null;
        } else {
            app.executeMenuCommand("group");
            }
        expandFile();
        importIcon();
        app.executeMenuCommand ("Fit Artboard to selected Art");
        app.redraw();
        }

/*===============================
expandFile()
================================*/
function expandFile() {  
  //app.executeMenuCommand("selectall");  
  app.executeMenuCommand ('Live Outline Stroke');  
  app.executeMenuCommand ('expandStyle');  
  app.redraw();
} 
/*===============================
importIcon()
================================*/     
function importIcon(){
    docSelected = app.activeDocument.selection
    
    if ( docSelected.length > 0 ){
        var newDoc = app.documents.add(DocumentColorSpace.RGB,1000,1000,);
        newDoc.rasterEffectSettings.resolution = 72
        
        if ( docSelected.length > 0 ){
            for ( i = 0; i < docSelected.length; i++ ){
                docSelected[i].selected = false;
                newItem = docSelected[i].duplicate( newDoc, ElementPlacement.INSIDE );
                resizeArt();
                }
            
            } else {
                docSelected.selected = false;
                newItem = docSelected.parent.duplicate( newDoc, ElementPlacement.PLACEATEND );
                }
            
            } else {
                //alert( "Please select one or more art objects" );
                return;
                }
            app.redraw();
            }
/*===============================
resizeArt() //https://gist.github.com/ruandre/7b47cbf2a4c55dac9adb
================================*/ 
function resizeArt(){
    app.executeMenuCommand("selectall");
    var activeDoc = app.activeDocument,
    selection = activeDoc.selection;
    if (selection.length > 0){
        for (n = 0; n < selection.length; n++){
            var item = selection[n]
            
            abActive = activeDoc.artboards[ activeDoc.artboards.getActiveArtboardIndex() ],
            abProps = getArtboardBounds(abActive),
            boundsDiff = itemBoundsDiff(selection[n]);
            
            // Scale object to fit artboard:
            fitItem(item, abProps, boundsDiff);
            }
        } else {
            alert("Select an object before running this script.");
            }
        app.redraw();
        }
/*===============================
Artboard bounds helper (used above):
================================*/ 
function getArtboardBounds(artboard){
    var bounds = artboard.artboardRect,
    left = bounds[0],
    top = bounds[1],
    right = bounds[2],
    bottom = bounds[3],
    
    width = right - left,
    height = top - bottom,
    props = {
        left: left,
        top: top,
        width: width,
        height: height
        };
    return props;
    }
/*===============================
Bounds difference helper (used at the top):
================================*/ 
function itemBoundsDiff(item){
    var itemVB = item.visibleBounds,
        itemVW = itemVB[2] - itemVB[0],
        itemVH = itemVB[1] - itemVB[3],
        
        itemGB = item.geometricBounds,
        itemGW = itemGB[2] - itemGB[0],
        itemGH = itemGB[1] - itemGB[3],
        
        deltaX = itemVW - itemGW,
        deltaY = itemVH - itemGH,
        
        diff = {
            deltaX: deltaX,
            deltaY: deltaY
        }
    return diff;
    }
/*===============================
Fit item helper (used at the top):
================================*/ 
function fitItem(item, props, diff){
    var oldWidth = item.width; 
    var oldHeight = item.height;
    if (item.width > item.height){
        // alert('wide');
        item.width = props.width - diff.deltaX;
        
        // Scale height using ratio from width:
        var ratioW = item.width / oldWidth;
        item.height = oldHeight * ratioW;
        
    } else{
        // alert('tall');
        item.height = props.height - diff.deltaY;
        
        // Scale width using ratio from height:
        var ratioH = item.height / oldHeight;
        item.width = oldWidth * ratioH;
    }
    // Center:
    item.top = 1000
    item.left = 0
    //item.top = 0 - ((props.height / 2) - (item.height / 2));
    //item.left = (props.width / 2) - (item.width / 2);
}

/*================
Export PV Files
================*/
function exportPV(filePath){  
    String.prototype.hexEncode = function(){   
        //http://stackoverflow.com/questions/21647928/javascript-unicode-string-to-hex   
        var hex = '';   
        for(var i=0;i<this.length;i++){   
            hex += ''+this.charCodeAt(i).toString(16);   
            }   
        return hex;   
        };  
    
    function writeFile(fileDestStr, contents){   
        var newFile = File(fileDestStr);   
        newFile.open('w');   
        newFile.write(contents); 
        newFile.close();   
        };   

var NOTE_VALUE = filePath
var actionString = [  

'/version 3',
'/name [ 7',
'436f6e76657274', //Convert
']',
'/isOpen 1',
'/actionCount 1',
'/action-1 {',
'/name [ 9',
'4578706f7274205056', //Export PV
']',
'/keyIndex 0',
'/colorIndex 0',
'/isOpen 1',
'/eventCount 1',
'/event-1 {',
'/useRulersIn1stQuadrant 0',
'/internalName (adobe_exportDocument)',
'/localizedName [ 9',
'4578706f7274204173', //Export As
']',
'/isOpen 0',
'/isOn 1',
'/hasDialog 1',
'/showDialog 0',
'/parameterCount 6',
'/parameter-1 {',
'/key 1851878757',
'/showInPalette -1',
'/type (ustring)',
//'/value [ 25', + folder + '',  
//'/value [ 25',  
//'433a5c55736572735c6c616e67757965345c4465736b746f70', //C:\Users\languye4\Desktop
'/value [ PUT_NOTE_VALUE_CHAR_LENGTH_HERE',  
'PUT_HEX_NOTE_VALUE_HERE',  
']',
'}',
'/parameter-2 {',
'/key 1718775156',
'/showInPalette -1',
'/type (ustring)',
'/value [ 14',
'50756c73652050562046696c6573', //Pulse PV Files
']',
'}',
'/parameter-3 {',
'/key 1702392942',
'/showInPalette -1',
'/type (ustring)',
'/value [ 2',
'7076',
']',
'}',
'/parameter-4 {',
'/key 1936548194',
'/showInPalette -1',
'/type (boolean)',
'/value 0',
'}',
'/parameter-5 {',
'/key 1935764588',
'/showInPalette -1',
'/type (boolean)',
'/value 1',
'}',
'/parameter-6 {',
'/key 1936875886',
'/showInPalette -1',
'/type (ustring)',
'/value [ 1',
'31',
']',
'}',
'}',
'}',
   
].join('\n');   
  
if(app.documents.length == 0){   
    return;  
    }

var actionFileDestStr = Folder.desktop + "/Export PV.aia";  

writeFile(actionFileDestStr, actionString.replace("PUT_NOTE_VALUE_CHAR_LENGTH_HERE", NOTE_VALUE.length).replace("PUT_HEX_NOTE_VALUE_HERE", NOTE_VALUE.hexEncode()));   
var actionFile = File(actionFileDestStr);   
app.loadAction(actionFile);   
app.doScript("Export PV", "Convert");  
actionFile.remove();  
app.unloadAction("Convert", ''); 
}

