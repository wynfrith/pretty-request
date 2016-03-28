var r = require('request');
var Promise = require("bluebird");
var co = require('co');
var url = require('url');
var iconv = require('iconv-lite');
var requestDebug = require('request-debug');


function prettyRequest(uri, options) {
  options = options || {};

  var host = url.parse(uri).protocol +'//' +url.parse(uri).host;
  options.jar = r.jar();
  for (var key in options.cookies) {
    ck = r.cookie(key + '=' + options.cookies[key]);
    options.jar.setCookie(ck, host);
  }

  if (options.debug) requestDebug(r);
  if (options.decode) options.encoding = null; //return buffer
  if (!options.followRedirect) options.followRedirect = false;

  return new Promise(function (resolve, reject) {

    r(uri, options, function (err, response, body) {
      if (err) reject(err);

      var cookies = {};
      options.jar.getCookies(host).forEach(function (cookie) {
        cookie = cookie.toString();
        var kv =cookie.substring(cookie.indexOf('"'), cookie.indexOf(';'));
        cookies[kv.split('=')[0]] = kv.split('=')[1];
      });

      if(options.debug) r.stopDebugging();

      resolve({
        statusCode: response.statusCode,
        statusMessage: response.statusMessage,
        headers: response.headers,
        cookies: cookies,
        body: options.decode ?  iconv.decode(body, options.decode) : body,
        get raw() {
          return response;
        }
      });
    })

  })
}

function verbFunc (verb) {
  var method = verb === 'del' ? 'DELETE' : verb.toUpperCase();
  return function (uri, options) {
    options = options || {};
    options.method = method;
    return prettyRequest(uri, options);
  }
}

prettyRequest.get = verbFunc('get');
prettyRequest.head = verbFunc('head');
prettyRequest.post = verbFunc('post');
prettyRequest.put = verbFunc('put');
prettyRequest.patch = verbFunc('patch');




module.exports = prettyRequest;

