"use client"
import { handleAdd } from "@/app/lib/actions/course-actions";
import { ImagePicker } from "@/app/lib/components/image-picker";
import { useActionState,useEffect,useState } from "react";
interface ICourseState {
    name:string
    price:string
    duration:string
    cover?:File
}

const validation = async (prevState:unknown,formData:FormData) => {
    const name = formData.get("name") as string
    const price = formData.get("price") as string
    const duration = formData.get("duration") as string
    const cover = formData.get("cover") as File


    
    if(name.trim() == "" || price.trim() == "" || duration.trim() == ""){
        return {error:true,message:"please fill all the fields",done:false}
    }else if(isNaN(+price)){
        return {error:true,message:"price must be a number",done:false}
    }else if(isNaN(+duration)){
        return {error:true,message:"duration must be a number",done:false}
    }else if(!cover){
        return {error:true,message:"please add a image",done:false}
    }else{
        return handleAdd(formData)
    }
}
export default function Page(){
    const [actionState, formAction] = useActionState(validation,null);
    const [values,setValues] = useState<ICourseState>({name:"",price:"",duration:""})
    
    useEffect(() => {
        if(actionState?.done){
            setValues({name:"",price:"",duration:""})
        }
    },[actionState])
    
    
    return <div>
        <h1 className="is-size-5">Add Course</h1>
        <div className="columns">
            <div className="column  is-two-fifths my-4">
                <form className="box" action={formAction}>
                    <p className="has-text-danger">{actionState?.error? actionState.message : ""}</p>
                    <div className="field my-4">
                        <input 
                            type="text"
                            className="input is-primary"
                            name="name"
                            placeholder="enter a name"
                            value={values.name}
                            onChange={(e) => {
                                setValues(prev => ({...prev,name:e.target.value}))
                            }}
                        />
                    </div>
                    <div className="field my-4">
                        <input 
                            type="text"
                            className="input is-primary"
                            name="price"
                            placeholder="enter a price"
                            value={values.price}
                            onChange={(e) => {
                                setValues(prev => ({...prev,price:e.target.value}))
                            }}
                        />
                    </div>
                    <div className="field my-4">
                        <input 
                            type="text"
                            className="input is-primary"
                            name="duration"
                            placeholder="enter a duration"
                            value={values.duration}
                            onChange={(e) => {
                                setValues(prev => ({...prev,duration:e.target.value}))
                            }}
                        />
                    </div>
                    <div className="field my-4">
                        <ImagePicker/>
                    </div>
                    <div className="field my-4">
                        <button className="button is-danger">submit</button>
                    </div>
                    <p className="has-text-success">{actionState?.done ? actionState.message : ""}</p>
                </form>
            </div>
        </div>
    </div>
}