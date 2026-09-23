"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage(){
    const [name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleRegister(event: React.FormEvent){
        event.preventDefault();

        setLoading(true);

        const response = await fetch("http://127.0.0.1:8000/register", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();
        if(response.ok){
            setMessage(data.message);
            setIsError(false);
        }else{
            setMessage(data.detail);
            setIsError(true);
        }
        setLoading(false);
    }
    return(
        <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Create your account
                </h1>
                <p className="text-gray-500 mt-2">
                    Start organizing your notes and ideas.
                </p>
                {message && (
                    <p className={`mt-5 font-medium ${
                    isError ? "text-red-600" : "text-green-600"
                    }`}
                    >
                        {message}
                    </p>
                )}
                <form 
                onSubmit={handleRegister}
                className="mt-8 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                        </label>
                        <input type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900"
                        required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input 
                        type="email"
                        value={email}
                        onChange={(event)=>
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
                        <input type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder="Create a password"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900"
                        required
                        />
                    </div>
                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition">
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account ?
                    <Link href="/login"
                    className="text-gray-900 font-medium ml-1 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
}