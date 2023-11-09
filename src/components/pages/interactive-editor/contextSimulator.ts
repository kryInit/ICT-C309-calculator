import * as Parser from "~/antlr/generated/expr/ExprParser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";

export const simulateExpr = (exprContext: Parser.ExprContext): number | undefined => {
    const simulateExprHelper = (context: ParserRuleContext): any => {
        if (context == undefined) return undefined;
        else if (context instanceof Parser.ParenthesisExprContext) {
            return simulateExprHelper(context.expr());
        } else if (context instanceof Parser.FunctionExprContext) {
            const name = context._Name.text;
            if (name == 'exp')
                return Math.exp(simulateExprHelper(context.expr()[0]));
            else if (name == 'log')
                return Math.log(simulateExprHelper(context.expr()[0]));
            else if (name == 'sin')
                return Math.sin(simulateExprHelper(context.expr()[0]));
            else if (name == 'cos')
                return Math.cos(simulateExprHelper(context.expr()[0]));
            else if (name == 'max')
                return Math.max(...context.expr().map(simulateExprHelper));
            else if (name == 'min')
                return Math.min(...context.expr().map(simulateExprHelper));
        } else if (context instanceof Parser.UnaryExprContext) {
            if (context._Operator.text == 'not')
                return !simulateExprHelper(context.expr());
            if (context._Operator.text == 'not')
                return -simulateExprHelper(context.expr());
            return simulateExprHelper(context.expr());
        } else if (context instanceof Parser.BinaryExprContext) {
            if (context._Operator.text == '==')
                return simulateExprHelper(context._lhs) === simulateExprHelper(context._rhs);
            else if (context._Operator.text == 'and')
                return simulateExprHelper(context._lhs) && simulateExprHelper(context._rhs);
            else if (context._Operator.text == '<')
                return simulateExprHelper(context._lhs) < simulateExprHelper(context._rhs);
            else if (context._Operator.text == '<=')
                return simulateExprHelper(context._lhs) <= simulateExprHelper(context._rhs);
            else if (context._Operator.text == '>')
                return simulateExprHelper(context._lhs) > simulateExprHelper(context._rhs);
            else if (context._Operator.text == '>=')
                return simulateExprHelper(context._lhs) >= simulateExprHelper(context._rhs);
            else if (context._Operator.text == '+')
                return simulateExprHelper(context._lhs) + simulateExprHelper(context._rhs);
            else if (context._Operator.text == '-')
                return simulateExprHelper(context._lhs) - simulateExprHelper(context._rhs);
            else if (context._Operator.text == '*')
                return simulateExprHelper(context._lhs) * simulateExprHelper(context._rhs);
            else if (context._Operator.text == '/')
                return simulateExprHelper(context._lhs) / simulateExprHelper(context._rhs);
        } else if (context instanceof Parser.IntExprContext) {
            return parseInt(context.Int().text);
        } else if (context instanceof Parser.FloatExprContext) {
            return parseFloat(context.Float().text);
        }
        return undefined;
    }
    return simulateExprHelper(exprContext);
}