function dueDateMail() {
  var today = new Date().toLocaleDateString();  //This is today's date without time

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1");
  var startRow = 203;  // First row of data to process
  var numRows = 999;   // Number of rows to process
  // Fetch the range of cells A2:B999
  var dataRange = sheet.getRange(startRow, 1, numRows, 999)
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    if(data[i][2] != ""){
      var emailAddress = data[i][2];  // Third column should contain the user's email address
      var label = data[i][3];
      var subject = "IT Alert: You have not returned " + label; //Fourth column should be the loaned out object name, this will be the subject
      var message = "Please return " + label + " as soon as possible."; //The message of the email   
      var dueDate = data[i][4].toLocaleDateString();  // date specified in cell F
      var status = data[i][8];
      if ((dueDate <= today)&&(status != "Returned")){
        MailApp.sendEmail(emailAddress, subject, message);
      
      }
    }
    
  }
}
