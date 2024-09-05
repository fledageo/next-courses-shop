import { getCourseById } from '@/app/lib/api'
import React from 'react'
import "./style.css"
interface IParam{
    id:number
}
interface IProps{
    params:IParam
}
export default function page({params}:IProps) {
    const {id} = params
    const info = getCourseById(id) 
  return (
    <>
        <div className="contanier">
            <div className="course_info_wrapper">
                <img src={`../../${info.cover}`} className='info-img' />
                <span className="info-txt">{info.name}</span>
                <span className="info-txt">{info.duration} Hour</span>
                <span className="info-txt">{info.price} AMD</span>
            </div>
        </div>
    </>
  )
}
