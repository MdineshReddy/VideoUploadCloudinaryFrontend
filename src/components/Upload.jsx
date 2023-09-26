import { useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  //when clicked on submit it will upload image and video
  const handleSubmit = async () => {
    setLoader(true);
    if (!title || !description || !image || !video) {
      alert("All Fields are mandatory");
      return;
    }

    try {
      //upload Image and get URL
      const timestamp = Date.now(); // Get the current date and time
      const imageName = `image_${timestamp}`; //  passed current date and time to imageName varialble

      const imageData = new FormData();
      imageData.append("file", image, imageName); // appeded the data and time here
      imageData.append("upload_preset", "ov0twnfe");
      imageData.append("cloud_name", "dxzb2ouxh");

      let imageResponse = await fetch(
        `https://api.cloudinary.com/v1_1/dxzb2ouxh/image/upload`,
        {
          method: "post",
          body: imageData,
        }
      );
      let { url: imageURL } = await imageResponse.json();

      // upload video and get URL
      const videoName = `video_${timestamp}`; // passed current date and time to videoName varialble

      const videoData = new FormData();
      videoData.append("file", video, videoName); // appeded the data and time here
      videoData.append("upload_preset", "ov0twnfe");
      videoData.append("cloud_name", "dxzb2ouxh");

      let videoResponse = await fetch(
        `https://api.cloudinary.com/v1_1/dxzb2ouxh/video/upload`,
        {
          method: "post",
          body: videoData,
        }
      );
      let { url: videoURL } = await videoResponse.json();

      // upload the data to our node server
      await fetch("/files", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageURL,
          videoURL,
        }),
      });
      setLoader(false);
      alert("Data Uploaded Successfully");
      navigate("/videos");
    } catch (error) {
      setLoader(false);
      alert("Something went wrong! Check logs for error information");
      console.log(error);
    }
  };

  return (
    <div className="container-lg flex justify-center">
      <div className="max-w-sm rounded overflow-hidden shadow-lg my-4 p-4">
        {loader && <Loader />}
        <div className="inline-block items-center">
          <label className="text-base block pb-1" htmlFor="title">
            Title:
          </label>
          <input
            className="border-2 border-black rounded-md w-[100%] p-1"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give a Title"
          />
          <label className="pt-4 pb-1 text-base w-[100%]" htmlFor="description">
            Description:
          </label>
          <textarea
            className="border-2 border-black rounded-md w-[100%] p-1"
            type="text"
            id="description"
            rows="7"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Give a Description"
          />

          <div className="form-row mr-4">
            <label className="pt-4 pb-1 text-base w-[100%]" htmlFor="image">
              Upload Thumbnail:
            </label>
            <input
              className="p-1"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(event) => setImage(event.target.files[0])}
            />
          </div>
          <div className="form-row">
            <label className="pt-4 pb-1 text-base w-[100%]" htmlFor="video">
              Upload Video:
            </label>
            <input
              className="p-1"
              type="file"
              accept="video/*"
              onChange={(event) => setVideo(event.target.files[0])}
              required
            />
          </div>
          <button
            className="p-2 mt-4 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Upload Video
          </button>
        </div>
      </div>
    </div>
  );
}

export default Upload;
