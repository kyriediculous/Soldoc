"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const contract_1 = require("./contract");
class ContractFile extends contract_1.Contract {
    constructor(filePath) {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File ${filePath} not found!`);
        }
        super(fs.readFileSync(filePath, 'utf-8').split('\n'));
        this.path = filePath;
        this.fileName = path.basename(filePath);
    }
    getFilename() {
        return this.fileName;
    }
    getPath() {
        return this.path;
    }
    save(path = '') {
        if (!path || path === '') {
            path = this.path;
        }
        return new Promise((resolve, reject) => {
            let file = fs.createWriteStream(path);
            file.on('error', function (err) { reject(err); });
            this.lines.forEach((line) => {
                file.write(line + '\n');
            });
            file.end();
            resolve();
        });
    }
}
exports.ContractFile = ContractFile;
