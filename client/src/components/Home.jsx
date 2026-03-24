import { useState, useEffect } from "react";
import Api from "../Api";
import "../Home.css";

const Home = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH IMAGES
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

  // 🔥 Load images on page load
  useEffect(() => {
    fetchImages();
  }, []);

  // 🔥 HANDLE SUBMIT
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
        fetchImages(); // 🔥 refresh UI
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
      
      {/* 🔥 UPLOAD BAR */}
      <form className="upload-bar" onSubmit={handleSubmit}>
        
        {/* 🟢 IMAGE PICKER */}
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

        {/* 🟢 INPUT */}
        <input
          type="text"
          placeholder="Write something..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="small-input"
        />

        {/* 🟢 BUTTON */}
        <button type="submit" className="upload-btn">
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* 🔥 IMAGE GRID */}
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