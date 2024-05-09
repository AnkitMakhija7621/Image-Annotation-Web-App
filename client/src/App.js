import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [images, setImages] = useState([]);
    const [classNames, setClassNames] = useState(['airplane', 'automobile', 'bird','cat','deer','dog','frog','horse','ship','truck', 'Unlabeled']);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        const response = await axios.get('http://localhost:5000/images');
        setImages(response.data);
    };

    const onDrop = useCallback((acceptedFiles) => {
        handleFileUpload(acceptedFiles);
    }, []);
    const handleSearch = async () => {
      const response = await axios.get(`http://localhost:5000/images/search?annotation=${search}`);
      setImages(response.data);
  };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleFileUpload = async (files) => {
        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('image', files[i]);
            await axios.post('http://localhost:5000/images', formData);
        }
        fetchImages();
    };

    const handleAnnotationChange = async (id, annotation) => {
        await axios.put(`http://localhost:5000/images/${id}`, { annotation });
        fetchImages();
    };

    return (
        <div className="App container">
            <h1 className="my-4">Image Annotation</h1>
            <div>
                <input
                    className='form-control mb-2'
                    type="text"
                    placeholder="Search by annotation..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
                <button onClick={handleSearch} className='btn btn-primary mb-4 '>  Search  </button>
            </div>
            <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? 'dropzone-active' : ''}`}
                style={{ border: '2px dashed #cccccc', padding: '20px', textAlign: 'center' }}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                )}
            </div>

            <div className="row mt-4">
                {images.map((image) => (
                    <div key={image._id} className="col-md-3 mb-4">
                        <div className="card">
                            <img
                                src={`http://localhost:5000/uploads/${image.filename}`}
                                alt="uploaded"
                                className="card-img-top"
                                style={{ objectFit: 'cover', height: '200px' }}
                            />
                            <div className="card-body">
                                <select
                                    className="form-select"
                                    value={image.annotation}
                                    onChange={(e) => handleAnnotationChange(image._id, e.target.value)}
                                >
                                    {classNames.map((className) => (
                                        <option key={className} value={className}>
                                            {className}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
