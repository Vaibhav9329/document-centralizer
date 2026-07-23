
export const Badge = ({ status }) => {
    const variants = {
        // Pending / Verification statuses
        "Pending": "bg-yellow-100 text-yellow-700 border-yellow-200",
        "Pending Verification": "bg-yellow-100 text-yellow-700 border-yellow-200",
        // Approved statuses
        "Approved": "bg-green-100 text-green-700 border-green-200",
        "Uploaded Successfully": "bg-green-100 text-green-700 border-green-200",
        // Rejected statuses
        "Rejected": "bg-red-100 text-red-700 border-red-200",
        "Upload Failed": "bg-red-100 text-red-700 border-red-200",
        // Re-upload / active statuses
        "Needs Re-upload": "bg-orange-100 text-orange-700 border-orange-200",
        "Ready to Upload": "bg-blue-100 text-blue-700 border-blue-200",
        // Other
        "Active": "bg-blue-100 text-blue-700 border-blue-200",
        "Uploading": "bg-blue-100 text-blue-700 border-blue-200",
    };
    const style = variants[status] || "bg-slate-100 text-slate-700 border-slate-200";
    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${style}`}>
            {status}
        </span>
    );
};
