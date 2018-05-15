const githubIssueLogger = require('..');

describe('Setup Tests', () => {
  it('Set & Get Token', () => {
    expect.assertions(1);
    githubIssueLogger.setToken(githubPersonalToken);
    return expect(githubIssueLogger.getToken()).toEqual(
      githubPersonalToken
    );
  });
  it('Clear Token', () => {
    expect.assertions(1);
    githubIssueLogger.clearToken();
    return expect(githubIssueLogger.getToken()).toEqual('');
  });
});

describe('Issues tests', () => {
  it('Create an issue', () => {
    expect.assertions(1);
    githubIssueLogger.setToken(githubPersonalToken);

    const repoName = 'app-seo-checks';
    const repoOwner = 'robertjgabriel';
    const issueTitle = 'Issue created with github-issue-logger';
    const issueBody = 'Issue created with github-issue-logger';

    return githubIssueLogger
      .createIssue(repoName, repoOwner, issueTitle, issueBody)
      .then(data => {
        expect(data).toEqual({
          extra: '',
          status: 'Created',
          url: 'https://api.github.com/repos/robertjgabriel/app-seo-checks/issues'
        });
      });
  });

  it('Fail to create an issue', () => {
    expect.assertions(1);
    githubIssueLogger.setToken(githubPersonalToken);

    const repoName = 'app-seo-checka';
    const repoOwner = 'robertjgabriel';
    const issueTitle = 'Issue created with github-issue-logger';
    const issueBody = 'Issue created with github-issue-logger';

    return githubIssueLogger
      .createIssue(repoName, repoOwner, issueTitle, issueBody)
      .then(data => {
        expect(data).toEqual({
          extra: '',
          status: 'Not Found',
          url: 'https://api.github.com/repos/robertjgabriel/app-seo-checka/issues'
        });
      });
  });
});

describe('Create an issue tests', () => {
  it('No token set', () => {
    expect.assertions(1);
    githubIssueLogger.clearToken();

    const repoName = 'app-seo-checks';
    const repoOwner = 'robertjgabriel';
    const issueTitle = 'Issue created with github-issue-logger';
    const issueBody = 'Issue created with github-issue-logger';

    return githubIssueLogger
      .createIssue(repoName, repoOwner, issueTitle, issueBody)
      .then(data => {
        expect(data).toEqual('Token not set');
      });
  });

  it('No repo name set', () => {
    expect.assertions(1);
    githubIssueLogger.setToken(githubPersonalToken);

    const repoOwner = 'robertjgabriel';
    const issueTitle = 'Issue created with github-issue-logger';
    const issueBody = 'Issue created with github-issue-logger';

    return githubIssueLogger
      .createIssue(null, repoOwner, issueTitle, issueBody)
      .then(data => {
        expect(data).toEqual('No repo name given');
      });
  });

  it('No repo owner set', () => {
    expect.assertions(1);
    githubIssueLogger.setToken(githubPersonalToken);

    const repoName = 'app-seo-checks';
    const issueTitle = 'Issue created with github-issue-logger';
    const issueBody = 'Issue created with github-issue-logger';

    return githubIssueLogger
      .createIssue(repoName, null, issueTitle, issueBody)
      .then(data => {
        expect(data).toEqual('No repo owner given');
      });
  });

  it('No issue title set', () => {
    expect.assertions(1);
    githubIssueLogger.setToken(githubPersonalToken);

    const repoName = 'app-seo-checks';
    const repoOwner = 'robertjgabriel';
    const issueBody = 'Issue created with github-issue-logger';

    return githubIssueLogger
      .createIssue(repoName, repoOwner, null, issueBody)
      .then(data => {
        expect(data).toEqual('No issue title given');
      });
  });

  it('No issue body set', () => {
    expect.assertions(1);
    githubIssueLogger.setToken(githubPersonalToken);

    const repoName = 'app-seo-checks';
    const repoOwner = 'robertjgabriel';
    const issueTitle = 'Issue created with github-issue-logger';

    return githubIssueLogger
      .createIssue(repoName, repoOwner, issueTitle, null)
      .then(data => {
        expect(data).toEqual('No issue body given');
      });
  });
});
