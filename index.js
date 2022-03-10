var stream = require('stream');
var fs = require('fs')
var util = require('util');

var axios = require("axios");

const finished = util.promisify(stream.finished);

var baseURI = 'https://beepos.fun/api/beepos/'

// async function downloadFile(fileUrl, outputLocationPath) {
//   const writer = fs.createWriteStream(outputLocationPath);
//   return axios({
//     method: 'get',
//     url: fileUrl,
//     responseType: 'stream',
//   }).then(async response => {
//     response.data.pipe(writer);
//     return finished(writer); //this is a Promise
//   });
// }

async function downloadFile(i, fileUrl, outputPath){
  var data = await axios.get(fileUrl)
  var json = JSON.stringify(data.data);
  fs.writeFileSync(`./images/${i}.json`, json, 'utf8');
  console.log(data.data)
}

async function getData(){
    for(var i = 1; i <= 10000; i++){
        var fileName = i
        try{
          await downloadFile(i, baseURI + fileName, './images/' + fileName + '.json')
        } catch (e) {
          i--
        }
    }
}

getData()