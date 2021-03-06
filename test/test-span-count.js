const {url, runTests} = require("./testutils");

exports["test doc spanCount"] = function testSpanElements(assert, done) {
  const tests = [
    {
      str: '<span>what?</span>' +
           '<p>nope</p>' +
           '<span class="foo" style="font:10px">bar</span>' +
           '<span><dt>foobar</dt></span>' +
           '<span class="seoSummary">seoseoseo</span>',
      expected: [
        '<span>what?</span>',
        '<span class="foo" style="font:10px">bar</span>',
        '<span><dt>foobar</dt></span>'
      ]
    }
  ];

  runTests(assert, done, "spanCount", "<span>", url, tests);
};

require("sdk/test").run(exports);