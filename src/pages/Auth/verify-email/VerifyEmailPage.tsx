import quickgradelogo from "../../../assets/quick_grade_logo_with_text_blue.png";
function VerifyEmail() {
  return (
    <div className="mx-auto max-w-[500px] justify-center items-center">
      <header className="text-center mt-[1rem] flex justify-center md:mt-[5rem]">
        <img src={quickgradelogo} alt="Quickgrade Logo" />
      </header>

      <div className="items-center mx-auto shadow-lg justify-center p-4">
        <h1 className="text-center font-semibold my-4">
          {" "}
          Verify your Email Address{" "}
        </h1>
        <label className="text-textcolor text-[14px]">
          Input your email address:
        </label>

        <form action="#" method="post">
          <input
            type="text"
            id="otp"
            name="otp"
            placeholder="Enter Email Address"
            required
            className="w-full border border-[#D0D5DD] rounded-[8px] p-3 mt-2"
          />

          <button
            type="submit"
            className="mt-4 bg-primaryVar p-2 w-full text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
