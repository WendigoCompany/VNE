const fs = require("fs");
const util = require("util");
const mkdirfunc = util.promisify(fs.mkdir);
const deleteFile = util.promisify(fs.unlink);

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const mkdir = async (dir, sensitive = false) => {
  const fun = util.promisify(fs.mkdir);

  try {
    await fun(dir)
  } catch (error) {
    if (!error.code == "EEXIST") {
      console.log(error);
    } else if (sensitive) {
      console.log(error);
    }
  }

};
const exist = fs.existsSync;
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);



const copyFile = async (dir, destiny) => {
  const cp = util.promisify(fs.copyFile);
  try {
    const files = await readdir(dir);
    for (let i = 0; i < files.length; i++) {
      await cp(dir + files[i], destiny)


    }
  } catch (error) {
    console.log(error);

  }

};



const getfolders = async (patch) => {
  const files = await readdir(patch);
  const folders = [];
  // files.map(async file => {
  //   const fullPath = `${patch}/${file}`;
  //   const fileStat = await stat(fullPath);
  //   if (fileStat.isDirectory()) {
  //     folders.push(file)
  //   }
  // })

  for (let i = 0; i < files.length; i++) {
    const fullPath = `${patch}/${files[i]}`;
    const fileStat = await stat(fullPath);
    if (fileStat.isDirectory()) {
      folders.push(files[i])
    }

  }

  return folders

};


const isDir = async (url) => {
  const fold = await stat(url);
  return fold.isDirectory()
}


const buffToJSON = (data) => {
  data = new Uint8Array(data);
  data = new TextDecoder().decode(data);
  data = JSON.parse(data);
  return data
}

const toJson = (data) => {
  return JSON.parse(data.toString())
}


module.exports = {
  mkdir,
  exist,
  readdir,
  getfolders,
  writeFile,
  readFile,
  getfolders,
  buffToJSON,
  isDir,
  toJson,
  copyFile,
  deleteFile,
  
};


