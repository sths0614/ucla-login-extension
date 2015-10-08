/*
 * Watchdog to check for a UCLA login page.
 */
function checkForValidUrl(tabId, changeInfo, tab) {
  // Page type 1
  if(tab.url.indexOf('https://auth.ucla.edu/index.php') > -1) {
  	chrome.tabs.executeScript(
      null, {code:"if(document.getElementsByTagName('input').item(0).value==''){document.getElementsByTagName('input').item(0).value='"+localStorage["user"]+"';document.getElementsByTagName('input').item(1).value='"+sjcl.decrypt("javascript",localStorage["pass"])+"';document.forms.item(0).submit();}"});
    chrome.pageAction.show(tabId);
  }
  // Page type 2
  if (tab.url.indexOf('https://netaccess.logon.ucla.edu/cgi-bin/login') > -1
    || tab.url.indexOf('https://wlanc.resnet.ucla.edu/cgi-bin/login') > -1) {

  	chrome.tabs.executeScript(
      null, {code:"if(document.getElementsByTagName('input')!=null){document.getElementsByTagName('input').item(1).value='"+localStorage["user"]+"';document.getElementsByTagName('input').item(2).value='"+sjcl.decrypt("javascript",localStorage["pass"])+"';document.forms.item(0).submit();}else{document.getElementsByTagName('a').item(0).click();}"});
    chrome.pageAction.show(tabId);
  }
};

/*
 * Listen for any changes to the URL of any tab.
 */
chrome.tabs.onUpdated.addListener(checkForValidUrl);
