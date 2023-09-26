import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

function Listing() {
  const [videoList, setVideoList] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchData = async () => {
    setLoader(true);
    try {
      const response = await fetch("/files");
      const { data } = await response.json();
      console.log(data);
      setVideoList(data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      alert("Something went wrong while fetching videos");
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-lg flex justify-center py-4">
      {loader && <Loader />}
      <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 py-4">
        {videoList.length > 0 &&
          videoList.map((video) => (
            <Link to={`/videos/${video._id}`} key={video._id}>
              <div
                className="max-w-sm rounded overflow-hidden shadow-lg m-3"
                style={{ cursor: "pointer" }}
              >
                <img
                  className="w-fit m-auto p-3"
                  src={video.imageURL}
                  alt={video.description}
                />
                <div className="px-6 pt-0 pb-2">
                  <div className="title font-bold">{video.title}</div>
                  <p>
                    {video.description.length > 50
                      ? `${video.description.substring(0, 50)}...`
                      : video.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
export default Listing;
