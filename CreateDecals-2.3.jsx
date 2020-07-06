/*=========================
 * Author: Lan Nguyen
 * Usage: This script is to export PNG files for Vignette Decals
 
 Note: Make sure the symbols are expanded
==========================*/

#target illustrator
decalGenerator()
 
function decalGenerator(){
    var doc= app.activeDocument; 
    
     if (doc.symbols.length > 0){
        alert ("Hey You! Yes You! Expand your symbols or I will blow up your computer!")
        return
        } else {

        //var styleName = prompt('Enter the Style Name: ');
        var zoneNumber = prompt('Enter the Zone Number: ');
        var decal = '__abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
        
        unlockAll()
        app.executeMenuCommand("showAll");
        //renameArtBoards(styleName)
        removeSymbols()
        doc.selection = null;
        
        //$.writeln('Decal: ' + decal[zoneNumber]);
        selDecal(decal[zoneNumber]);   
        //$.writeln('Zone: ' + zoneNumber);
        selectColor(zoneNumber);
        blackOut();
        removeDefault (); 
        exportPNG(zoneNumber);
        app.executeMenuCommand ("showAll");
        alert ('All Done!!!')
        }
    }

function renameArtBoards(newName){
    var doc= app.activeDocument; 
    
    for(var i=doc.artboards.length -1; i > -1; i--){
        //$.write (doc.artboards[i].name);
        if (doc.artboards[i].name.match('BLANK')){
            doc.artboards[i].active
            var oldName = doc.artboards[i].name
            doc.artboards[i].name = oldName.replace("BLANK", newName)
            }
        }
    }

function removeSymbols(){
    var doc= app.activeDocument; 
      
    for(var i=doc.symbols.length -1; i > -1; i--){
        if(doc.symbols.length > 0){
            app.executeMenuCommand("selectall");
            app.executeMenuCommand("Expand3");
            app.doScript('Delete Swatches', 'PV Actions');  
            }
        }
    }
            
function removeDefault(){
    var doc= app.activeDocument; 
    
    for(var i=doc.artboards.length -1; i > -1; i--){
        //$.write (doc.artboards[i].name);
        if (doc.artboards[i].name.match('Default')){
            doc.artboards.setActiveArtboardIndex(i);
            doc.selectObjectsOnActiveArtboard()
            app.executeMenuCommand("clear");
            doc.artboards[i].remove();
            }
        }
    }

function selDecal(decal){
    var doc= app.activeDocument;  
    doc.selection = null;

        for(var i=doc.groupItems.length -1; i > -1; i--){
        thisGroup = doc.groupItems[i];
        if(thisGroup.name== decal){
            thisGroup.selected = true;
            }
        }
    app.executeMenuCommand("cut");        
    app.executeMenuCommand ("selectall");        
    app.executeMenuCommand ("hide");        
    doc.layers.add()
    app.executeMenuCommand ("pasteFront");  
    }

function selectColor(num){
    var doc= app.activeDocument;  
    doc.selection = null;
    
    for(var i=0; i<doc.swatches.length; i++){
        var iswatch = doc.swatches[i];
        if (iswatch.name.match('Zone ' + num)){
            doc.defaultFillColor = iswatch.color;        
            app.executeMenuCommand("Find Fill Color menu item");  
            }
        }
    }

function blackOut(){
    var doc = app.activeDocument;  
    var rgbCol = new RGBColor();  
    
    rgbCol.red = 0;  
    rgbCol.green = 0;  
    rgbCol.blue = 0;  
    
    doc.defaultFillColor = rgbCol;  
    doc.selection = null;   
    }

function exportPNG(num){
    var doc = app.activeDocument;//Gets the active document
    var fileName = doc.name.slice(0, -3)//remove {.ai};
    var numArtboards = doc.artboards.length;//returns the number of artboards in the document
    var filePath = (app.activeDocument.fullName.parent.fsName).toString().replace(/\\/g, '/');
    var zone = '_abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    //$.writeln(zone[num-1])
    //$.writeln("fleName= ",fileName)
    //$.writeln("numArtboards= ",numArtboards)
    //$.writeln("filePath= ",filePath);
    
    var options = new ExportOptionsPNG24();
    
    for (var i = 0; i < numArtboards; i++ ) {
        doc.artboards.setActiveArtboardIndex( i ); 
        
        options.artBoardClipping = true;  
        options.matte = false;  
        options.horizontalScale = 100;
        options.verticalScale = 100;  
        options.transparency = true;  
        
        var artboardName = doc.artboards[i].name;
        $.writeln("artboardName= ", artboardName);
        var destFile = new File(filePath + "/" + fileName + artboardName + (zone[num-1]) + ".png");
        //$.writeln("destFile= ",destFile);
        doc.exportFile(destFile,ExportType.PNG24,options);
        }
    }     

function unlockAll(){  

var actionString = [  
'/version 3',
'/name [ 9',
'556e6c6f636b416c6c', //UnlockAll
']',
'/isOpen 1',
'/actionCount 1',
'/action-1 {',
'/name [ 6',
'756e6c6f636b', //unlock
']',
'/keyIndex 0',
'/colorIndex 0',
'/isOpen 1',
'/eventCount 1',
'/event-1 {',
'/useRulersIn1stQuadrant 0',
'/internalName (ai_plugin_Layer)',
'/localizedName [ 5',
'4c61796572', //Layer
']',
'/isOpen 1',
'/isOn 1',
'/hasDialog 0',
'/parameterCount 3',
'/parameter-1 {',
'/key 1836411236',
'/showInPalette -1',
'/type (integer)',
'/value 9',
'}',
'/parameter-2 {',
'/key 1937008996',
'/showInPalette -1',
'/type (integer)',
'/value 22',
'}',
'/parameter-3 {',
'/key 1851878757',
'/showInPalette -1',
'/type (ustring)',
'/value [ 17',
'556e6c6f636b20416c6c204c6179657273', //Unlock All Layers
']',
'}',
'}',
'}',

].join('\n');   

var actionFileDestStr = Folder.desktop + "/UnlockAll.aia";  
var newFile = File(actionFileDestStr);   

newFile.open('w');   
newFile.write(actionString); 
newFile.close();   

app.loadAction(newFile);   
app.doScript("unlock", "UnlockAll");  
newFile.remove();  
app.unloadAction("UnlockAll", ''); 
}
