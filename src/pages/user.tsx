import { useState } from "react";


export default function User() {
const [data, setData] = useState<any[]>([]);
const [formData, setFormData] = useState({
  name: "",
  content: "",
});

const handleSubmit = async (e: any) => {
  e.preventDefault();
  try {
    console.log(formData);
    // const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
    const res = await fetch(`http://localhost:8000/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const newData = await res.json();
      setData((data) => [...data, newData]);
      console.log(data);
    }
    setFormData({
      name: "",
      content: "",
    });
  } catch (error) {
    console.log(error);
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 container"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData?.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Name
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="content"
          name="content"
          rows={5}
          placeholder="Enter your content"
          value={formData?.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
