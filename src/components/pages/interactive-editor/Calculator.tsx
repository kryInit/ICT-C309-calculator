import React, {FC, useState, useMemo, useRef, useEffect} from 'react'
import * as Parser from "~/antlr/generated/expr/ExprParser";
import { analyzeWithANTLR } from '~/components/functional/CondExprAnalyzer';
import BottomMenu from "./BottomMenu";
import Editor from "./Editor";
import { MonacoVimActivator } from "~/components/functional/SetupMonacoVim";
import { simulateExpr } from "./ExprFuncGenerator";

const defaultSourceCode = "cos(max(0, 2*log(2)))";

const Calculator: FC = () => {
    const [isValidExpr, setIsValidExpr] = useState<boolean>(false);
    const [exprResult, setExprResult] = useState<number | undefined>(0);

    const [vimActivator, setVimActivator] = useState<MonacoVimActivator>({activate: () => {}, deactivate: () => {}});

    const onChangeSourceCode = (sourceCode: string | undefined) => {
        if (sourceCode === undefined) return;
        if (sourceCode !== "") {
            const tmpModelTree  = analyzeWithANTLR(sourceCode);
            if (tmpModelTree) {
                setIsValidExpr(true);
                setExprResult(simulateExpr(tmpModelTree));
            } else setIsValidExpr(false);
        }
    }

    useEffect(() => onChangeSourceCode(defaultSourceCode), [])

    return (
        <div className="App" style={{display: "flex", height: "100vh"}}>
            <div style={{display: "flex", alignItems: "center"}}>
                <div style={{width: "60vw"}}>
                    <div>
                        please write below
                    </div>
                    <Editor
                        defaultSourceCode={defaultSourceCode}
                        onChangeSourceCode={onChangeSourceCode}
                        setVimActivator={setVimActivator}
                    />
                    <BottomMenu vimActivator={vimActivator} />
                </div>
            </div>
            <div>
                <div>
                    is valid expression: {isValidExpr ? "ok" : "ng"}
                </div>
                <div>
                    result: {exprResult === undefined ? "None" : exprResult}
                </div>
            </div>
        </div>
    );
}

export default Calculator;