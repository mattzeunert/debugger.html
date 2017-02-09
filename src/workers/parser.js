const babylon = require("babylon");
const traverse = require("babel-traverse").default;

import type { SourceText, Source } from "../types";

const ASTs = new Map();

function _parse(code) {
  return babylon.parse(code, {
    sourceType: "module",

    plugins: [
      "jsx",
      "flow"
    ]
  });
}

function parse(sourceText: SourceText, source: Source) {
  if (ASTs.has(source.id)) {
    return ASTs.get(source.id);
  }
  const ast = _parse(sourceText.text);
  ASTs.set(source.id, ast);
  return ast;
}

function getAst(source) {
  return ASTs.get(source.id);
}

function getFunctions(source) {
  const ast = getAst(source);

  traverse(ast, {
    enter(path) {}
  });

  return false;
}

function getExpressionsInScope({source, lineNumber, columnNumber}){
  // debugger
  const ast = getAst(source);
   
  var possiblePaths = []
  var uniqueScopes = []

   // todo: don't traverse whole tree
  traverse(ast, {
      enter(path) {
        var loc =  path.scope.parentBlock.loc;


        var startsBefore = loc.start.line <= lineNumber
        var endsAfter = loc.end.line >= lineNumber

        if (startsBefore && endsAfter) {
          var hasScope = uniqueScopes.includes(path.scope)
          if (!hasScope){
            possiblePaths.push(path)
            uniqueScopes.push(path.scope)
          }
          
        }

      }
  })

  debugger
}

module.exports = {
  parse,
  getFunctions,
  getExpressionsInScope
};
