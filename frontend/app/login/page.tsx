"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const router = useRouter();


    async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        router.push("/dashboard");
    } else {
        setMessage(data.detail);
    }
}

    return (
        <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">

                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome back
                </h1>

                <p className="text-gray-500 mt-2">
                    Login to continue to your workspace.
                </p>

                {message && (
                    <p className="mt-5 text-red-600 font-medium">
                        {message}
                    </p>
                )}

                <form 
                onSubmit={handleLogin}
                className="mt-8 space-y-5">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?
                    <Link
                        href="/register"
                        className="text-gray-900 font-medium ml-1 hover:underline"
                    >
                        Create one
                    </Link>
                </p>

            </div>
        </main>
    );
}