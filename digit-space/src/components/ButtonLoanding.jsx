import React from "react";
import ReactLoading from "react-loading";

const ButtonLoading = ({ disabled, loading, text }) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="bg-gray-900  text-base rounded-b-lg p-3 text-white   py-3 px-6  hover:bg-indigo-500  disabled:  disabled:bg-gray-700"
    >
      <i class="far fa-save text-green-400"></i>
      {loading ? <ReactLoading type="spin" height={30} width={30} /> : text}
    </button>
  );
};

export default ButtonLoading;
