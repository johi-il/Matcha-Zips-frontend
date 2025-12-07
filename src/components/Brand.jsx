import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

function Brand() {
  // State for brands data
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for form
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch brands from FastAPI
  const fetchBrands = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:8000/brand");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBrands(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  // Load brands on component mount
  useEffect(() => {
    fetchBrands();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `http://127.0.0.1:8000/brand/${editingId}`
        : "http://127.0.0.1:8000/brand";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh the brands list
      fetchBrands();

      // Reset form
      setFormData({
        name: "",
        description: "",
      });
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error submitting brand:", error);
      setError(error.message);
    }
  };

  // Edit a brand
  const handleEdit = (brand) => {
    setFormData({
      name: brand.name,
      description: brand.description || "",
    });
    setEditingId(brand.id);
    setShowForm(true);
  };

  // Delete a brand
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/brand/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Refresh the brands list
        fetchBrands();
      } catch (error) {
        console.error("Error deleting brand:", error);
        setError(error.message);
      }
    }
  };

  // Cancel form
  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
    });
    setShowForm(false);
    setEditingId(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-matcha-green"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-matcha-green">Brands</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-matcha-green text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <FaPlus className="mr-2" /> Add Brand
          </button>
        </div>

        {/* Brand Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editingId ? "Edit Brand" : "Add New Brand"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Brand Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-matcha-green focus:border-matcha-green"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-matcha-green focus:border-matcha-green"
                  placeholder="Describe the brand..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FaTimes className="inline mr-2" /> Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-matcha-green text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <FaSave className="inline mr-2" />{" "}
                  {editingId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Brands Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {brands.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No brands found. Add a new brand to get started.
                    </td>
                  </tr>
                ) : (
                  brands.map((brand) => (
                    <tr key={brand.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {brand.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {brand.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {brand.description || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(brand)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(brand.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brand;
