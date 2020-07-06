//https://forums.adobe.com/message/1937614#1937614
var doc = app.activeDocument
fileName = doc.name

filePath= doc.fullName.parent.fsName + "\u005c" 
$.write("file path: " + filePath + "\n") 

charCount = filePath.length
$.write("number: " + charCount +"\n")

hexcode = filePath.hexEncode();
$.write("hexcode: " + hexcode+"\n")

saveAsPv(charCount , hexcode);

//doc.close( SaveOptions.DONOTSAVECHANGES );
    
/*===============================
Hex Encode
================================*/

String.prototype.hexEncode = function(){
    var hex, i;
    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += (""+hex).slice(-4);
        }
    return result
    }

/*===============================
saveAsPv()
================================*/
function saveAsPv(NOTE_VALUE1, NOTE_VALUE2){
    function writeFile(fileDestStr, contents){   
        var newFile = File(fileDestStr);   
        newFile.open('w');   
        newFile.write(contents);   
        newFile.close();   
        }
  
var actionString = [
'/version 3',
'/name [ 10',
'436f6e76657274205056', //Convert PV
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
'/value [ PUT_NOTE_VALUE_CHAR_LENGTH_HERE',
'/PUT_HEX_NOTE_VALUE_HERE', 
' ]',
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
'5056',
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
var actionFileDestStr = Folder.desktop + "/Convert PV.aia";  
writeFile(actionFileDestStr, actionString.replace("PUT_NOTE_VALUE_CHAR_LENGTH_HERE", NOTE_VALUE1).replace("PUT_HEX_NOTE_VALUE_HERE", NOTE_VALUE2));   
var actionFile = File(actionFileDestStr);   
app.loadAction(actionFile);   
app.doScript("Export PV", "Convert PV");  
//clean up   
actionFile.remove();  
app.unloadAction("Convert PV", '');
}