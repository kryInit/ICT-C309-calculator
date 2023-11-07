import {CharStreams, CommonTokenStream, ParserRuleContext} from "antlr4ts";
import * as Lexer from "~/antlr/generated/cond-expr/CondExprLexer";
import * as Parser from "~/antlr/generated/cond-expr/CondExprParser";


export const analyzeWithANTLR = (modelLang: string): Parser.ExprContext | null => {
    try {
        const inputStream = CharStreams.fromString(modelLang);
        const lexer = new Lexer.CondExprLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new Parser.CondExprParser(tokenStream);
        parser.removeErrorListeners();
        parser.addErrorListener({
            syntaxError: (recognizer, offendingSymbol, line, column, msg, err) => {
                throw null;
            }
        });
        const expr = parser.expression().expr();
        return expr;
    } catch(e: any) {
        return null;
    }
}


export const validateConditionalExpression = (exprContext: Parser.ExprContext, availableParamNames: Set<string>): boolean => {
    return validateConditionalExpressionHelper(exprContext, availableParamNames);
}
const validateConditionalExpressionHelper = (context: ParserRuleContext, availableParamNames: Set<string>): boolean => {
    if (context instanceof Parser.IdentifierContext)
        return availableParamNames.has(context.ID().text);
    else return context.children?.filter(ctx => ctx instanceof ParserRuleContext)
        .every(ctx => validateConditionalExpressionHelper(ctx as ParserRuleContext, availableParamNames)) ?? true;
}

