'use client';

import { useState } from "react";
import Icon from "./icon";
import MenuIcon from '@mui/icons-material/Menu';

const options: Map<string, string> = new Map();

options.set("Remover", "/")
options.set("Splitter", "/splitter")
options.set("Pitcher", "/pitcher")
options.set("Key BPM Finder", "/bpm")
options.set("Cutter", "/cutter")
options.set("Joiner", "/joiner")
options.set("Recorder", "/recorder")
options.set("Karaoke", "/karaoke")
options.set("Support", "/support")

export default function LeftSidebar() {

    const [showSideBar, setShowSideBar] = useState<boolean>(true);

    return (
        <>
            <div className="fixed left-0 top-0 z-40 flex justify-center items-center hover:rounded-[20px] hover:bg-red-300 w-20 h-20" onClick={() => setShowSideBar(!showSideBar)}>
                <MenuIcon fontSize="large" />
            </div>
            {showSideBar &&
                <div className="fixed left-0 top-0 w-20 h-[100vh] z-30 text-center border-solid border-r-[3px] pt-20">
                    {Array.from(options.entries()).map(([name, route], index) => <Icon key={index} name={name} route={route} />)
                    }
                </div>
            }

        </>
    );
}