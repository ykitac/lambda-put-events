var exec = require('child_process').exec,
    package = require('../package');

var COMMAND_PREFIX = 'rm -fr pkg; mkdir pkg; zip -r';

var target = " pkg/" + package.name + ".zip",
    main = " " + package.main;

exec(COMMAND_PREFIX + target + main, function (error, stdout, stderr) {
  if(stdout)
  {
    console.log("stdout: " + stdout);
  }
  if(stderr)
  {
    console.log("stderr: " + stderr);
  }
  if (error !== null)
  {
    console.log("error: " + error);
  }
});
