"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mustache_1 = require("mustache");
const fs = require("fs");
const path = require("path");
const contract_parts_1 = require("../contract-parts");
class CommentsGenerator {
    constructor() {
        mustache_1.default.parse(this.getContractCommentTemplate());
        mustache_1.default.parse(this.getGlobalVariableTemplate());
        mustache_1.default.parse(this.getModifierTemplate());
        mustache_1.default.parse(this.getFunctionTemplate());
    }
    generate(item) {
        switch (item.type) {
            case contract_parts_1.default.CONTRACT: {
                return this.generateComment(this.getContractCommentTemplate(), item);
            }
            case contract_parts_1.default.EVENT: {
                return '';
            }
            case contract_parts_1.default.GLOBAL_VARIABLE: {
                return this.generateComment(this.getGlobalVariableTemplate(), item);
            }
            case contract_parts_1.default.MODIFIER: {
                return this.generateComment(this.getModifierTemplate(), item);
            }
            case contract_parts_1.default.PRAGMA: {
                return '';
            }
            case contract_parts_1.default.FUNCTION: {
                item.params = this.extractParamNames(item);
                return this.generateComment(this.getFunctionTemplate(), item);
            }
            default: {
                return '';
            }
        }
    }
    generateComment(template, view) {
        return mustache_1.default.render(template, view);
    }
    getTemplate(location) {
        return fs.readFileSync(path.resolve(__dirname, location), 'utf-8');
    }
    getFunctionTemplate() {
        return this.getTemplate('../../spec/function.mustache');
    }
    getModifierTemplate() {
        return this.getTemplate('../../spec/modifier.mustache');
    }
    getGlobalVariableTemplate() {
        return this.getTemplate('../../spec/global_variable.mustache');
    }
    getContractCommentTemplate() {
        return this.getTemplate('../../spec/contract.mustache');
    }
    extractParamNames(item) {
        let params = [];
        item.parameters.parameters.forEach((paramObj) => {
            params.push({ name: paramObj.name });
        });
        return params;
    }
}
exports.default = CommentsGenerator;
//# sourceMappingURL=comments-generator.js.map