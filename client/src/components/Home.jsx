import { useState, useEffect } from "react";
import Api from "../Api";
import "../Home.css";

const Home = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchImages = async () => {
    try {
      const res = await Api.get("/getImage");

      if (res.data.success) {
        setImages(res.data.images);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);

    try {
      setLoading(true);

      const res = await Api.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        fetchImages();
        setFile(null);
        setDescription("");
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      

      <form className="upload-bar" onSubmit={handleSubmit}>
        
  
        <label className="image-picker">
          {file ? (
            <img src={URL.createObjectURL(file)} alt="preview" />
          ) : (
            <span>+</span>
          )}

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            hidden
          />
        </label>

     
        <input
          type="text"
          placeholder="Write something..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="small-input"
        />

    
        <button type="submit" className="upload-btn">
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

     
      <h3 className="title">Recent Posts</h3>

      <div className="grid">
        {images.map((img) => (
          <div key={img._id} className="card">
            <img src={img.imageUrl} alt="uploaded" />
            <p>{img.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;