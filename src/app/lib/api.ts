import Database from 'better-sqlite3'
import { IUpdateData } from './actions/course-actions'

export interface ICourse{
    id:number
    name:string
    price:number
    cover:string
    duration:number
}

export type InputCourse = Omit<ICourse,'id'>

const db = new Database("courses.db")


export const addCourse = (course:InputCourse) => {
    db.prepare(`
            INSERT INTO courses(name, price, cover, duration)
            VALUES(@name, @price, @cover, @duration)
    `).run(course)
}

export const getAllCourses = ():ICourse[] => {
    return db.prepare(`
            SELECT * FROM courses
    `).all() as ICourse[]
}
export const getCourseById = (id:number):ICourse => {
    return db.prepare(`
        SELECT
            *
        FROM
            courses
        WHERE
            id = ${id}
    `).get() as ICourse
}

export const getCourseByName = (name:string) => {
    return db.prepare(`
        SELECT COUNT(*) AS CNTREC FROM courses WHERE name='${name}';
    `).get() as {CNTREC:number}
}

export const updateCourse = (data: FormData) => {
    const name = data.get("name") as string;
    const price = +(data.get("price") as string);
    const duration = +(data.get("duration") as string);
    const id = +(data.get("id") as string); // Преобразуйте id в число, если это необходимо

    db.prepare(`
        UPDATE courses
        SET name = ?, price = ?, duration = ?
        WHERE id = ?
    `).run(name, price, duration, id);
};