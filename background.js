// Maps tabId to the number of tries
var tried = {};

/* 
 * Checks the URL, if on UCLA authentication page and have not yet tried 5 times, enter the login info and submits
 */
function checkForValidUrl(tabId, changeInfo, tab) {

  // Initializing tried[tabId]
  if (tried[tabId] === undefined) {
    tried[tabId] = 0;
  }
  if(tab.url.indexOf('https://shb.ais.ucla.edu/shibboleth-idp/ucla/authn?') > -1 && tried[tabId] < 5) {
    // Increment tried[tabId] so that auto login is limited to 5 tries 
    tried[tabId]++;
    console.log('in if of background.js');
    chrome.tabs.executeScript(
      null, {code:"if(document.getElementById('logon').value==''){document.getElementById('logon').value='"+localStorage["user"]+"';document.getElementById('pass').value='"+sjcl.decrypt("javascript",localStorage["pass"])+"';document.forms.item(0).submit();}"});
    chrome.pageAction.show(tabId);
  }
};

/* 
 * Upon receiving message of updating ID and password, empty tried map to allow auto login again
 */
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.updated == true){
      tried = {};
      console.log("tried reset on background");
      sendResponse({output: "tried reset successfully"});
    }
  });

// Listens for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
