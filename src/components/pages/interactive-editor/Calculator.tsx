import React, {FC, useState, useMemo, useRef, useEffect} from 'react'
import * as Parser from "~/antlr/generated/expr/ExprParser";
import {analyzeWithANTLR} from '~/components/functional/CondExprAnalyzer';
import BottomMenu from "./BottomMenu";
import Editor from "./Editor";
import {MonacoVimActivator} from "~/components/functional/SetupMonacoVim";
import {simulateExpr} from "./contextSimulator";

const defaultSourceCode = "cos(max(0, 2*log(2)))";

const Calculator: FC = () => {
    const [isValidExpr, setIsValidExpr] = useState<boolean>(false);
    const [exprResult, setExprResult] = useState<number | undefined>(0);

    const [vimActivator, setVimActivator] = useState<MonacoVimActivator>({
        activate: () => {
        }, deactivate: () => {
        }
    });

    const onChangeSourceCode = (sourceCode: string | undefined) => {
        if (sourceCode === undefined) return;
        if (sourceCode !== "") {
            const tmpModelTree = analyzeWithANTLR(sourceCode);
            if (tmpModelTree) {
                setIsValidExpr(true);
                setExprResult(simulateExpr(tmpModelTree.expr()));
            } else setIsValidExpr(false);
        }
    }

    useEffect(() => onChangeSourceCode(defaultSourceCode), [])

    return (
        <div className="App" style={{display: "flex", height: "100vh"}}>
            <div style={{display: "flex", alignItems: "center"}}>
                <div style={{width: "60vw"}}>
                    <div>
                        repository: <a
                        href="https://github.com/kryInit/ICT-C309-calculator">https://github.com/kryInit/ICT-C309-calculator</a>
                    </div>
                    <div>
                        please write below
                    </div>
                    <Editor
                        defaultSourceCode={defaultSourceCode}
                        onChangeSourceCode={onChangeSourceCode}
                        setVimActivator={setVimActivator}
                    />
                    <BottomMenu vimActivator={vimActivator}/>
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 'auto',
            }}>
                <div style={{
                    color: '#333',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    textAlign: 'left',
                }}>
                    <p style={{
                        margin: '0 0 10px 0',
                        fontSize: '1em',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        is valid expr:
                        <span style={{marginLeft: '8px', color: isValidExpr ? 'green' : 'red'}}>
                            {isValidExpr ? "ok" : "ng"}
                        </span>
                        <span style={{
                            marginLeft: '8px',
                            width: '15px',
                            height: '15px',
                            backgroundColor: isValidExpr ? 'green' : 'red',
                            display: 'inline-block',
                            borderRadius: '50%'
                        }}/>
                    </p>
                    <p style={{
                        margin: '0',
                        fontSize: '1em'
                    }}>
                        result: {!isValidExpr ? "expr is invalid" : exprResult === undefined ? "None" : Number.isInteger(exprResult) ? exprResult : exprResult.toFixed(5)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Calculator;