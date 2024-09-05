import { getCourseById, updateCourse } from "@/app/lib/api"
import "./style.css"
import EditField from "@/app/lib/components/edit-field"
import { handleUpdate } from "@/app/lib/actions/course-actions"
interface IParam {
  id: number
}
interface IProps {
  params: IParam
}
export default function page({ params }: IProps) {
  const { id } = params
  const info = getCourseById(id)


  return (
    <>
      <div className="container">
        <div className="edit_wrapper">
          <img src={`../../${info.cover}`} />
          <form action={handleUpdate}>
            <EditField name={"name"} initValue={info.name} />
            <EditField name={"price"} initValue={info.price} />
            <EditField name={"duration"} initValue={info.duration} />
            <input type="text" name="id" defaultValue={id} hidden/>  
            <div className="field my-4">
              <button className="button is-danger">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}