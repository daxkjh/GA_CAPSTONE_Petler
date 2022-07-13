import { useMemo, useCallback, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../../App";
import { refreshAtom } from "../../App";
import jwtDecode from "jwt-decode";

//#######################     DROPZONE STYLING Start  #################################

const baseStyle = {
  display: "block",
  position: "relative",
  width: "300px",
  height: "300px",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  margin: "0 auto",
  padding: "20px",
  borderWidth: 3,
  borderRadius: 30,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

// #####################     DROPZONE STYLING Ends  ##################################

const EditUserPetsForm = ({ toggleForm, selectedPet }) => {
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const [user, setUser] = useAtom(userAtom);
  const [petName, setPetName] = useState(selectedPet?.name);
  const [petType, setPetType] = useState(selectedPet?.type);
  const [petBreed, setPetBreed] = useState(selectedPet?.breed);
  const [petSize, setPetSize] = useState(selectedPet?.size);
  const [petSterilized, setPetSterilized] = useState(selectedPet?.sterilized);
  const [petBirth, setPetBirth] = useState(selectedPet?.birth);

  //###############################  DROPZONE FILES START #######################################
  const [image, setImage] = useState([]);
  const role = jwtDecode(localStorage.getItem("token")).role;

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImage((prevState) => [...prevState, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  });

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    rejectedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: { "image/*": [] }, onDrop, maxFiles: 1 });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  //########################    DROPZONE FILE END  #########################################
  const DogOption = () => {
    return (
      <>
        <select
          onChange={handleBreed}
          name="breed"
          id="breed"
          defaultValue={petBreed}
        >
          <option value="Pomeranian">Pomeranian</option>
          <option value="Labrador Retriever">Labrador Retriever</option>
          <option value="Poodle">Poodle</option>
          <option value="Chihuahua">Chihuahua</option>
          <option value="Golden Retriever">Golden Retriever</option>
          <option value="Others">Others</option>
        </select>
      </>
    );
  };

  const CatOption = () => {
    return (
      <>
        <select
          onChange={handleBreed}
          name="breed"
          id="breed"
          defaultValue={petBreed}
        >
          <option value="British Shorthair">British Shorthair</option>
          <option value="Russian Blue">Russian Blue</option>
          <option value="Siberian">Siberian</option>
          <option value="Munchkin">Munchkin</option>
          <option value="Siamese">Siamese</option>
          <option value="Others">Others</option>
        </select>
      </>
    );
  };

  const handleBreed = (e) => {
    e.preventDefault();
    setPetBreed(e.target.value);
  };

  const handleType = (e) => {
    e.preventDefault();
    setPetType(e.target.value);
  };

  const handleSize = (e) => {
    e.preventDefault();
    setPetSize(e.target.value);
  };

  const handlePetName = (e) => {
    e.preventDefault();
    setPetName(e.target.value);
  };

  const handleBirth = (e) => {
    e.preventDefault();
    setPetBirth(e.target.value + "T00:00:00.000Z");
    console.log(e.target.value);
  };

  const handleSterilized = (e) => {
    setPetSterilized(e.target.checked);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    confirm("Are you sure? Your Pet WILL be Deleted!") /// WILLL DO CSS
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
    const data = {
      id: selectedPet.id
    }
    axios.delete(`/api/userprofile/pet/${user?.id}`, {headers, data})
    .then((res) => {
      setRefresh(!refresh);
      toggleForm("editpet");
      alert(res.data.msg);
    })
    .catch((error) => console.log("error", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `/api/userprofile/pet/${user?.id}`,
        {
          id: selectedPet?.id,
          name: petName,
          type: petType,
          breed: petBreed,
          birth: petBirth,
          data: image[0] || selectedPet?.image,
          size: petSize,
          sterilized: petSterilized,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setRefresh(!refresh);
        toggleForm("editpet");
        alert(res.data.msg);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="EditPetFormContainer">
      <button onClick={() => toggleForm("editpet")}>Close</button>
      <div className="EditPetFormActual">
        <h1>Edit Pet</h1>

        <div className="petImgUploadContainer">
          {/* <div className="formCloseButton" onClick={() => toggleForm(arg)}>
        <h3>&times;</h3>
      </div> */}

          {image.length === 0 && (
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop your image here, or click to select image</p>
            </div>
          )}
          {image.length > 0 && (
            <div style={style}>
              <div>
                {image.map((x, i) => (
                  <img className="selectedImg" src={x} key={i} />
                ))}
              </div>
              {/* <button
            style={{ marginTop: "15%", padding: "10px" }}
            onClick={handleUpload}
          >
            Upload
          </button> */}
              <div
                onClick={() => setImage([])}
                style={{ display: "inline-block" }}
              >
                <img
                  style={{ width: "1.5rem", height: "1.5rem" }}
                  src="https://i.imgur.com/NYx460Q.png"
                ></img>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Edit Pet Info</legend>
            <label htmlFor="petName">Pet Name</label>
            <input
              onChange={handlePetName}
              value={petName}
              type="text"
              name="petName"
              id="petName"
            />
            <br></br>
            <label htmlFor="type">Type</label>
            <select
              onChange={handleType}
              name="type"
              id="type"
              defaultValue={petType}
            >
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
            </select>
            <br></br>
            <label htmlFor="breed">Breed</label>
            {/* <select name="breed" id="breed"> */}
            {petType === "dog" ? <DogOption /> : <CatOption />}
            <br></br>
            {/* </select> */}
            <label htmlFor="birthday">Birthday</label>
            <input
              onChange={handleBirth}
              type="date"
              id="birthday"
              name="birthday"
              defaultValue={petBirth}
            ></input>
            <br></br>
            <label htmlFor="size">Size</label>
            <select
              onChange={handleSize}
              name="size"
              id="size"
              defaultValue={petSize}
            >
              <option value="xs">1 - 5 KG</option>
              <option value="s">5 - 10 KG</option>
              <option value="m">10 - 20 KG</option>
              <option value="l">20 - 40 KG</option>
              <option value="xl">40+ KG</option>
            </select>
            <label htmlFor="sterilized">Sterilized</label>
            <input
              onChange={handleSterilized}
              type="checkbox"
              name="sterilized"
              id="sterilized"
              defaultChecked={petSterilized}
            />
            <button>Apply</button>
          </fieldset>
        </form>
        <div>
          <p className="edit" onClick={handleDelete}>
            Delete Pet
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditUserPetsForm;
