





readInCSV()

function readInCSV(){
    var file = File.openDialog('Select a CSV File','comma-separated-values(*.csv):*.csv;');
    var fileArray = [];
    file.open('r');
    file.seek(0, 0);
    while(!file.eof){
        var thisLine = file.readln();
        var csvArray = thisLine.split(',');
        fileArray.push(csvArray);
     }
     file.close();

     return fileArray.toString;
     var zzz= fileArray.indexOf("BLAZE", 0);
     


             
             
         }     
     
 



function validColors(colorArray){
    var doc = app.activeDocument
    for(i=0; i > doc.spots.length; i++){
        if(doc.spots.name.match (colorArray)){
            
            }
        }
    }

