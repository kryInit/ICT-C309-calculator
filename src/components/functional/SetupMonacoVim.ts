import {Monaco} from "@monaco-editor/react";
import React from "react";
import {initVimMode, VimMode, MonacoVimType} from "monaco-vim";
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export type MonacoVimActivator = {
    activate: () => void,
    deactivate: () => void
};

export const setupMonacoVim = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco,
    statusNode: Element,
    setMonacoVimActivator:React.Dispatch<React.SetStateAction<MonacoVimActivator>> | undefined = undefined,
    startWithVimMode: boolean = true,
    useRequireJS: boolean = true,
) => {
    // require jsの方じゃないとnormal modeでキャレットが太くならない(謎
    if (useRequireJS) {
        (window as any).require.config({
            paths: {
                'vs': 'https://unpkg.com/monaco-editor/min/vs',
                "monaco-vim": "https://unpkg.com/monaco-vim/dist/monaco-vim"
            }
        });
        (window as any).require(["monaco-vim"], (MonacoVim: MonacoVimType) => {
            MonacoVim.VimMode.Vim.map('jj', '<Esc>', 'insert');
            MonacoVim.VimMode.Vim.map('U', '<C-r>', 'normal');
            let deactivate = () => {};
            const activate = () => {
                const vimMode = MonacoVim.initVimMode(editor, statusNode);
                deactivate = () => { vimMode.dispose(); };
            }
            activate();

            const activator = {
                activate: activate,
                deactivate: deactivate
            };

            if (setMonacoVimActivator)
                setMonacoVimActivator(() => activator);
            if (!startWithVimMode) activator.deactivate();
        });
    } else {
        VimMode.Vim.map('jj', '<Esc>', 'insert');
        VimMode.Vim.map('U', '<C-r>', 'normal');
        let deactivate = () => {};
        const activate = () => {
            const vimMode = initVimMode(editor, statusNode);
            deactivate = () => { vimMode.dispose(); };
        };
        activate();

        const activator = {
            activate: activate,
            deactivate: deactivate
        };

        if (setMonacoVimActivator)
            setMonacoVimActivator(() => activator);
        if (!startWithVimMode) activator.deactivate();
    }
}

