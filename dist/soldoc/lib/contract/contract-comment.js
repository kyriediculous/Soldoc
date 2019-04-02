"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_utils_1 = require("../utils/string-utils");
const comments_generator_1 = require("../generators/comments-generator");
// regexps
const generatedCommentRegex = new RegExp('/// @([a-zA-Z]*)\\b');
const parameterCommentRegex = '/// @param';
class ContractComment {
    constructor(contract) {
        this.contract = contract;
        this.generator = new comments_generator_1.default();
    }
    insertComment(node) {
        const comment = this.generator.generate(node).trim();
        if (!comment)
            return;
        let commentLines = comment.split('\n');
        if (this.updateComment(commentLines, node.loc))
            return;
        commentLines = string_utils_1.pad(node.loc.start.column, commentLines, this.isTab(this.contract.getOriginalLineAt(node.loc.start.line - 1)));
        this.contract.insertLinesBefore(commentLines, node.loc.start.line - 1);
    }
    updateComment(commentLines, location) {
        let line = location.start.line;
        if (this.hasComment(line)) {
            // extract old comments
            let oldCommentsParams = [];
            let oldCommentsMap = {};
            let oldCommentPosition = line - 1;
            while (true) {
                let comment;
                comment = this.contract.getLineAt(oldCommentPosition).trim();
                if (comment.startsWith(parameterCommentRegex)) {
                    oldCommentsParams.push({ line: oldCommentPosition, value: comment });
                }
                else if (comment.startsWith('//')) {
                    // comment.match returns string OR null, we can filter the 'null' values with '!' after the property that can be null
                    oldCommentsMap[comment.match(generatedCommentRegex)[0]] = comment;
                }
                else if (!comment.startsWith('function')) {
                    break;
                }
                oldCommentPosition--;
            }
            // check if old comment is generated comment
            if (this.isEmptyObject(oldCommentsMap)) {
                return true;
            }
            // extract new comments
            let newCommentsParams = [];
            let newCommentsMap = commentLines.reduce(function (map, obj) {
                let key = obj.match(generatedCommentRegex)[0];
                if (key === parameterCommentRegex) {
                    newCommentsParams.push(obj.trim());
                }
                else
                    map[key] = obj;
                return map;
            }, {});
            // update params if changed
            if (newCommentsParams.length) {
                if (Object.keys(oldCommentsMap).length !== Object.keys(newCommentsMap).length) {
                    return true;
                }
                let firstCommentLine = oldCommentsParams
                    .reduce((min, b) => Math.min(min, b.line), oldCommentsParams[0].line);
                // remove old params comments and save addi. information about params
                let savedComments = {};
                for (let oldComment of oldCommentsParams) {
                    this.contract.removeLine(firstCommentLine);
                    // save old right part of comment
                    let c = oldComment.value.toString().trim().split(' ');
                    if (c.length > 4) {
                        savedComments[c[2]] = c.slice(4).join(' ');
                    }
                }
                // insert new params comments
                newCommentsParams = string_utils_1.pad(location.start.column, newCommentsParams, this.isTab(this.contract.getOriginalLineAt(location.start.line - 1)));
                for (let newComment of newCommentsParams.reverse()) {
                    let oldCommentParamName = newComment.trim().split(' ')[2];
                    let savedComment = savedComments[oldCommentParamName];
                    if (typeof savedComment !== 'undefined') {
                        newComment = newComment + ' ' + savedComment;
                    }
                    this.contract.insertLinesBeforeWithoutCalculatingAndAddingOffset(newComment.split(), firstCommentLine);
                }
                this.contract.addOffset(firstCommentLine, newCommentsParams.length - oldCommentsParams.length);
                return true;
            }
            return true;
        }
        return false;
    }
    hasComment(line) {
        let counter = 1;
        while (true) {
            counter++;
            let lineText = this.contract.getOriginalLineAt(line - counter);
            if (lineText.trim().startsWith('function')) {
                lineText = this.contract.getOriginalLineAt(line - counter - 1);
            }
            if (lineText === undefined)
                return false;
            lineText = lineText.trim();
            if (lineText.startsWith('*') || lineText.startsWith('//'))
                return true;
            if (!lineText.replace(/\s/g, '').length)
                continue;
            return false;
        }
    }
    isEmptyObject(obj) {
        for (let name in obj) {
            return false;
        }
        return true;
    }
    isTab(originalLineAt) {
        return originalLineAt.startsWith('\t');
    }
}
exports.ContractComment = ContractComment;
