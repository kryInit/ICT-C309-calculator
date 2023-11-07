import React, { FC } from "react";
import VimStateButton from "./VimStateButton";
import { MonacoVimActivator } from "~/components/functional/SetupMonacoVim";

type BottomMenuProps = {
    vimActivator: MonacoVimActivator
}
const BottomMenu: FC<BottomMenuProps> = ({vimActivator}) => {
    return (
        <div style={{display: "flex"}}>
            <code className="status-node" style={{fontSize: 20, margin: "auto 0"}} />
            <VimStateButton
                style={{
                    height: "40px",
                    width: "200px",
                    marginLeft: "auto",
                    fontSize: 20,
                    fontFamily: "menlo"
                }}
                vimActivator={vimActivator}
            />
        </div>
    )
}

export default BottomMenu;