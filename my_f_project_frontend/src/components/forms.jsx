import React, { useState, useRef } from "react";

function Form({ onSuccess }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (files) => {
    const selectedFiles = Array.from(files.target.files);
    setFiles(selectedFiles);
    console.log("Selected Files:", selectedFiles.map(file => file.name));
  };

  const handleSubmit = async (data) => {
    data.preventDefault();

    if (files.length === 0) {
      alert("Please select at least one file");
      return;
    }

    setLoading(true);

    const uploadPromises = files.map(async (file) => {
      const title = file.name.replace(/\.[^/.]+$/, "");
      const description = file.name;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", file);

      const res = await fetch("http://127.0.0.1:8000/api/v1/files", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(`${file.name} → ${err.message || "Failed"}`);
      }
      return res.json();
    });

    try {
      await Promise.all(uploadPromises);
      alert(`${files.length} files uploaded successfully!\nEach file created its own record`);

      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (onSuccess) onSuccess();

    } catch (err) {
      alert("Some files failed:\n" + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-5 p-5 border rounded shadow bg-white">
      <p className="text-center text-success mb-4">
        Select many files → Each file becomes 1 record with auto title/description
      </p>

      <form onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <input
            ref={fileInputRef}
            type="file"
            className="form-control form-control-lg"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileChange}
            disabled={loading}
            style={{ fontSize: "1.2rem", padding: "20px" }}
          />
          <small className="text-muted d-block mt-2">
            Hold Ctrl (Windows) or Cmd (Mac) to select multiple files
          </small>
        </div>

        {files.length > 0 && (
          <div className="mb-4 p-4 bg-light rounded border">
            <h5 className="text-success">
              {files.length} file(s) selected → Will create {files.length} records:
            </h5>
            {files.map((file, i) => (
              <div key={i} className="border p-3 my-2 rounded bg-white">
                <strong>Title:</strong> {file.name.replace(/\.[^/.]+$/, "")}<br />
                <strong>Description:</strong> {file.name}<br />
                <span className="badge bg-primary">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-success btn-lg px-5"
            disabled={loading || files.length === 0}
          >
            {loading ? (
              <>Uploading {files.length} files...</>
            ) : (
              <>Upload {files.length} Files Now</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;