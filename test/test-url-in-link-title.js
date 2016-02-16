const {url, runTests} = require("./testutils");

exports["test doc urlInLinkTitle"] = function testHTTPLinks(assert, done) {
  const tests = [
    {
      str: '<a href="http://somesite.com">Test</a>' +
           '<a href="/some/path">Test</a>' +
           '<a href="http://somesite.com" title="http://somesite.com">Test</a>' +
           '<a href="http://somesite.com" title="somesite.com">Test</a>' +
           '<a href="/some/path" title="/some/path">Test</a>' +
           '<a href="/en-US/docs/some/mdn/path" title="/en/docs/some/mdn/path">Test</a>',
      expected: [
        '<a href="http://somesite.com" title="http://somesite.com">Test</a>',
        '<a href="http://somesite.com" title="somesite.com">Test</a>',
        '<a href="/some/path" title="/some/path">Test</a>',
        '<a href="/en-US/docs/some/mdn/path" title="/en/docs/some/mdn/path">Test</a>'
      ]
    }
  ];

  runTests(assert, done, "urlInLinkTitle", "URL in 'title' attribute of link", url, tests);
};

require("sdk/test").run(exports);