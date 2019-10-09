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
    
    return fileArray;
    //return fileArray[20][1]
    }