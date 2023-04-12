import { useEffect, useState } from "react";
// import { csrfToken } from "next-auth/client";
import axios from "axios";

export default function User() {
  const [data, setData] = useState<any[]>([]);
  const [updating, setUpdating] = useState(false);
  const [userid, setUserId] = useState(0);
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
      axios.defaults.withCredentials = true;
      await axios.get(`http://localhost:8000/sanctum/csrf-cookie`);
      await axios
        .post(`http://localhost:8000/api/addUser`, formData)
        .then((response) => {
          console.log(response.data.user);
          if (response.status === 200) {
            const newData = response.data.user;
            setData(newData);
          }
        });
      setFormData({
        name: "",
        email: "",
        dob: "",
        member_type: "",
        nomination_year: "",
      });
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
  // a function to delete a user
  const deleteUser = async (id: number) => {
    try {
      axios.defaults.withCredentials = true;
      await axios.get(`http://localhost:8000/sanctum/csrf-cookie`);
      await axios.delete(`http://localhost:8000/api/deleteUser/${id}`);
      setData(data.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // a function to edit a user
  const editUser = async (id: number) => {
    //get the user data from data where id is equal to the id passed prefill in setFormData({});
    const user = data.find((user) => user.id === id);
    setFormData({
      name: user?.name,
      email: user?.email,
      dob: user?.dob,
      member_type: user?.member_type,
      nomination_year: user?.nomination_year,
    });
    setUpdating(true);
    setUserId(id);
  };

  // a function to update a user
  const updateUser = async () => {
    try {
      axios.defaults.withCredentials = true;
      await axios.get(`http://localhost:8000/sanctum/csrf-cookie`);
      await axios.post(
        `http://localhost:8000/api/updateUser/${userid}`,
        formData
      );
      const newData = data.map((user) => {
        if (user.id === userid) {
          return {
            ...user,
            name: formData.name,
            email: formData.email,
            dob: formData.dob,
            member_type: formData.member_type,
            nomination_year: formData.nomination_year,
          };
        }
        return user;
      });
      setData(newData);
      setFormData({
        name: "",
        email: "",
        dob: "",
        member_type: "",
        nomination_year: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div>
        <div>
          <h1 className="text-2xl font-bold text-center my-4">
             User Management
          </h1>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">
                Date of Birth
              </th>
              <th className="border border-gray-300 px-4 py-2">Member Type</th>
              <th className="border border-gray-300 px-4 py-2">
                Nomination Year
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.dob}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.member_type}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.nomination_year}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => editUser(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-center my-4">
          {updating ? "Update User" : "Add User"}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 container grid grid-cols-1 md:grid-cols-2 gap-4 "
      >
        <div className="col-span-1">
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
        <div className="col-span-1">
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
        <div className="col-span-1">
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
        <div className="col-span-1">
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
        <div className="col-span-1">
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
        <div className="flex items-center justify-between w-full">
          {!updating ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          ) : (
            <div className="flex justify-between gap-8 flex-wrap">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => updateUser()}
              >
                Update User details
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => window.location.reload()}
              >
                Reload window
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
