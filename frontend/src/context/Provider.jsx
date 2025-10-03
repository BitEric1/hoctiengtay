'use client'
import { Context } from "./Context";
import * as img from '@/assets/imgs/index.js'
import { useState } from "react";

export const StoreProvider = ({ children }) => {
    const resource = [
         {id: 1,slug: 'bai-1',done: false, matChu: "Nâng", nghia: "Số một", options: ["Số một", "Số hai", "Số ba","Số bố","Số năm"], audio: "/audio/so1.m4a"},
         {id: 2,slug: 'bai-2',done: false, matChu: "Nâng", nghia: "Số một", options: ["Số một", "Số hai", "Số ba","Số bố","Số năm"], audio: "/audio/so1.m4a"},
    ]
    const [data, setData] = useState(resource)

    return (
        <Context.Provider value={{ data, setData }}>
            {children}
        </Context.Provider>
    )
}