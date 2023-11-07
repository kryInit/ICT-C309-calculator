import React, { FC } from "react";
import MonacoEditor from "@monaco-editor/react";
import { MonacoVimActivator, setupMonacoVim } from "~/components/functional/SetupMonacoVim";

type EditorProps = {
    defaultSourceCode: string,
    onChangeSourceCode: (sourceCode: string | undefined) => void,
    setVimActivator: React.Dispatch<React.SetStateAction<MonacoVimActivator>> | undefined,
};

const Editor: FC<EditorProps> = ({
    defaultSourceCode= "",
    onChangeSourceCode = () => {},
    setVimActivator = undefined
}) => {
    return (
        <MonacoEditor
            height="80vh"
            theme={"vs-dark"}
            defaultLanguage="python"
            defaultValue={defaultSourceCode}
            onMount={(editor, monaco) => {
                const statusNode = document.querySelector(".status-node")!;
                setupMonacoVim(editor, monaco, statusNode, setVimActivator);
            }}
            onChange={onChangeSourceCode}
            options={{
                fontSize: 20,
                lineNumbers: 'off',
                minimap: { enabled: false },
                contextmenu: false
            }}
        />
    )
}

export default Editor;