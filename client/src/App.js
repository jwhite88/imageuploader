import React, { useState } from "react"
import './App.css';
import axios from "axios"

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("")
  const [myimage, setMyimage] = useState()

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    // console.log("value: ", value)

    switch (name) {
      case "name":
        setName(value)
        break;

      case "description":
        setDescription(value)
        break;

      case "myimage":
        console.log("file:", evt.target.files[0])
        setMyimage(evt.target.files[0])
        break;

      default:
        break;
    }

  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData()

    formData.append("name", name)
    formData.append("description", description);
    formData.append("myimage", myimage)

    console.log("formData: ", formData.get("myimage"))

    // Using axios, write a post request to the following URL: http://localhost:3001/api/images 
    // and pass in the formData object as the second argument to the post method.
    //make sure to set the headers to multipart/form-data

    axios.post("http://localhost:3001/api/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        console.log("response: ", response)
        setName("");
        setDescription("");
        setMyimage(null);
      })
      .catch(err => {
        console.log("error: ", err)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input id="name" type="text" name="name" value={name} onChange={handleChange} />
        </label>
        <label htmlFor="description">
          Description:
          <textarea cols="25" id="description" type="text" name="description" value={description} onChange={handleChange} />
        </label>
        <label htmlFor="myimage">
          File Upload:
          <input id="myimage" type="file" name="myimage" onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
