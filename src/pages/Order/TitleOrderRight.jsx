import React from "react";

const TitleOrderRight = () => {
  return (
    <div>
      {" "}
      <div className="flex">
        <div className="flex-1 py-5 pl-5 overflow-hidden">
          <svg
            className="inline align-text-top"
            width="21"
            height="20.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g>
              <path
                d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z"
                fill="none"
                id="svg_1"
                stroke="null"
              ></path>
              <path
                d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z"
                id="svg_2"
              ></path>
              <circle cx="7.04807" cy="6.97256" r="2.5" id="svg_3"></circle>
            </g>
          </svg>
          <h1 className="inline text-2xl font-semibold leading-none">
            Receiver
          </h1>
        </div>
        <div className="flex-none pt-2.5 pr-2.5 pl-1"></div>
      </div>
    </div>
  );
};

export default TitleOrderRight;
