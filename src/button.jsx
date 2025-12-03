import { toast } from "react-toastify";
import React from 'react'

function button() {
  return (
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => toast.success("Tailwind + Toastify = 🔥")}
      >
        Test Toast
      </button>
  );
}

export default button