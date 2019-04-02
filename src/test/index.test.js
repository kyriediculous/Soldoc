"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test = require("tape");
const fs = require("fs");
const path = require("path");
const soldoc_1 = require("../soldoc/");
soldoc_1.generateCommentsFromFile('./test-contracts/Metacoin.commented.sol');
test('Assert generate comments from text', (t) => {
    t.plan(1);
    let commentedContract = soldoc_1.generateCommentsFromText(fs.readFileSync('./test/test-contracts/Metacoin.sol', 'utf-8'));
    t.equal(commentedContract, fs.readFileSync('./test/test-contracts/Metacoin.commented.sol', 'utf-8'));
});
test('Assert generate comments from text second time wont duplicate', (t) => {
    t.plan(1);
    let commentedContract = soldoc_1.generateCommentsFromText(fs.readFileSync('./test/test-contracts/Metacoin.sol', 'utf-8'));
    commentedContract =
        soldoc_1.generateCommentsFromText(commentedContract);
    t.equal(commentedContract, fs.readFileSync('./test/test-contracts/Metacoin.commented.sol', 'utf-8'));
});
test('Assert generate comments from edited contract', (t) => {
    t.plan(1);
    let commentedContract = soldoc_1.generateCommentsFromText(fs.readFileSync('./test/test-contracts/Metacoin.edited.sol', 'utf-8'));
    t.equal(commentedContract, fs.readFileSync('./test/test-contracts/Metacoin.edited.commented.sol', 'utf-8'));
});
test('Assert generate comments from file', t => {
    t.plan(1);
    soldoc_1.generateCommentsFromFile(path.resolve(__dirname, './test-contracts/Metacoin.sol'));
    t.equal(fs.readFileSync('./test-contracts/Metacoin.sol', 'utf-8'), fs.readFileSync('./test/test-contracts/Metacoin.commented.sol', 'utf-8'));
});
//# sourceMappingURL=index.test.js.map