const glob = require('glob');
const fs = require('fs');
const path = require('path');

(async function(){
  const files = glob.sync('coverage/**/lcov.info');
  const mergedReport = files.reduce((mergedReport, currFile) => mergedReport += fs.readFileSync(currFile), '');
  await fs.writeFile(path.resolve('./coverage/lcov.info'), mergedReport, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
})();