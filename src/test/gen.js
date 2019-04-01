"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../soldoc/index");
const path = require("path");
const file = path.resolve(__dirname, './migrations.sol');
console.log(index_1.generateCommentsFromFile(file));
//# sourceMappingURL=gen.js.map