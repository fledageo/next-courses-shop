"use server"

import { createWriteStream } from "fs"
import { InputCourse, addCourse, getCourseByName } from "../api"
import { redirect } from "next/navigation"
import { updateCourse } from "../api"

export interface IUpdateData {
   name: string
   price: number
   duration: number
   id?: number
}

export const handleAdd = async (data: FormData) => {
   const name = data.get("name") as string
   const isExist = getCourseByName(name).CNTREC
   if (isExist) {

      return { error: true, message: "please choose another name for the course" }

   } else {
      const photo = data.get('cover') as File
      let extension = photo.type.split("/").at(-1)
      const filename = Date.now() + "." + extension

      const stream = createWriteStream("public/images/" + filename)

      const bufferedImage = await photo.arrayBuffer()

      stream.write(Buffer.from(bufferedImage))


      let course: InputCourse = {
         name: data.get('name') as string,
         price: +(data.get('price') as string),
         duration: +(data.get('duration') as string),
         cover: 'images/' + filename
      }

      addCourse(course)
      return { error: false, message: "Successfuly added",done:true}
      // redirect("/courses")
   }



}



export const handleUpdate = (data: FormData) => {
   updateCourse(data)
   redirect("/courses")
}