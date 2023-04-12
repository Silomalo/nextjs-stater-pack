import { useEffect, useState } from "react";
// import { csrfToken } from "next-auth/client";

export default function User() {
  const [data, setData] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    member_type: "",
    nomination_year: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      const res = await fetch(`http://localhost:8000/api/addUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      if (res.ok) {
        const newData = await res.json();
        setData((data) => [...data, newData]);
        console.log(data);
      }
      // setFormData({
      //   name: "",
      //   email: "",
      //   dob: "",
      //   member_type: "",
      //   nomination_year: "",
      // });
    } catch (error) {
      console.log(error);
    }
  };

  //uesEffect to fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/api/users`);
      const data = await res.json();
      // console.log(data.users);
      setData(data.users);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div>
        <h2>User Records</h2>
        {data.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.dob}</p>
            <p>{user.member_type}</p>
            <p>{user.nomination_year}</p>
          </div>
        ))}
        
      </div>
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
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData?.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="name"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Date of birth
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            name="member_type"
            value={formData?.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Member type
          </label>
          <select
            className="block  w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={formData?.member_type}
            onChange={(e) =>
              setFormData({ ...formData, member_type: e.target.value })
            }
          >
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Nomination year
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            name="nomination_year"
            value={formData?.nomination_year}
            onChange={(e) =>
              setFormData({ ...formData, nomination_year: e.target.value })
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
    </div>
  );
}
