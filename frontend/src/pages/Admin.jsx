import React from 'react';
import ClassForm from '../components/ClassForm';  // Import the ClassForm component

const Admin = () => {
    return (
        <div className="flex flex-col h-screen">
            {/* Navigation Bar */}
            <nav className="bg-gray-800 text-white p-4">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </nav>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-200 p-4">
                    <ul className="space-y-4">
                        <li>
                            <a href="#dashboard" className="text-lg text-gray-700">Dashboard</a>
                        </li>
                        <li>
                            <a href="#create-class" className="text-lg text-gray-700">Create Class</a>
                        </li>
                        <li>
                            <a href="#manage-users" className="text-lg text-gray-700">Manage Users</a>
                        </li>
                        <li>
                            <a href="#manage-skills" className="text-lg text-gray-700">Manage Skills</a>
                        </li>
                    </ul>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-6">
                    {/* Section for Creating Classes */}
                    <section id="create-class" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Create a New Class</h2>
                        <ClassForm />  {/* Class creation form */}
                    </section>

                    {/* Section for Dashboard Content */}
                    <section id="dashboard" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <p>Here, you can see various stats like the number of classes, active instructors, etc.</p>
                        </div>
                    </section>

                    {/* Section for Managing Users */}
                    <section id="manage-users" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <p>Manage user accounts, view active users, and manage their roles.</p>
                        </div>
                    </section>

                    {/* Section for Managing Skills */}
                    <section id="manage-skills" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Manage Skills</h2>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <p>Manage the skills available for classes, such as adding, updating, or removing skills.</p>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Admin;
