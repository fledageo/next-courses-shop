import "./style.css"
import { ICourse } from "../../api"
import Image from "next/image"
import Link from "next/link"
interface IProps{
    info:ICourse
}
export const CourseBlock = ({info}:IProps) => {
    
    return <>
        <div className="course_block">
            <div className="info_wrapper">
                <div className="info_img_wrapper">
                    <img src={info.cover} className="info_img"/>
                </div>
                <span className="info-txt">{info.name}</span>
                <span className="info-txt">{info.price} AMD</span>
                <div className="links">
                    <Link href={`/courses/details/${info.id}`}>Details</Link>
                    <Link href={`/courses/edit/${info.id}`}>Edit</Link>
                </div>
            </div>
        </div>
    </>
}