/**SMS CLOUD SERVICE PROTOTYPE
*by William Poirier
*October 20, 2017
*Created for the Startup Institute October Hackathon for OperationCode.com
*
*This service pulls information from the Operation Code meetup page and pushes the information from the boston operation code meetup.com page to a subscriber
*
*To subscribe, have the user send a text message to the email address associated with the gmail account running this code
*
*To run, load this code into the Google script editor and run the function "sendNotification"
*/

function sendNotification(){
  data = jsonMeetupCall();
  numbers = getPhoneNumber();
  for (i = 0; i<numbers.length; i++){
    //Logger.log(numbers[i] + i);
   var venu = data[0].venue;
   MailApp.sendEmail(numbers[i], "event info", "The next event is at " + venu.name + " " + venu.address_1 + " " + venu.city + " " + venu.state);
  }
}

function getPhoneNumber() {
  var numbers = [];
  var n = -1;
  var threads = GmailApp.getInboxThreads(0,1);
  for (i = 0; i<threads.length; i++){
    var message = threads[i].getMessages()[0]; // Get message
    var regExp = new RegExp("[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]@vzwpix.com");
    //var regExp = new RegExp("[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]@mms.att.net");
    //regExp = new RegExp("[0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}")
    var recipient = regExp.exec(message.getFrom());
    Logger.log("recipt: " + message.getFrom() + "\n regexed:" + recipient + "\n\n"); // Log from address of the message
    if (recipient !== null ) {
      n++;
      numbers[n] = recipient;
    }
  }
  Logger.log(numbers);
  return numbers;
}

function jsonMeetupCall(){
  json_response = UrlFetchApp.fetch("https://api.meetup.com/Operation-Code-Boston/events?photo-host=public&page=1&sig_id=231456939&sig=9407440279eb83e5f426ffe4767f59aa0f26453b");
  json_raw = json_response.getContentText();
  data = JSON.parse(json_raw);
  var venu = data[0].venue
  Logger.log(venu.name + " " + venu.address_1 + " " + venu.city + " " + venu.state);
  return data;
}

function addNumberToDatabase(){
//to be implemented. For now the app just scans an email address  
}
