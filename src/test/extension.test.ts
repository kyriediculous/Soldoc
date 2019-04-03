//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';
import { generateCommentsFromFile, generateCommentsFromText } from '../soldoc/';
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
// import * as myExtension from '../extension';

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function () {
    test('Assert generate comments', () => {
        const CONTROL_CONTRACT = fs.readFileSync(path.resolve(__dirname, './test-contracts/Metacoin.commented.sol'), 'utf-8');
        generateCommentsFromFile(path.resolve(__dirname, './test-contracts/Metacoin.sol'));
        const TEST_CONTRACT = fs.readFileSync(path.resolve(__dirname, './test-contracts/Metacoin.sol'), 'utf-8');
        assert.equal(TEST_CONTRACT, CONTROL_CONTRACT);
    });
});