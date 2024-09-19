function doGet(e) {
    var action = e.parameter.action;
  
    switch(action) {
      case "Read":
        return Read(e);
      // Outras ações...
      default:
        return ContentService.createTextOutput("Invalid action").setMimeType(ContentService.MimeType.TEXT);
    }
  }
  
  function Read(e) {
    var sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/13uxVghXgOGUI-_LQMRfAkN7jCEuCzOCY1EcuhwCGNdw/edit#gid=0').getSheetByName('Página1');
    var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  
    var data = rows.map(function(row) {
      return {
        'nome': row[0],
        'date': row[1],
        'datetime': row[2],
        'lat': row[3],
        'lon': row[4],
        'registro': row[5],
        'distance': row[6]
      };
    });
  
    var result = JSON.stringify(data);
    return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
  }
  