'use strict';

/**
 * Fire a json XMLHttpRequest.
 *
 * @param {string} method - HTTP methods. e.g. 'GET', 'HEAD', 'POST', 'PUT', 'DELET'... etc.
 * @param {string} url - The endpoint of your request.
 * @returns {Promise}
 */
function XHRequest(method, url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function(e) {
      if (this.readyState === 4 && this.status === 200) {
        var listData = this.response;
        // The flow ends here.
        resolve(listData);
      } else if (this.status !== 200 ){
        reject(this);
      }
    };
    xhr.send();
  });
}
