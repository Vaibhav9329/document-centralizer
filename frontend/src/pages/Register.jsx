import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function Register() {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await registerUser(formData);

            alert("Registration Successful");

            console.log(response.data);

            setFormData({
                firstName: "",
                lastName: "",
                mobileNumber: "",
                email: "",
                password: ""
            });

        } catch (error) {

            console.error(error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Unable to connect to server.");
            }
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center px-4 py-8">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">

                <div className="text-center mb-2">
                    <div className="text-5xl mb-3">📄</div>

                    <h1 className="text-3xl font-bold text-blue-700">
                        Document Centralizer
                    </h1>
                </div>

                <div className="mb-2">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                        Create Account
                    </h2>
                </div>

                <form className="space-y-3" onSubmit={handleSubmit}>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            First Name
                        </label>

                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            className="w-full px-4 py-3 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Last Name
                        </label>

                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            className="w-full px-4 py-3 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Mobile Number
                        </label>

                        <input
                            type="text"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            placeholder="Enter mobile number"
                            className="w-full px-4 py-3 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="w-full px-4 py-3 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="w-full px-4 py-3 border rounded-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                    >
                        Create Account
                    </button>

                </form>

                <div className="text-center mt-4">

                    <p>Already have an account?</p>

                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold"
                    >
                        Sign In
                    </Link>

                </div>

            </div>

        </section>
    );
}