import React, {FC, useEffect} from "react";
import { generateExprFunc } from "./ExprFuncGenerator";
import * as Parser from "~/antlr/generated/cond-expr/CondExprParser";

export type InputTextModel = {
    id: string,
    scoreInfluencingParams: (number | string | boolean)[]
}
export type TestCaseModel = {
    scoreInfluencingParamNames: string[]
    inputs: InputTextModel[]
}

type TestCaseProps = {
    testcase: TestCaseModel,
    modelTree: Parser.ExprContext | null
}
export const TestCaseInfo: FC<TestCaseProps> = React.memo(({ testcase, modelTree }) => {


    const condExprFunc = modelTree
        ? generateExprFunc(modelTree, Object.fromEntries(testcase.scoreInfluencingParamNames.map((x,i) => [x,i])))
        : (input: InputTextModel) => true;
    const filteredInputs = testcase.inputs.filter(condExprFunc);
    const maxParamLengths = testcase.inputs.reduce(
        (currentMaxLength, input) => {
            return currentMaxLength.map((x, i) => Math.max(x, [input.id, ...input.scoreInfluencingParams][i].toString().length))
        },
        [2, ...testcase.scoreInfluencingParamNames.map(x => x.length)]
    );
    const width = maxParamLengths.reduce((current, x) => current+x, 0) * 20;
    console.log("HI");

    return (
        <div style={{width: width, margin: "auto"}}>
            <div style={{display: "flex", flexFlow: "column", height: "80vh"}}>
                <div style={{textAlign: "center"}}>
                    filtered input count: {filteredInputs.length}
                </div>
                <div style={{display: "flex", width: width}}>
                    {['ID', ...testcase.scoreInfluencingParamNames].map((label, idx) =>
                        <div
                            style={{
                                flex: maxParamLengths[idx],
                                fontFamily: "menlo",
                                fontSize: "30px",
                                paddingLeft: "15px"
                            }}
                            key={idx}
                        >
                            {label}
                        </div>
                    )}
                </div>
                <div style={{overflowY: "scroll", margin: "auto", height: "70vh", borderColor: "#888888", borderWidth: "2px", borderStyle: "solid"}}>
                    {filteredInputs.map(input =>
                        <div style={{display: "flex", width: width}} key={input.id}>
                            {[input.id, ...input.scoreInfluencingParams].map((value, idx) =>
                                <div
                                    style={{
                                        flex: maxParamLengths[idx],
                                        fontFamily: "menlo",
                                        fontSize: "20px",
                                        paddingLeft: "15px"
                                    }}
                                    key={idx}
                                >
                                    {value.toString()}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});
