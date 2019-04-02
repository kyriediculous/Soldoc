"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mustache = require("mustache");
const fs = require("fs");
const path = require("path");
const contract_parts_1 = require("../contract-parts");
class CommentsGenerator {
    constructor() {
        Mustache.parse(this.getContractCommentTemplate());
        Mustache.parse(this.getGlobalVariableTemplate());
        Mustache.parse(this.getModifierTemplate());
        Mustache.parse(this.getFunctionTemplate());
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
                item.return = this.extractReturns(item);
                return this.generateComment(this.getFunctionTemplate(), item);
            }
            default: {
                return '';
            }
        }
    }
    generateComment(template, view) {
        return Mustache.render(template, view);
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
            params.push({ type: paramObj.typeName.name, name: paramObj.name });
        });
        return params;
    }
    extractReturns(item) {
        let returns = [];
        if (!item.returnParameters)
            return [];
        item.returnParameters.parameters.forEach(paramObj => {
            returns.push({ type: paramObj.typeName.name, name: paramObj.name });
        });
        return returns;
    }
}
exports.default = CommentsGenerator;
//# sourceMappingURL=comments-generator.js.map