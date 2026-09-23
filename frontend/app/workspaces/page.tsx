"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WorkspacesPage() {

    const router = useRouter();

    const [workspaces, setWorkspaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function getWorkspaces() {

            const token = localStorage.getItem("access_token");

            if (!token) {
                router.push("/login");
                return;
            }

            try {

                const response = await fetch(
                    "http://127.0.0.1:8000/workspaces",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    localStorage.removeItem("access_token");
                    router.push("/login");
                    return;
                }

                setWorkspaces(data);

            } catch (error) {

                setError("Unable to load workspaces.");

            } finally {

                setLoading(false);

            }
        }

        getWorkspaces();

    }, [router]);

    return (
        <main className="min-h-screen p-8">

            <h1 className="text-3xl font-bold">
                My Workspaces
            </h1>

            {loading ? (
                <p className="mt-6 text-gray-500">
                    Loading workspaces...
                </p>
            ) : error ? (
                <p className="mt-6 text-red-500">
                    {error}
                </p>
            ) : (
                <div className="mt-6 space-y-3">

                    {workspaces.map((workspace) => (
                        <div
                            key={workspace.id}
                            className="border rounded-lg p-4"
                        >
                            {workspace.name}
                        </div>
                    ))}

                </div>
            )}

        </main>
    );
}