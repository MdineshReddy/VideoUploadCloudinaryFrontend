import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const onToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="bg-black">
      <nav className="flex justify-between items-center h-16 sticky text-white z-10">
        <div className="logo text-xl mx-4">
          <Link to="/">TubeToday</Link>
        </div>
        <div className="menu hidden md:block">
          <FontAwesomeIcon
            icon={faBars}
            onClick={onToggle}
            className="cursor-pointer mx-4 "
          />
        </div>
        <div
          className={`md:absolute md:bg-black md:min-h-[60vh] min-h-fit left:0 md:w-full md:z-[-1] md:flex md:items-center ${
            isNavOpen ? "top-[9%]" : "top-[-400px]"
          }`}
        >
          <ul className="flex mx-6 md:flex-col md:m-auto md:space-y-8">
            <li className="mr-10 md:mr-0">
              <Link className="hover:text-red-500 active:text-gray-400 " to="/">
                Home
              </Link>
            </li>
            <li className="mr-10 md:mr-0">
              <Link
                className="hover:text-red-500 active:text-gray-400"
                to="/videos"
              >
                Videos
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
