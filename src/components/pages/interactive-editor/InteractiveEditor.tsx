import React, {FC, useState, useMemo, useRef, useEffect} from 'react'
import * as Parser from "~/antlr/generated/cond-expr/CondExprParser";
import { analyzeWithANTLR, validateConditionalExpression } from '~/components/functional/CondExprAnalyzer';
import BottomMenu from "./BottomMenu";
import Editor from "./Editor";
import { MonacoVimActivator } from "~/components/functional/SetupMonacoVim";
import { TestCaseModel, TestCaseInfo } from "./TestCaseInfo";
import { generateExprFunc } from "./ExprFuncGenerator";

const testcase: TestCaseModel = {
    scoreInfluencingParamNames: ["N", "eps"],
    inputs: [...Array(2000)].map((_, idx) =>
        Object({
            id: `${idx}`.padStart(4, '0'),
            scoreInfluencingParams: [ Math.round(Math.random() * 90 + 10), Math.round(Math.random() * 40) / 100 ]
        })
    )
}
const availableParamNames = new Set(testcase.scoreInfluencingParamNames);

const InteractiveEditor: FC = () => {
    const [modelTree, setModelTree] = useState<Parser.ExprContext | null>(null);
    const [condExprText, setCondExprText] = useState("None");

    const [vimActivator, setVimActivator] = useState<MonacoVimActivator>({activate: () => {}, deactivate: () => {}});

    const onChangeSourceCode = (sourceCode: string | undefined) => {
        if (sourceCode === undefined) return;
        if (sourceCode === "") {
            setModelTree(null);
            setCondExprText("None");
        } else {
            const tmpModelTree  = analyzeWithANTLR(sourceCode);
            if (tmpModelTree && validateConditionalExpression(tmpModelTree, availableParamNames)) {
                setModelTree(tmpModelTree);
                setCondExprText(sourceCode);
            }
        }
    }

    return (
        <div className="App" style={{display: "flex", height: "100vh"}}>
            <div style={{display: "flex", alignItems: "center"}}>
                <div style={{width: "60vw"}}>
                    <Editor
                        defaultSourceCode={""}
                        onChangeSourceCode={onChangeSourceCode}
                        setVimActivator={setVimActivator}
                    />
                    <BottomMenu vimActivator={vimActivator} />
                </div>
            </div>
            <div style={{width: "40vw", display: "flex", flexFlow: "column"}}>
                <div style={{height: "20vh", display: "flex"}}>
                    <div style={{margin: "auto"}}>
                        <div style={{textAlign: "center"}}>conditional expression</div>
                        <div style={{fontSize: "40px", textAlign: "center", fontFamily: "menlo"}}>{condExprText}</div>
                    </div>
                </div>
                <TestCaseInfo testcase={testcase} modelTree={modelTree} />
            </div>
        </div>
    );
}

export default InteractiveEditor;