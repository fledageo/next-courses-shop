"use client"
import React from 'react'
import { useState } from 'react'
interface IProps{
    name:string
    initValue:string | number
}
export default function EditField({name,initValue}:IProps) {
    const [value,setValue] = useState(initValue)
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value)
    }
    return (
        <>
            <div className="field my-4">
                <input
                    type="text"
                    className="input is-primary"
                    name={name}
                    placeholder={`enter a ${name}`}
                    value={value}
                    onChange={(e) => handleChange(e)}
                />
            </div>
        </>
    )
}
