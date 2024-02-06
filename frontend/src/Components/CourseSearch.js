import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CourseSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/courses?search=${searchTerm}`);
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (searchTerm.trim() !== '') {
            fetchData();
        } else {
            setCourses([]);
        }
    }, [searchTerm]);

    const handleOptionSelected = (event, value) => {
        if (value) {
            const selectedCourse = courses.find(course => course.name === value);
            if (selectedCourse) {
                navigate(`/courses/${selectedCourse.code}`);
            }
        }
    };

    return (
        <Autocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            inputValue={searchTerm}
            onInputChange={(event, newInputValue) => {
                setSearchTerm(newInputValue);
            }}
            options={courses.map((course) => course.name)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search Courses"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        onBlur: (event) => {
                            if (event.relatedTarget === null) {
                                setOpen(false);
                            }
                        }
                    }}
                />
            )}
            onChange={handleOptionSelected}
            sx={{ height: '40px', width: '400px' }}
        />
    );
}

export default CourseSearch;
