import * as parser from 'solidity-parser-antlr';
import { ContractFile } from './lib/contract/contract-file';
import { Contract } from './lib/contract/contract';
import ContractParts from './lib/contract-parts';
import { ContractComment } from './lib/contract/contract-comment';

export function generateCommentsFromText(text) {
  return generate(new Contract(text));
}

export function generateCommentsFromFile(path) {
  let contract = new ContractFile(path);
  generate(contract);
  contract.save();
}

function generate(contract: Contract) {
  let ast = parser.parse(
    contract.getText(),
    { tolerant: true, loc: true, range: true }
  );
  const contractComment = new ContractComment(contract);
  const visitors = getVisitors(contractComment);
  parser.visit(ast, visitors);
  return contract.getText();
}

function getVisitors(contractComment: ContractComment) {
  let visitors = {};
  for (let prop in ContractParts) {
    if (ContractParts.hasOwnProperty(prop)) {
      visitors[ContractParts[prop]] = function (node) {
        contractComment.insertComment(node);
      };
    }
  }
  return visitors;
}

