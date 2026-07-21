import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">

                {/* Logo & Title */}
                <div className="text-center mb-2">
                    <div className="text-5xl mb-3">📄</div>

                    <h1 className="text-3xl font-bold text-blue-700">
                        Document Centralizer
                    </h1>
                </div>

                {/* Heading */}
                <div className="mb-2">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                        Create Account
                    </h2>

                </div>

                {/* Form */}
                <form className="space-y-3">

                    {/* First Name */}
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-semibold text-gray-700 mb-1"
                        >
                            First Name
                        </label>

                        <input
                            type="text"
                            id="firstName"
                            placeholder="Enter your first name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-semibold text-gray-700 mb-1"
                        >
                            Last Name
                        </label>

                        <input
                            type="text"
                            id="lastName"
                            placeholder="Enter your last name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Mobile */}
                    <div>
                        <label
                            htmlFor="mobile"
                            className="block text-sm font-semibold text-gray-700 mb-1"
                        >
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            id="mobile"
                            placeholder="Enter your mobile number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>


                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-700 mb-1"
                        >
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-700 mb-1"
                        >
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            placeholder="Create a password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>



                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-lg"
                    >
                        Create Account
                    </button>

                </form>

                {/* Footer */}
                <div className="text-center mt-4">

                    <p className="text-gray-600">
                        Already have an account?
                    </p>

                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Sign In
                    </Link>

                </div>

            </div>
        </section>
    );
}