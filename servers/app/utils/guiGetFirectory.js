var fs = require('fs');

exports.getDirectoryList = function(pathDir){
    let components = []
    const files = fs.readdirSync(pathDir)
    files.forEach(function (item, index) {
        let stat = fs.lstatSync(pathDir + item)
        if (stat.isDirectory() === true) { 
        components.push(item)
        }
    })
    return components
}