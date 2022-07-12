import axios from 'axios';
import React, {useMemo, useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../../App";
import { refreshAtom } from "../../App";



const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function StyledDropzone(props) {
  const [user, setUser] = useAtom(userAtom);
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const [image, setImage] = useState([])
  // console.log("VENDOR",user)


  const onDrop = useCallback((acceptedFiles,rejectedFiles)=>{
    acceptedFiles.forEach(file=>{
      const reader = new FileReader()
      reader.onload = ()=>{
        setImage(prevState=>[...prevState, reader.result])
      }
      reader.readAsDataURL(file)
    })
  })
 
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    rejectedFiles,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: {'image/*': []}, onDrop,  maxFiles:1});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handleUpload = ()=>{
    console.log(image)
    axios.post(`/api/vendor/testupload/`, image)
    .then(res=>console.log(res))
    .catch(error=>alert(error))
  }


  

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop your image here, or click to select image</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
      {image.length>0&&<div>
        {image.map((x,i)=><img className='selectedImg' src={x} key={i}/>)}
        </div>}
      {image.length>0&&<button onClick={handleUpload}>Upload</button>}

    </div>
  );
}

export default StyledDropzone