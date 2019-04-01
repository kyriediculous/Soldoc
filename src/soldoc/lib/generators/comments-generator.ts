import * as Mustache from 'mustache';
import * as fs from 'fs';
import * as path from 'path';
import ContractParts from '../contract-parts';

export default class CommentsGenerator {

  constructor() {
    Mustache.parse(
      this.getContractCommentTemplate()
    );
    Mustache.parse(
      this.getGlobalVariableTemplate()
    );
    Mustache.parse(
      this.getModifierTemplate()
    );
    Mustache.parse(
      this.getFunctionTemplate()
    );
  }


  generate(item) {
    switch (item.type) {
      case ContractParts.CONTRACT: {
        return this.generateComment(
          this.getContractCommentTemplate(),
          item
        );
      }
      case ContractParts.EVENT: {
        return '';
      }
      case ContractParts.GLOBAL_VARIABLE: {
        return this.generateComment(
          this.getGlobalVariableTemplate(),
          item
        );
      }
      case ContractParts.MODIFIER: {
        return this.generateComment(
          this.getModifierTemplate(),
          item
        );
      }
      case ContractParts.PRAGMA: {
        return '';
      }
      case ContractParts.FUNCTION: {
        item.params = this.extractParamNames(item);
        item.return = this.extractReturns(item);
        return this.generateComment(
          this.getFunctionTemplate(),
          item
        );
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
    return fs.readFileSync(
      path.resolve(__dirname, location),
      'utf-8'
    );
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
    let params: any[] = [];
    item.parameters.parameters.forEach((paramObj) => {
      params.push({ type: paramObj.typeName.name, name: paramObj.name });
    });
    return params;
  }

  extractReturns(item) {
    let returns: any[] = [];
    if (!item.returnParameters) return [];
    item.returnParameters.parameters.forEach(paramObj => {
      returns.push({ type: paramObj.typeName.name, name: paramObj.name });
    });
    return returns;
  }
}
