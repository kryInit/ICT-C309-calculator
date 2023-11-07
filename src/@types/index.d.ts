declare module "monaco-vim" {
    export interface EditorVimMode {
        dispose: () => void;
    }

    type InitVimModeType = (editor: monaco.editor.IStandaloneCodeEditor, statusElm: Element) => EditorVimMode;
    const initVimMode: InitVimModeType;
    export { initVimMode };

    type VimModeType = {
        Vim: {
            noremap: (from: string, to: string) => void;
            map: (from: string, to: string, mode: string) => void;
        };
    };
    const VimMode: VimModeType;
    export { VimMode };

    export type MonacoVimType = {
        initVimMode: InitVimModeType,
        VimMode: VimModeType,
    };
}