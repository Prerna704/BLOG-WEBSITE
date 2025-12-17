import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Dashboard() {
  const { user, token } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [photo, setPhoto] = useState(null);

  const updatePassword = async () => {
    await axios.put(
      "http://localhost:5050/api/auth/update-password",
      { oldPassword, newPassword },
      { headers: { Authorization: token } }
    );
    alert("Password updated");
  };

  const uploadPhoto = async () => {
    const formData = new FormData();
    formData.append("photo", photo);

    await axios.post(
      "http://localhost:5050/api/auth/upload-photo",
      formData,
      { headers: { Authorization: token } }
    );
    alert("Photo uploaded");
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>

      <div className="mt-6">
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <button
          onClick={uploadPhoto}
          className="block mt-2 text-luxAccent"
        >
          Upload Photo
        </button>
      </div>

      <div className="mt-6">
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={updatePassword}
          className="mt-2 text-luxAccent"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
