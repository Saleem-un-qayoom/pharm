const PrescriptionPopUp = ({ setPopUpModal }) => {
  return (
    <div
      className=" flex  h-screen w-screen absolute top-0 left-0 justify-center items-center "
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 10000000000,
      }}
    >
      <div className="relative  py-12 w-19 bg-white">
        <div className="absolute top-0 flex justify-center items-center background-primary w-full py-2">
          <p className="text-xs font-w-500">Choose Prescription Image</p>
        </div>
        <div className="flex flex-col mx-20 ">
          {/* <span
						className="font10 font-w-600 rounded-md text-center mt-2.5 "
						style={{
							border: '1px solid lightgray',
							padding: '5px 15px',
						}}
						// onClick={() => }
					>
						Take Image
					</span> */}
          <label
            for="cameraFileInput"
            style={{
              border: "1px solid lightgray",
              padding: "5px 15px",
            }}
            className="font10 font-w-600 rounded-md text-center mt-2.5"
          >
            <span class="btn">Open camera</span>

            <input
              id="cameraFileInput"
              type="file"
              accept="image/*"
              capture="environment"
            />
          </label>
          <span
            className="font10 font-w-600 rounded-md text-center mt-2.5"
            style={{
              border: "1px solid lightgray",
              padding: "5px 15px",
            }}
          >
            Choose From Gallery
          </span>
          <span
            className="font10 font-w-600 rounded-md text-center mt-2.5"
            style={{
              border: "1px solid lightgray",
              padding: "5px 15px",
            }}
            onClick={() => setPopUpModal(false)}
          >
            Cancel
          </span>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPopUp;
