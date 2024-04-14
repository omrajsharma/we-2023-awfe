import { Box, Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { validateNotLoggedInUser } from "../utility/protectRoutes";
import snackbar from "../utility/snackbar";
import { UserContext } from "../context/UserContext";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { ref, uploadBytesResumable } from "firebase/storage";
import {storage} from "../../FirebaseConfig"

const descDefaultValue = `Type: House/Apartment/Condo/Villa/Other
Bedrooms: 
Bathrooms: 
Furnishing: Non/Semi/Fully Furnished
Listed by: 
Super Builtup area (ft²): 
Carpet Area (ft²): 
Bachelors Allowed: 
Maintenance (Monthly): 
Total Floors: 
Floor No: 
Car Parking: Yes/No
Facing: North/East/West/South
Project Name: `;


const ListProperty = () => {
  validateNotLoggedInUser();
  const navigate = useNavigate();

  const [files, setFiles] = useState(null);
  const [imagePaths, setImagePaths] = useState([]);
  const title = useRef();
  const location = useRef();
  const price = useRef();
  const description = useRef();
  const listType = useRef();


  console.log(files, imagePaths);

  const onImgChange = event => {
    if(event.target.files) {
      setFiles(event.target.files);
      let imagePathList = [];
      for (const file of event.target.files) {
        imagePathList.push(URL.createObjectURL(file))
      }
      setImagePaths(imagePathList)
    }
  }

  const handleOnSubmit = async (ev) => {
    ev.preventDefault();

    // upload images
    let imgList = [];
    for(const file of files) {
      const fileExt = file.name.split('.').pop();
      const randomFileName = `${uuidV4()}.${fileExt}`;
      const storageRef = ref(storage, `/properties/${randomFileName}`);
      const upload = uploadBytesResumable(storageRef, file);
      imgList.push(`https://firebasestorage.googleapis.com/v0/b/lb-we-2023.appspot.com/o/properties%2F${randomFileName}?alt=media&token=a45cba19-7562-44cb-b5a5-bd236886ea97`)
    }

    // API call
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/property`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title.current.value,
        location: location.current.value,
        price: price.current.value,
        description: description.current.value,
        listType: listType.current,
        imgList: imgList
      }),
      credentials: 'include'
    })
    const data = await response.json();
    if (response.status == 201) {
      snackbar('success', data.message)
      return navigate("/")
    } else {
      snackbar('error', data.error)
    }
  }


  return (
    <Container>
      <div className="container-sm">
        <Box
          sx={{
            marginTop: "100px",
            width: "100%",
            border: "1px solid #cecece",
            padding: "16px",
            borderRadius: "12px",
          }}
        >
          <h1 style={{ marginBottom: "8px", textAlign: 'center'}}>List your property</h1>
          <form onSubmit={handleOnSubmit}>
            <FormLabel className="form-label-block" required>Upload Property Images</FormLabel>
            <ImageGallary imgPaths={imagePaths} />
            <input type="file" accept="image/*" className="list-property-img-input" onChange={onImgChange} multiple />

            <FormLabel className="form-label-block" required>Listing Type</FormLabel>
            <RadioGroup
              row
              onChange={ev => listType.current = ev.target.value}
            >
              <FormControlLabel value="RENT" control={<Radio />} label="Rent" />
              <FormControlLabel value="SELL" control={<Radio />} label="Sell" />
            </RadioGroup>

            <TextField 
              fullWidth
              label="Title"
              variant="filled"
              autoComplete="off"
              inputRef={title}
              required
            />

            <TextField 
              fullWidth
              label="Location"
              variant="filled"
              autoComplete="off"
              inputRef={location}
              required
            />

            <TextField 
              type="number"
              fullWidth
              label="Price"
              variant="filled"
              autoComplete="off"
              inputRef={price}
              required
            />

            <TextField 
              fullWidth
              multiline
              rows={14}
              defaultValue={descDefaultValue}
              label="Description"
              variant="filled"
              autoComplete="off"
              inputRef={description}
              required
            />

            <Button variant="contained" type="submit" sx={{marginTop: "20px", width: "100%"}}>
              Post
            </Button>
          </form>
        </Box>
      </div>
    </Container>
  );
};

function ImageGallary({imgPaths}) {
  if(imgPaths && imgPaths.length > 0) {
    return (
      <div className="list-property-gallary">
        {
          imgPaths.map(imgPath => (
            <div className="list-property-gallary-img">
              <img src={imgPath} alt="" />
            </div>
          ))
        }
      </div>
    )
  }
}

export default ListProperty;
