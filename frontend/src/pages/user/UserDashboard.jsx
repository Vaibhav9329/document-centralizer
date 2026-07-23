import React from 'react';

const UserDashboard = () => {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8">User Dashboard</h1>
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm"></div>
        <div className="bg-white p-6 rounded-2xl shadow-sm"></div>
        <div className="bg-white p-6 rounded-2xl shadow-sm"></div>
        <div className="bg-white p-6 rounded-2xl shadow-sm"></div>
      </div>
    </>
  );
};

export default UserDashboard;