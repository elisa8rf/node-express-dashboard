const fs = require("fs");
const path = require("path");

let dir;
exports.setcwd = function(cwd) {
    dir = cwd;
}

function getDirectoryContents(files, currentDir, query) {
    const data = [];
    files.forEach(function(file) {
        if (isDirectory(currentDir, file)) {
            data.push({name: file, isDirectory: true, path: path.join(query, file)})
        } else {
            data.push({name: file, isDirectory: false, path: path.join(query, file), currentDir: currentDir})
        }
    })
    return data;
}

function isDirectory(currentDir, file) {
    const fileInfo = fs.statSync(path.join(currentDir, file));
    return fileInfo.isDirectory();
}

function readDir(currentDir, res, query) {
    fs.readdir(currentDir, function(err, files) {
        var directoryContents = [];
        if (!err) {
            directoryContents = getDirectoryContents(files, currentDir, query);
        }
        res.json(directoryContents);
    })
}

exports.get = (req, res) => {
    var currentDir = dir;
    const query = req.query.path ? req.query.path : "";
    if (query) {
        currentDir = path.join(currentDir, query);
    }

    readDir(currentDir, res, query)
};
