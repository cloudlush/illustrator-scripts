
//Add 'skip/ass' as color exception
//Update Import script, because the old one sucks.

var doc = app.activeDocument
/*=========================
Main Functions
==========================*/ 
//groupActiveColors()

test()
idMascot()
idLine()
idObjects()
app.executeMenuCommand('selectall');
app.executeMenuCommand('ungroup'); 
kernCheck() 
moveObjectsToLayers()
matchSwatchName()
doc.swatchGroups.removeAll();
app.redraw();  
createSwatches()
createMask()
groupMask()
clipMask()
app.doScript ('Flatten Artwork', 'PV Actions')
renameActiveLayer('Template')
colorMascot()

/*=========================
colorMascot()
==========================*/
function colorMascot(){
    var doc=app.activeDocument
    doc.selection = null;

    for(i=doc.pathItems.length -1; i > -1; i--){
        if(doc.pathItems[i].name.match ('Mascot')){
            doc.pathItems[i].selected =true;
            doc.pathItems[i].fillColor = doc.swatches.getByName('Mascot').color; 

            }
        }
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
            app.executeMenuCommand ('group')
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
                rect.name = iLayer.name
                doc.defaultFill = rect.name;
                rect.selected = true;
                resizeMask()
                
                var kulerID = doc.swatches.getByName(rect.name).color; 
                doc.defaultFillColor = kulerID;
                app.executeMenuCommand("Find Fill Color menu item");
                rect.zOrder(ZOrderMethod.SENDTOBACK)
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
/*=========================
createSwatches()
==========================*/ 
function createSwatches(){
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
    spotColorGeneral (0, 0, 0, 'Color11');
    spotColorGeneral (255, 0, 125, 'Color12');
    spotColorGeneral (0, 255, 0, 'Color13');
    spotColorGeneral (0, 125, 255, 'Color14');
    spotColorGeneral (255, 255, 0, 'Color15');
    spotColorGeneral (0, 255, 255, 'Color16');
    spotColorGeneral (125, 0, 255, 'Color17');
    spotColorGeneral (255, 125, 0, 'Color18');
    spotColorGeneral (255, 125, 255, 'Color19');
    spotColorGeneral (255, 0, 0, 'Color20');
    spotColorGeneral (0, 0, 0, 'Color21');
    spotColorGeneral (255, 0, 125, 'Color22');
    spotColorGeneral (0, 255, 0, 'Color23');
    spotColorGeneral (0, 125, 255, 'Color24');
    spotColorGeneral (255, 255, 0, 'Color25');
    spotColorGeneral (0, 255, 255, 'Color26');
    spotColorGeneral (125, 0, 255, 'Color27');
    spotColorGeneral (255, 125, 0, 'Color28');
    spotColorGeneral (255, 125, 255, 'Color29');
    
    spotColorGeneral (255, 180, 130, 'Color30');
    spotColorGeneral (255, 185, 130, 'Color31');
    spotColorGeneral (255, 190, 130, 'Color32');
    spotColorGeneral (255, 200, 130, 'Color33');
    spotColorGeneral (255, 210, 130, 'Color34');
    spotColorGeneral (255, 180, 130, 'Color35');
    spotColorGeneral (255, 185, 130, 'Color36');
    spotColorGeneral (255, 190, 130, 'Color37');
    spotColorGeneral (255, 200, 130, 'Color38');
    spotColorGeneral (255, 210, 130, 'Color39');
 
    spotColorGeneral (230, 0, 255, 'Mascot');
    }
/*=========================
spotColorGeneral(r,g,b,kulerName)
==========================*/ 
function spotColorGeneral(r,g,b,kulerName){
    if ( app.documents.length > 0 ){
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
    app.redraw();  
    }
/*===============================
spotWhite()
================================*/  
function spotWhite(){  
    var doc = activeDocument;  
    var newColor = new RGBColor();  
    newColor.red = 255;  
    newColor.green = 255;  
    newColor.blue = 255;  
    
    for (var i=0; i<doc.spots.length; i++){  
        doc.spots[i].color = newColor;  
        }
    }
/*===============================
matchSwatchName()
================================*/  
function matchSwatchName(){
    var doc = app.activeDocument
    doc.selection = null; 
    doc.defaultStroked = false;
    doc.defaultFilled = false; 
    spotColorGeneral (255, 255, 255, 'White');
    counter = 30

    for(i=doc.layers.length -1; i > -1; i--){
        for(x=0; x < doc.layers[i].pageItems.length; x++){
            obj = doc.layers[i].pageItems[x]
            obj.selected = true
            
           
 
            if(doc.layers[i].name.match ('Color')){
                 if((doc.defaultFilled === false) && (doc.defaultStroked === true)){
                     //alert ('whoop')
                     SetStroke()
                     }
                 if((doc.defaultStroked  === false) && (doc.defaultFilled === true)){
                    // alert ('ass')
                     SetFill()
                     }
                 if((doc.defaultFilled === false) && (doc.defaultStroked === false)){
                     //alert ('whoop ass')
                     return
                     }
                 doc.layers[i].name = doc.swatches.getSelected()[0].name
                 app.doScript ('WhiteOut', 'PV Actions')
                }
            
             if (obj.name.match ('skip')){
                obj.name = obj.name.substr(5);
                doc.layers[i].name = 'Color' + [counter++]
                app.doScript ('WhiteOut', 'PV Actions')
                }
            }
        doc.selection = null;
        }
    }

/*===============================
SetFill()
================================*/  
function SetFill(){
var actionString = [
'/version 3',
'/name [ 7',
'53657446696c6c', //SetFill
']',
'/isOpen 0',
'/actionCount 1',
'/action-1 {',
'/name [ 4',
'46696c6c', //Fill
']',
'/keyIndex 0',
'/colorIndex 0',
'/isOpen 0',
'/eventCount 1',
'/event-1 {',
'/useRulersIn1stQuadrant 0',
'/internalName (ai_plugin_setColor)',
'/localizedName [ 9',
'53657420636f6c6f72', //Set color
']',
'/isOpen 0',
'/isOn 1',
'/hasDialog 0',
'/parameterCount 2',
'/parameter-1 {',
'/key 1768186740',
'/showInPalette -1',
'/type (ustring)',
'/value [ 10',
'46696c6c20636f6c6f72', //Fill color
']',
'}',
'/parameter-2 {',
'/key 1718185068',
'/showInPalette -1',
'/type (boolean)',
'/value 1',
'}',
'}',
'}',
].join('\n');   

var aiaFileDest = Folder.desktop + "/SetFill.aia";  
var aiaFile = File(aiaFileDest);

aiaFile.open('w');
aiaFile.write(actionString);
aiaFile.close();

app.loadAction(aiaFile);
app.doScript("Fill", "SetFill");

aiaFile.remove();
app.unloadAction("SetFill", "");
}

/*===============================
SetStroke()
================================*/  
function SetStroke(){
var actionString = [

'/version 3',
'/name [ 9',
'5365745374726f6b65', //SetStroke
']',
'/isOpen 0',
'/actionCount 1',
'/action-1 {',
'/name [ 6',
'5374726f6b65', //Stroke
']',
'/keyIndex 0',
'/colorIndex 0',
'/isOpen 0',
'/eventCount 1',
'/event-1 {',
'/useRulersIn1stQuadrant 0',
'/internalName (ai_plugin_setColor)',
'/localizedName [ 9',
'53657420636f6c6f72', //Set color
']',
'/isOpen 0',
'/isOn 1',
'/hasDialog 0',
'/parameterCount 2',
'/parameter-1 {',
'/key 1768186740',
'/showInPalette -1',
'/type (ustring)',
'/value [ 12',
'5374726f6b6520636f6c6f72', //Stroke color
']',
'}',
'/parameter-2 {',
'/key 1718185068',
'/showInPalette -1',
'/type (boolean)',
'/value 0',
'}',
'}',
'}',
].join('\n');   

var aiaFileDest = Folder.desktop + "/setStroke.aia";  
var aiaFile = File(aiaFileDest);

aiaFile.open('w');
aiaFile.write(actionString);
aiaFile.close();

app.loadAction(aiaFile);
app.doScript("Stroke", "SetStroke");

aiaFile.remove();
app.unloadAction("SetStroke", "");
}
/*===============================
moveObjectsToLayers()
================================*/  
function moveObjectsToLayers(){
    var doc = app.activeDocument;  
    doc.selection=null;
    var originalLayer = doc.layers[0];  
    var newLayer, thisGroup, thisContent; 
    
    for(i=originalLayer.pageItems.length -1; i > -1; i--){  
        thisItem = originalLayer.pageItems[i];  
        
        if(originalLayer.pageItems[i].name.match ('Mascot')){
            newLayer = doc.layers.add();
            thisItem.move(newLayer, ElementPlacement.PLACEATEND); 
            }
        
        else{
            try{
                newLayer = doc.layers.add();
                newLayer.name = 'Color'
                thisItem.move(newLayer, ElementPlacement.PLACEATEND); 
                }
            catch (e){
                return
                }
            app.redraw();
            }
        }
    if(originalLayer.pageItems.length == 0){  
        originalLayer.remove();  
        }
    }
/*=========================
textWidthCheck()
==========================*/ 
function textWidthCheck(){
    var doc = app.activeDocument
    var textRef = doc.textFrames;  
    var docW = doc.width;
    var docH = doc.height; 
    var activeAB = doc.artboards[doc.artboards.getActiveArtboardIndex()]; // get active AB 
    
    for(var i = textRef.length-1; i>-1; i--){ 
        if ((textRef[i].selected = true) && (textRef[i].width > doc.width)){
            docLeft = activeAB.artboardRect[0];  
            docTop = activeAB.artboardRect[1];   
            
            // get selection bounds  
            var sel = doc.selection[0];  
            var selVB = sel.visibleBounds;  
            var selVisibleW = selVB[2]-selVB[0];  
            var selVisibleH = selVB[1]-selVB[3];  
            
            var selGB = sel.geometricBounds;  
            var selGeoW = selGB[2]-selGB[0];  
            var selGeoH = selGB[1]-selGB[3];  
            
            // get the difference between Visible & Geometric Bounds  
            var deltaX = selVisibleW-selGeoW;  
            var deltaY = selVisibleH-selGeoH; 
            var padding = 20
            
            sel.width = docW-deltaX - padding; // width is Geometric width, so we need to make it smaller...to accomodate the visible portion.  
            //sel.height = docH-deltaY;  
            //sel.top = docTop; // Top is actually Visible top  
            sel.left = docLeft + (.5 * padding); // dito for Left  
            
            } else {  
                //alert("No text objects");  
                continue;
                }
            }
        app.redraw();
        }
/*=========================
kernCheck() => Must use Auto Kern
==========================*/
function kernCheck(){
    app.executeMenuCommand ('deselectall')
    var doc = app.activeDocument
    var kernNew = AutoKernType.AUTO
    var textRef = doc.textFrames;  
    
    for(var i = textRef.length-1; i>-1; i--){   
        if((textRef[i].selected = true) && (textRef[i].textRange.characterAttributes.kerningMethod != kernNew)){
            oldTextWidth = textRef[i].width
            oldTextHeight = textRef[i].height
            oldPos = textRef[i].position

            //alert ("width: " + textRef[i].width)
            //alert ("height: " + textRef[i].height)
            //alert("kerning: " + textRef[i].textRange.characterAttributes.kerningMethod)
            
            textRef[i].textRange.characterAttributes.kerningMethod = kernNew
            textRef[i].width = oldTextWidth 
            textRef[i].height = oldTextHeight
            textRef[i].position = oldPos
            
            } else {  
            //alert("No text objects");  
            continue;
            }
        }
    }
/*=========================
renameActiveLayer(newName)
==========================*/
function renameActiveLayer(newName){
     var doc = app.activeDocument;
     doc.activeLayer.name = newName
     }

/*=========================
idObjects()
==========================*/ 
function idObjects(){
    var doc = app.activeDocument;  
    count = 1
    doc.selection=null
    
    for(i=doc.pathItems.length -1; i > -1; i--){
        if(doc.pathItems[i].name.match('Mascot')){
            //alert ("name:"+doc.pathItems[i].name)
            doc.pathItems[i].selected = false;
            }
        else if(doc.pathItems[i].name.match('skip')){
            doc.pathItems[i].name = 'skip_Object' + [count++]
            doc.pathItems[i].selected = false;
            }
        else{
           doc.pathItems[i].selected = true;
            }
        }
    for(x=doc.selection.length -1; x > -1; x--){
        doc.selection[x].name= 'Object' + [count++]
        }
    }
/*=========================
idLine()
==========================*/ 
function idLine(){
    var doc = app.activeDocument;  
    var group=doc.groupItems
    var count = 1
    
    for(i=group.length -1; i > -1; i--){
        if (!group[i].name.match ('Mascot')){
            group[i].name = 'Line' + [count++]
            }
        for(x=group[i].textFrames.length -1; x > -1; x--){
            if(group[i].textFrames[x].name.match ('skip')){
                group[i].textFrames[x].name = 'skip_' + group[i].name
                }
            else{
                group[i].textFrames[x].name = group[i].name
                }
            }
        }
    }
/*=========================
idMascot()
==========================*/ 
function idMascot(){
    var doc = app.activeDocument; 
    spotColorGeneral (230, 0, 255, 'Mascot');
    
    for(i=doc.groupItems.length -1; i > -1; i--){
        if(doc.groupItems[i].name.match ('Mascot')){
            var mascot = doc.groupItems[i]
            mascot.selected = true; 
            app.defaultFilled = true;
            
            if(mascot.height > mascot.width){
                var rect = doc.pathItems.rectangle( mascot.position[1], mascot.position[0], mascot.width, mascot.height);
                scale = mascot.height/mascot.width*100
                rect.resize(scale, 99.9);
                }
            
            if(mascot.height < mascot.width){
                var rect = doc.pathItems.rectangle( mascot.position[1], mascot.position[0], mascot.width, mascot.height);
                scale = mascot.width/mascot.height*100
                rect.resize(99.9,scale);
                }
            rect.move(mascot,ElementPlacement.PLACEBEFORE);
            rect.name = 'Mascot'
            mascot.remove();
            rect.selected = true;
            var mascotColor = doc.swatches.getByName(rect.name).color; 
            doc.defaultFillColor = mascotColor;
            app.executeMenuCommand("Find Fill Color menu item");
            }
        }
    }
/*===============================
groupActiveColors()
================================*/
function groupActiveColors(){
    var doc = app.activeDocument;
    doc.selection = null; 
    doc.defaultStroked = false;
    doc.defaultFilled = false; 
    var count = 1
    
    if (doc.spots.length >1) {
        var colorgroup = doc.swatchGroups.add();
        colorgroup.name = 'ActiveColors';
        for (i=doc.spots.length -1; i > -1; i--){
            if(!doc.spots[i].name.match ('Registration')){
                colorgroup.addSpot(doc.spots[i]);
                doc.spots[i].name = 'Color' + [count++]
                }
            }
        }
    }

function test(){
    var doc = app.activeDocument
    doc.selection = null; 
    doc.defaultStroked = false;
    doc.defaultFilled = false; 
    doc.swatchGroups.removeAll();
    app.executeMenuCommand('selectall');
    app.doScript ('Add Selected Colors', 'PV Actions')
    var counter = 1
    //$.write (doc.swatches.length + '\n')
   for (i=doc.swatches.length -1; i > -1; i--) {
        //$.write (doc.swatches + '\n')
        doc.swatches[i].name = 'Color' + [counter++] 
        }
    var colorgroup = doc.swatchGroups.add();
    colorgroup.name = 'ActiveColors';
    for (i=doc.spots.length -1; i > -1; i--){
        if(!doc.spots[i].name.match ('Registration')){
            colorgroup.addSpot(doc.spots[i]);
            }
        }
    doc.selection = null;
    }














