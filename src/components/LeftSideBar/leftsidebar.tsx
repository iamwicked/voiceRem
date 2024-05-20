"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "./icon";
import MenuIcon from "@mui/icons-material/Menu";

const options: Map<string, string> = new Map();

options.set("Remover", "/");
options.set("Splitter", "/splitter");
options.set("Pitcher", "/pitcher");
options.set("Key BPM Finder", "/bpm");
options.set("Cutter", "/cutter");
options.set("Joiner", "/joiner");
options.set("Recorder", "/recorder");
options.set("Karaoke", "/karaoke");
options.set("Support", "/support");

export default function LeftSidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start as collapsed
    return (
        <>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed left-0 top-0 z-50 p-4 bg-gray-800 rounded-r-full focus:outline-none hover:bg-gray-700 transition-all duration-300"
          >
            <MenuIcon sx={{ color: "white" }} />
          </button>
          <div className={`sidebar-container ${isSidebarOpen ? 'w-20' : 'w-0'} fixed left-0 top-0 h-screen z-40 transition-transform duration-300 ease-in-out transform`}>
            <aside
              className={`sidebar transition-all duration-300 ease-in-out transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } h-screen z-40 bg-gray-800 text-white overflow-y-auto`}
            >
              <div className="flex flex-col space-y-2 h-full items-center pt-20">
                {Array.from(options.entries()).map(([name, route], index) => (
                  <Icon key={index} name={name} route={route} isSidebarOpen={isSidebarOpen} />
                ))}
                {isSidebarOpen && (
                  <Image
                    src="/flag.png"
                    alt="Flag"
                    width={32}
                    height={32}
                    className="mt-auto mb-8"
                  />
                )}
              </div>
            </aside>
          </div>
        </>
      );
    }