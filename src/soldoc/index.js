"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser = require("solidity-parser-antlr");
const contract_file_1 = require("./lib/contract/contract-file");
const contract_1 = require("./lib/contract/contract");
const contract_parts_1 = require("./lib/contract-parts");
const contract_comment_1 = require("./lib/contract/contract-comment");
function generateCommentsFromText(text) {
    return generate(new contract_1.Contract(text));
}
exports.generateCommentsFromText = generateCommentsFromText;
function generateCommentsFromFile(path) {
    let contract = new contract_file_1.ContractFile(path);
    generate(contract);
    contract.save();
}
exports.generateCommentsFromFile = generateCommentsFromFile;
function generate(contract) {
    let ast = parser.parse(contract.getText(), { tolerant: true, loc: true, range: true });
    const contractComment = new contract_comment_1.ContractComment(contract);
    const visitors = getVisitors(contractComment);
    parser.visit(ast, visitors);
    return contract.getText();
}
function getVisitors(contractComment) {
    let visitors = {};
    for (let prop in contract_parts_1.default) {
        if (contract_parts_1.default.hasOwnProperty(prop)) {
            visitors[contract_parts_1.default[prop]] = function (node) {
                contractComment.insertComment(node);
            };
        }
    }
    return visitors;
}
//# sourceMappingURL=index.js.map