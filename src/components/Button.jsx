import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import React from 'react'

function  Button() {
  return (
    <div>
      <button
        onClick={() => toast.success("Toastify is blasting 🎉")}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Test Toast
      </button>
    </div>
  );
}

export default Button