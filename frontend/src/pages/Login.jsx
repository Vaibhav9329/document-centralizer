import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">

                {/* Logo & Title */}
                <div className="text-center mb-2">
                    <div className="text-5xl mb-3">📄</div>

                    <h1 className="text-3xl font-bold text-blue-700">
                        Document Centralizer
                    </h1>
                </div>

                {/* Heading */}
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                        Welcome Back
                    </h2>

                    <p className="text-center text-gray-500 mt-2">
                        Sign in to continue
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-4">

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-700 mb-2"
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
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-lg"
                    >
                        Sign In
                    </button>

                </form>

                {/* Footer */}
                <div className="text-center mt-6">

                    <p className="text-gray-600">
                        New to Document Centralizer?
                    </p>

                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Create an Account
                    </Link>

                </div>

            </div>
        </section>
    );
}