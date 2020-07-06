//Make sure you have 'Scale Stroke & Effects" unchecked in Illustrator before running.

checkFile()
/*===============================
checkFile()
================================*/
function checkFile(){
    var doc= app.activeDocument;  
    if (doc.selected != doc.groupItems){
            app.executeMenuCommand("group");
            }
        importIcon();
        doc.fitArtboardToSelectedArt(0);
        app.redraw();
        }
/*===============================
importIcon()
================================*/     
function importIcon(){
    var doc= app.activeDocument;  
    docSelected = doc.selection
    
    if ( docSelected.length > 0 ){
        var newDocSet = new DocumentPreset;  
        newDocSet.title = doc.name  
        newDocSet.width = (1000);  
        newDocSet.height = (1000);  
        newDocSet.colorMode = DocumentColorSpace.RGB;  
        
        var newDoc = app.documents.addDocument(DocumentColorSpace.RGB, newDocSet);  
        newDoc.rasterEffectSettings.resolution = 72;
        for ( i = 0; i < docSelected.length; i++ ){
            newItem = docSelected[i].duplicate( newDoc, ElementPlacement.INSIDE );
            resizeArt();
            }
        } 
    else {
        alert( "Please select one or more art objects" );
        return;
        }
    app.redraw();
    }
/*===============================
resizeArt() //https://gist.github.com/ruandre/7b47cbf2a4c55dac9adb
================================*/ 
function resizeArt(){
    app.executeMenuCommand("selectall");
    var doc = app.activeDocument,
    selection = doc.selection;
    if (selection.length > 0){
        for (n = 0; n < selection.length; n++){
            var item = selection[n]
            
            abActive = doc.artboards[ doc.artboards.getActiveArtboardIndex() ],
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
        // alert(item.width);
        item.width = props.width - diff.deltaX;
        
        // Scale height using ratio from width:
        var ratioW = item.width / oldWidth;
        item.height = oldHeight * ratioW;
        
    } else{
        // alert(item.height);
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
