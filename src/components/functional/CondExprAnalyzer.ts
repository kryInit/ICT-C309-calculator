import {CharStreams, CommonTokenStream, ParserRuleContext} from "antlr4ts";
import * as Lexer from "~/antlr/generated/expr/ExprLexer";
import * as Parser from "~/antlr/generated/expr/ExprParser";


export const analyzeWithANTLR = (modelLang: string): Parser.ExprContext | null => {
    try {
        const inputStream = CharStreams.fromString(modelLang);
        const lexer = new Lexer.ExprLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new Parser.ExprParser(tokenStream);
        parser.removeErrorListeners();
        parser.addErrorListener({
            syntaxError: (recognizer, offendingSymbol, line, column, msg, err) => {
                throw null;
            }
        });
        const expr = parser.expr();
        return expr;
    } catch(e: any) {
        return null;
    }
}
