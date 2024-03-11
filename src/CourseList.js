import React, {useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CourseList() {
    const baseURL = "http://localhost:3000";
    const [courses, setCourses] = useState([]);
    const Navigate = useNavigate();

    const setCourseData = () => {
        axios.get(baseURL + "/Courses")       
        .then((response) => {
            setCourses(response.data);
            // console.log(response.data);
        }).catch(error => {
            alert("Error Ocurred while loading data:" + error);
        });
    }

    useEffect(() => {
        setCourseData();
    }, []);




   
    
    const removeCourse = (id) => { 
        axios.delete(baseURL + "/Courses/" +id)
        .then((response) => {
          alert("Course is deleted");
          setCourseData();
          
        }).catch(error => {
          alert("error==="+error);
        });
    }


    return (
        <div className="App">
            <h1>Course List</h1>
            <Table striped bordered hover variant="dark">
               { <thead>
                    <tr>
                        <th>Id</th>
                        <th>Course</th>
                        <th>Description</th>
                        <th>Actions</th>

                    </tr>
                </thead>
}

                <tbody>
                {
                        courses &&
                        courses.map((course, index) => (
                           

                        <tr>
                            <td>{course.id}</td>
                            <td>{course.name}</td>
                            <td>{course.description}</td>



                            <td>

                                <button  onClick={()=>Navigate('/UpdateList/'+(course.id))} 
                                    className="button"

                              
                                >
                                    <FaEdit />
                                </button> 
                                

                                          | 
                              <button  onClick={() => removeCourse(course.id)}
                                    className="button"

                              
                                >
                                    <FaTrash />
                                </button>
                

                            </td>

                        </tr>
                        ))

                    };

                </tbody>
                
            </Table>

        </div>

    );
}

export default CourseList;