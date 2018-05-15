'use strict';
const fetch = require('node-fetch');

const Headers = fetch.Headers;
let githubToken = null;

/**
 * @param	{} token
 */
exports.setToken = function(token) {
  if (token === undefined || token === null) {
    return 'token is blank';
  }
  githubToken = token;
  return '';
};
/**
 */
exports.getToken = function() {
  return githubToken;
};
/**
 */
exports.clearToken = function() {
  githubToken = '';
  return githubToken;
};
/**
 * @param  {} repoName
 * @param  {} repoOwner
 * @param  {} issueTitle
 * @param  {} issueBody
 */
async function createIssue(
  repoName = '',
  repoOwner = '',
  issueTitle = '',
  issueBody = ''
) {
  let object = {
    status: '',
    url: '',
    extra: ''
  };

  if (
    exports.getToken() === undefined ||
    exports.getToken() === null ||
    exports.getToken() === ''
  ) {
    return 'Token not set';
  }
  // Check that a value reponame is given
  if (repoName === undefined || repoName === null) {
    return 'No repo name given';
  }

  // Check that a value repo owner is given
  if (repoOwner === undefined || repoOwner === null) {
    return 'No repo owner given';
  }

  // Check that a value issue title is given
  if (issueTitle === undefined || issueTitle === null) {
    return 'No issue title given';
  }

  // Check that a value issue body is given
  if (issueBody === undefined || issueBody === null) {
    return 'No issue body given';
  }

  const URL = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`;

  var githubResponse = await fetch(URL, {
    method: 'POST',
    headers: new Headers({
      Authorization: `token ${exports.getToken()}`
    }),
    body: JSON.stringify({
      title: issueTitle,
      body: issueBody
    })
  })
    .then(res => {
      object.status = res.statusText;
      return Promise.resolve(res);
    })
    .then(json => {
      object.url = json.url;
      return Promise.resolve(object);
    })
    .catch(err => {
      object.status = 'error';
      object.url = '';
      object.err = err;
      return Promise.reject(object);
    });

  return githubResponse;
}

exports.createIssue = createIssue;
