import React from 'react'
import { getAllCourses } from '../lib/api';
import { CourseBlock } from '../lib/components/course-block/course-block';
import "./style.css"

export default function page() {
    const items = getAllCourses()
    return (
      <>
      <div className="corses_container">
        {
          items.map(course => <CourseBlock key={course.id} info={course}/>)
        }
      </div>
      </>
    );
}
