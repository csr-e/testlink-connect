(function() {

  // jasmine/bin/jasmine.js
   var path = require('path');
   var Jasmine = require('jasmine/lib/jasmine.js');
   var jasmine = new Jasmine({ projectBaseDir: path.resolve() });

   var folder = "./test/";
   var files = [
        "generic_spec.js",
        "project_spec.js",
        "user_spec.js",
        "testplan_spec.js",
        "testcase_spec.js",
        "advanced_spec.js"
   ];

  //files = ["generic_spec.js"];

   for(var i=0; i<files.length; i++) {
       var fullPath = folder + files[i];
       try {
           jasmine.execute([fullPath]);
           console.info("Initiated :" + fullPath);
       } catch (err) {
           console.error("Error in " + fullPath, err);
       }
   }

})();
