"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            router.push("/login");
            return;
        }

        async function getUser() {
            const response = await fetch("http://127.0.0.1:8000/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                localStorage.removeItem("access_token");
                router.push("/login");
                return;
            }

            const data = await response.json();

            setUserId(data.user_id);
            setLoading(false);
        }

        getUser();
    }, [router]);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading dashboard...</p>
            </main>
        );
    }

return (
    <main className="min-h-screen bg-gray-50 p-8">

        <div className="flex items-center justify-between">

            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome to your Dashboard 👋
                </h1>

                <p className="mt-2 text-gray-600">
                    You are logged in as User #{userId}
                </p>
            </div>

            <button
                onClick={() => {
                    localStorage.removeItem("access_token");
                    router.push("/login");
                }}
                className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition"
            >
                Logout
            </button>

        </div>

    </main>
);
}