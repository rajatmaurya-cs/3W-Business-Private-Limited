import { useState, useEffect } from "react";
import Api from "../Api";
import "../Home.css";
const Home = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const fetchImages = async () => {
    try {
      setFetching(true);
      const res = await Api.get("/getImage");

      if (res.data.success) {
        setImages(res.data.images);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
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
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Loader for fetching images */}
      {fetching && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              border: "6px solid #f3f3f3",
              borderTop: "6px solid #3498db",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              animation: "spin 1s linear infinite",
            }}
          />
          {/* Inline keyframes */}
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}

      <form
        style={{ display: "flex", gap: "10px", margin: "20px 0" }}
        onSubmit={handleSubmit}
      >
        <label
          style={{
            border: "1px dashed #ccc",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: "24px" }}>+</span>
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
          style={{ flex: 1, padding: "8px" }}
        />

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            background: "#3498db",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <h3 style={{ marginBottom: "10px" }}>Recent Posts</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "15px",
        }}
      >
        {images.map((img) => (
          <div
            key={img._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <img
              src={img.imageUrl}
              alt="uploaded"
              style={{ width: "100%", borderRadius: "4px" }}
            />
            <p style={{ marginTop: "8px" }}>{img.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
