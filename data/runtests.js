var rootElement = null;
var mode = self.options.mode;
var tabURL = self.options.tabURL;
var errorCount;

// Use CKEditor source when editing
if (mode === "editing") {
  var iframe = document.querySelectorAll("iframe.cke_wysiwyg_frame")[0];
  if (iframe) {
    iframe.contentDocument.body.setAttribute("spellcheck", "true");
    rootElement = iframe.contentDocument.body;
  }
// Use ?raw page source when reading
} else if (mode.indexOf("reading") !== -1) {
  var xhr = new XMLHttpRequest();
  var url = tabURL.split('#')[0] + "?raw";
  xhr.open("GET", url , true);
  xhr.addEventListener("load", function(event) {
    var domParser = new DOMParser();
    var doc = domParser.parseFromString(xhr.responseText, "text/html");
    rootElement = doc.body;
    // Don't run the test twice when using the sidebar "runTest" button
    if (mode !== "reading-with-sidebar") {
      errorCount = 0;
      for (var prop in docTests) {
        runTest(docTests[prop], prop);
      }
    }
  }, false);
  xhr.send();
}

var runTest = function(testObj, id) {
  // Only run the test suite if there's a root element
  //(e.g. when in source view there's no root element set)
  if (rootElement) {
    var contentTest = testObj.check(rootElement);
    testObj.errors = contentTest;
    errorCount += testObj.errors.length;
    self.port.emit("test", testObj, id);
    self.port.emit("badgeUpdate", errorCount);
  }
};

self.port.on("runTests", function() {
  errorCount = 0;
  for (var prop in docTests) {
    runTest(docTests[prop], prop);
  }
});

// Disable save buttons if no revision comment has been entered
if (mode === "editing") {
  var btns = document.querySelectorAll(".btn-save, .btn-save-and-edit");
  var comment = document.querySelectorAll("#page-comment #id_comment")[0];
  var disableBtns = function(bool) {
    for (var i = 0; i < btns.length; i++) {
      btns[i].disabled = bool;
    }
  };
  if (comment.value === '') {
    disableBtns(true);
  }
  comment.addEventListener("change", function() {
    disableBtns(false);
  });
}