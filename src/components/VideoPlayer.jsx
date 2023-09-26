import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./Loader";

const VideoPlayer = () => {
  const params = useParams();
  const [videoInfo, setVideoInfo] = useState(null);
  const [loader, setLoader] = useState(false);

  const fetchData = async () => {
    setLoader(true);
    try {
      const response = await fetch(`/files/${params.id}`);
      const { data } = await response.json();
      console.log(data);
      setVideoInfo(data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      alert("Something went wrong while fetching video");
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-lg flex justify-center py-4">
      {loader && <Loader />}

      {videoInfo && (
        <div>
          <h1 className="font-bold">{videoInfo.title}</h1>
          <p>{videoInfo.description}</p>
          <br />
          <video
            width="650"
            height="450"
            controls
            muted
            loop
            poster={videoInfo.imageURL}
            preload="auto"
          >
            <source src={videoInfo.videoURL} />
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
