const {url, runTests} = require("./testutils");

exports["test doc preWithoutClass"] = function testPresWithoutClass(assert, done) {
  const tests = [
    {
      str: '<pre class="brush: js"></pre>' +
           '<pre>foobar;</pre>' +
           '<pre class="syntaxbox"></pre>' +
           '<pre id="foo"></pre>' +
           '<pre class="">foo</pre>' +
           '<pre> \n\r foo</pre>',
      expected: [
        '<pre>foobar;</pre>',
        '<pre id="foo"></pre>',
        '<pre class="">foo</pre>',
        '<pre> \n\n foo</pre>'
      ]
    }
  ];

  runTests(assert, done, "preWithoutClass", "<pre> w/o class", url, tests);
};

require("sdk/test").run(exports);