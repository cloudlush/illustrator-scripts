

function saveAsAi(NOTE_VALUE1, NOTE_VALUE2){
    
    String.prototype.hexEncode = function() {   
        //http://stackoverflow.com/questions/21647928/javascript-unicode-string-to-hex   
        var hex = '';   
        for(var i=0;i<this.length;i++) {  
            hex += ''+this.charCodeAt(i).toString(16);   
            }
        return hex;   
        }
    
    function writeFile(fileDestStr, contents){   
        var newFile = File(fileDestStr);   
        newFile.open('w');   
        newFile.write(contents);   
        newFile.close();   
        }
  
var actionString = [

'/version 3',
'/name [ 10',
'436f6e76657274204149', //Convert AI
']',
'/isOpen 1',
'/actionCount 1',
'/action-1 {',
'/name [ 9',
'536176654173204149', //SaveAs AI
']',
'/keyIndex 0',
'/colorIndex 0',
'/isOpen 1',
'/eventCount 1',
'/event-1 {',
'/useRulersIn1stQuadrant 0',
'/internalName (adobe_saveDocumentAs)',
'/localizedName [ 7',
'53617665204173', //Save As
']',
'/isOpen 1',
'/isOn 1',
'/hasDialog 1',
'/showDialog 0',
'/parameterCount 11',
'/parameter-1 {',
'/key 1668116594',
'/showInPalette -1',
'/type (boolean)',
'/value 1',
'}',
'/parameter-2 {',
'/key 1885627936',
'/showInPalette -1',
'/type (boolean)',
'/value 1',
'}',
'/parameter-3 {',
'/key 1668445298',
'/showInPalette -1',
'/type (integer)',
'/value 17',
'}',
'/parameter-4 {',
'/key 1702392878',
'/showInPalette -1',
'/type (integer)',
'/value 1',
'}',
'/parameter-5 {',
'/key 1768842092',
'/showInPalette -1',
'/type (integer)',
'/value 0',
'}',
'/parameter-6 {',
'/key 1918989423',
'/showInPalette -1',
'/type (real)',
'/value 100.0',
'}',
'/parameter-7 {',
'/key 1886545516',
'/showInPalette -1',
'/type (integer)',
'/value 0',
'}',
'/parameter-8 {',
'/key 1936548194',
'/showInPalette -1',
'/type (boolean)',
'/value 0',
'}',
'/parameter-9 {',
'/key 1851878757',
'/showInPalette -1',
'/type (ustring)',
'/value [ PUT_NOTE_VALUE_CHAR_LENGTH_HERE',
'/PUT_HEX_NOTE_VALUE_HERE', 
']',
'}',
'/parameter-10 {',
'/key 1718775156',
'/showInPalette -1',
'/type (ustring)',
'/value [ 35',
'41646f626520496c6c7573747261746f7220416e7920466f726d617420577269746572', //Adobe Illustrator Any Format Writer
']',
'}',
'/parameter-11 {',
'/key 1702392942',
'/showInPalette -1',
'/type (ustring)',
'/value [ 6',
'61692c616974', //ai,ait
']',
'}',
'}',
'}',

].join('\n');   

if(app.documents.length == 0){   
    return;   
    } 

var actionFileDestStr = Folder.desktop + "/SaveAs AI.aia";  

writeFile(actionFileDestStr, actionString.replace("PUT_NOTE_VALUE_CHAR_LENGTH_HERE", NOTE_VALUE1).replace("PUT_HEX_NOTE_VALUE_HERE", NOTE_VALUE2));   
var actionFile = File(actionFileDestStr);   
app.loadAction(actionFile);   
app.doScript("SaveAs AI", "Convert AI");  

//clean up   
//actionFile.remove();  
//app.unloadAction("Test", ''); // thanks qwertyfly!  
}
