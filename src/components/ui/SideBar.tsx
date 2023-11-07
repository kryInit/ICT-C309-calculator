import {FC, useEffect, useState} from 'react'
import './SideBar.css'
import { getWindowSizeState } from "../functional/WindowSize";

const SideBar: FC = () => {
    const windowSize = getWindowSizeState();
    return (
        <div style={{position: "sticky", top: "0px", left: "0px"}} >
            <div style={{ width:"300px", height: `${windowSize.y}px`, background:"#333333", position: "absolute"}} >
                <div style={{display: "flex"}}>
                    <div style={{fontFamily: "KarakazeM", fontSize: "45px", margin:"auto"}}>side bar</div>
                    {/*<div style={{width: 80, height: 50, background:"#888888", margin: "auto 0 auto auto"}}/>*/}
                    <HamburgerButton/>
                </div>
                <p style={{fontSize: "20px"}}>{windowSize.x} {windowSize.y}</p>
                <p style={{fontSize: "20px"}}>{Math.random()}</p>
            </div>
        </div>
    )
}

const HamburgerButton: FC = () => {
    const [pressed, setPressed] = useState(false);
    return (
        <div style={{width: 80, height:50, margin: "auto 0", right: 0, display:"flex", flexDirection:"column"}} >
            <div style={{zIndex: 100, width: 80, height: 50, position: "absolute", margin: "auto"}}>
                <div
                    style={{width: pressed ? 50 : 80, height:50, left: 0, right: 0, margin:"0 auto", padding: "0"}}
                    onClick={() => setPressed(current => !current)}
                />
            </div>
            <style>
                {
                    `
          @keyframes topBar {
          from { transform: translateY(0%); animation-timing-function: ease-in; }
          40%  { transform: translateY(16.5px) rotate(90deg); }
          to   { transform: translateY(16.5px) rotate(-45deg) scaleX(0.7) scaleY(1.2); }
          }
          @keyframes midBar {
          from { transform: translateY(0%); animation-timing-function: ease-in; }
          40%  { transform: rotate(-90deg) scaleX(1); }
          41%  { transform: scaleX(0); }
          to   { transform: scaleX(0); }
          }
          @keyframes bottomBar {
          from { transform: translateY(0%); animation-timing-function: ease-in; }
          40%  { transform: translateY(-16.5px) rotate(90deg); }
          to   { transform: translateY(-16.5px) rotate(225deg) scaleX(0.7) scaleY(1.2); }
          }
          `
                }
            </style>
            {[...Array(3)].map((_, i) =>
                <div
                    key={i}
                    style={{
                        width: 64,
                        height: 7,
                        background:"#ffffff",
                        margin:"auto auto",
                        borderRadius: 2.5,
                        animation: !pressed ? "" : (i == 0 ? "top" : i == 1 ? "mid" : "bottom") + "Bar 0.8s both",
                    }}
                />
            )}
        </div>
    )
}

export default SideBar
