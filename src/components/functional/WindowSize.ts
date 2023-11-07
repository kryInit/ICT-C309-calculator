import {useEffect, useState} from "react";
import { Pos } from "../model/Pos";

export const getWindowSizeState: () => Pos = () => {
    const getWindowSize: () => Pos = () => Object({x: window.innerWidth, y: window.innerHeight});
    const [windowSize, setWindowSize] = useState<Pos>(getWindowSize);

    // set window size update function on initial rendering
    useEffect(() => {
        const onResize = () => setWindowSize(getWindowSize);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [])

    return windowSize;
}

