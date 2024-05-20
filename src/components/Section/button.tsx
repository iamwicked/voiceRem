'use client';
import { useRef } from "react";

export default function Button(){
    const fileInputRef = useRef<HTMLInputElement>(null);
    return(
        <>
        <div className="border border-solid rounded-[10px] block p-[10px]" onClick={()=>
            {
                if (fileInputRef.current)
                fileInputRef.current.click()
            }}>
            Browse my files
        </div>
             <input
             type="file"
             ref={fileInputRef}
             className="hidden"
           />
        </>
    )
}