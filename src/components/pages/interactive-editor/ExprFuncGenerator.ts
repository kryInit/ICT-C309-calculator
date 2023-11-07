import * as Parser from "~/antlr/generated/cond-expr/CondExprParser";
import { InputTextModel } from "./TestCaseInfo";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import {FloatContext, IdentifierContext, IntContext} from "~/antlr/generated/cond-expr/CondExprParser";

export const generateExprFunc = (exprContext: Parser.ExprContext, paramsDict: Object): (input: InputTextModel) => boolean => {
    const generateExprFuncHelper = (context: ParserRuleContext): (input: InputTextModel) => any => {
        if (context instanceof Parser.ParenthesisContext) {
            return generateExprFuncHelper(context.expr());
        } else if (context instanceof Parser.UnaryOperationContext) {
            if (context._Operator.text == 'not')
                return input => !generateExprFuncHelper(context.expr())(input);
            return input => true;
        } else if (context instanceof Parser.BinaryOperationContext) {
            if (context._Operator.text == '==')
                return input => generateExprFuncHelper(context._lhs)(input) === generateExprFuncHelper(context._rhs)(input);
            else if (context._Operator.text == 'and')
                return input => generateExprFuncHelper(context._lhs)(input) && generateExprFuncHelper(context._rhs)(input);
            else if (context._Operator.text == '<')
                return input => generateExprFuncHelper(context._lhs)(input) < generateExprFuncHelper(context._rhs)(input);
            else if (context._Operator.text == '<=')
                return input => generateExprFuncHelper(context._lhs)(input) <= generateExprFuncHelper(context._rhs)(input);
            else if (context._Operator.text == '>')
                return input => generateExprFuncHelper(context._lhs)(input) > generateExprFuncHelper(context._rhs)(input);
            else if (context._Operator.text == '>=')
                return input => generateExprFuncHelper(context._lhs)(input) >= generateExprFuncHelper(context._rhs)(input);
        } else if (context instanceof IdentifierContext) {
            if (paramsDict.hasOwnProperty(context.ID().text)) {
                // @ts-ignore
                const idx = paramsDict[context.ID().text] as number;
                return input => input.scoreInfluencingParams[idx];
            }
        } else if (context instanceof IntContext) {
            return input => parseInt(context.Int().text);
        } else if (context instanceof FloatContext) {
            return input => parseFloat(context.Float().text);
        }
        return input => true;
    }
    return generateExprFuncHelper(exprContext);
}