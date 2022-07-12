import axios from 'axios';
import React, {useMemo, useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../../App";
import { refreshAtom } from "../../App";



const baseStyle = {
  // flex: 1,
  display: 'block',
  position:"fixed",
  // flexDirection: 'column',
  width:"300px",
  height:"300px",
  // alignItems: 'center',
  top:"50%",
  left:"50%",
  transform: 'translate(-50%, -50%)',
  padding: '20px',
  borderWidth: 3,
  borderRadius: 30,
  // margin:"0 auto",
  // marginTop:"50%",
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

function StyledDropzone({toggleForm,arg}) {
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
    <div className="imgUploadContainer">
      <div className='formCloseButton' onClick={()=>toggleForm(arg)}><h3>&times;</h3></div>
     
      <div {...getRootProps({style})}>
      {image.length===0&&
      <><input {...getInputProps()} />
        <p>Drag 'n' drop your image here, or click to select image</p></>}
        {image.length>0&&<div>
        {image.map((x,i)=><img className='selectedImg' src={x} key={i}/>)}
        </div>}
        {image.length>0&&<button style={{marginTop:"15%", padding:"10px"}} onClick={handleUpload}>Upload</button>}
      </div>
      <aside>
        {/* <h4>Files</h4> */}
        {/* <ul>{files}</ul> */}
      </aside>
    
      

    </div>
  );
}

export default StyledDropzone