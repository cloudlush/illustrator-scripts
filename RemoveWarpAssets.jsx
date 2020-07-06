
//Remove "_iMap and _ArchH" from file for correct tagging in the CMS.


#target illustrator

doneFolder = Folder("~/Desktop/Done");

main();
  
function main() { 
    //var topLevel = Folder("~/Desktop/Convert");
    var topLevel = Folder.selectDialog( 'Select the folder with Illustrator .ai fileList you want to convert to PDF' ); 
    
    if ( topLevel != null ) {   
        processDocs( recursiveFolders( topLevel, /\.ai$/i ));  
        };
    };

function processDocs( aiFiles, opts ) {  
    var i, baseName, doc, saveFile;  
    for ( i = 0; i < aiFiles.length; i++ ) {  
        doc = app.open( aiFiles[i] );  
        
        removeWarpAssets()

        doc.saveAs(File(doneFolder + "/" + doc.name));
        //doc.close( SaveOptions.DONOTSAVECHANGES );
        }
    }

alert ("All Done!!!")

/*===============================
removeWarpAssets()
================================*/
function removeWarpAssets(){
    var doc= app.activeDocument;  
    doc.selection = null;

        for(i = doc.pageItems.length -1; i >= 0; i--){
        thisItem = doc.pageItems[i];

        if(thisItem.name.match("_")){
            thisItem.selected = true;
            thisItem.remove();

            }
        }
    }

/*===============================
Recursion Folder
================================*/
function recursiveFolders(fold, regex) {
   var fileList = []; // Our matching files…  
   getFiles(fold, regex, fileList)
   return fileList;
}

function getFiles(fold, regex, filesForConversion) {
   var i, temp;
   temp = Folder(fold).getFiles(); // All files and folders…  

   for (i = 0; i < temp.length; i++) {
      if (temp[i] instanceof File && RegExp(regex).test(temp[i].fsName)) {
         filesForConversion.push(temp[i]);
      }
      if (temp[i] instanceof Folder) {
         getFiles(temp[i].fsName, regex, filesForConversion);
      }
   }
   return filesForConversion;
}
