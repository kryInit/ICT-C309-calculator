import React, {FC, useState} from "react";
import { MonacoVimActivator } from "~/components/functional/SetupMonacoVim";

type VimStateButtonProps = {
    vimActivator: MonacoVimActivator,
    style: React.CSSProperties | undefined,
};
const VimStateButton: FC<VimStateButtonProps> = ({vimActivator, style = undefined}) => {
    const [enabledVim, setEnabledVim] = useState(false);

    return (
        <button
            style={style}
            onClick={() => {
                if (enabledVim) vimActivator.deactivate();
                else vimActivator.activate();
                setEnabledVim(current => !current);
            }}
        >
            {enabledVim ? "disable vim" : "enable vim"}
        </button>
    )
}

export default VimStateButton;