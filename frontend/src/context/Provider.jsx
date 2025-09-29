'use client'
import { Context } from "./Context";
import * as img from '@/assets/imgs/index.js'
import { useState } from "react";

export const StoreProvider = ({ children }) => {
    // const resource = [
    //     {id: 1, matChu: "Nâng",nghia: "Số 1", img: img.ptr1, audio: "/audio/so1.m4a"},
    //     {id: 2, matChu: "Sloong",nghia: "Số 2", img: img.ptr2, audio: "/audio/so2.m4a"},
    //     {id: 3, matChu: "Slam",nghia: "Số 3", img: img.ptr3, audio: "/audio/so3.m4a"},
    //     {id: 4, matChu: "Slí",nghia: "Số 4", img: img.ptr4, audio: "/audio/so4.m4a"},
    //     {id: 5, matChu: "Hả",nghia: "Số 5", img: img.ptr5, audio: "/audio/so5.m4a"},
    // ]
    const resource = [
         {id: 1, matChu: "Nâng", nghia: "Số một", options: ["Số một", "Số hai", "Số ba","Số bố","Số năm"], audio: "/audio/so1.m4a"},
    ]
    const [data, setData] = useState(resource)

    return (
        <Context.Provider value={{ data, setData }}>
            {children}
        </Context.Provider>
    )
}