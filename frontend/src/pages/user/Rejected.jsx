
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    XCircle, RefreshCw, AlertTriangle, Clock3, Search, Filter, 
    LayoutGrid, List, Plus, Eye, Download, Trash2, MoreVertical, 
    UploadCloud, FileText, File, Info, ChevronRight, CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

// DUMMY DATA FOR REJECTED DOCS
const rejectedDocs = [
    {
        id: "REJ-101",
        name: "Aadhaar_Card.pdf",
        category: "Aadhaar Card",
        rejectedDate: "2026-07-22",
        rejectedBy: "Admin Jones",
        reason: "Image is too blurry to read.",
        priority: "High",
        status: "Needs Re-upload",
        size: "2.1 MB",
        uploadDate: "2026-07-20",
        previewUrl: "https://via.placeholder.com/800x600?text=Blurred+Aadhaar",
        thumbnail: "https://via.placeholder.com/150",
        suggestions: ["Use a flat scanner", "Ensure good lighting", "Do not crop edges"]
    },
    {
        id: "REJ-102",
        name: "PAN_Card.pdf",
        category: "PAN Card",
        rejectedDate: "2026-07-21",
        rejectedBy: "Super Admin",
        reason: "Incorrect category selected.",
        priority: "Medium",
        status: "Ready to Upload",
        size: "1.5 MB",
        uploadDate: "2026-07-20",
        previewUrl: "https://via.placeholder.com/800x600?text=PAN+Card",
        thumbnail: "https://via.placeholder.com/150",
        suggestions: ["Select 'PAN Card' instead of 'Other'"]
    },
    {
        id: "REJ-103",
        name: "Passport.pdf",
        category: "Passport",
        rejectedDate: "2026-07-20",
        rejectedBy: "Admin Smith",
        reason: "Document expired.",
        priority: "High",
        status: "Rejected",
        size: "3.2 MB",
        uploadDate: "2026-07-18",
        previewUrl: "https://via.placeholder.com/800x600?text=Expired+Passport",
        thumbnail: "https://via.placeholder.com/150",
        suggestions: ["Upload a currently valid passport"]
    },
    {
        id: "REJ-104",
        name: "Degree_Certificate.jpg",
        category: "Degree Certificate",
        rejectedDate: "2026-07-19",
        rejectedBy: "Admin Smith",
        reason: "Incomplete scan (missing seal).",
        priority: "Low",
        status: "Needs Re-upload",
        size: "4.5 MB",
        uploadDate: "2026-07-17",
        previewUrl: "https://via.placeholder.com/800x600?text=Incomplete+Degree",
        thumbnail: "https://via.placeholder.com/150",
        suggestions: ["Scan the entire document including corners"]
    }
];

const PriorityBadge = ({ priority }) => {
    const colors = {
        High: "bg-red-50 text-red-700 border-red-200",
        Medium: "bg-orange-50 text-orange-700 border-orange-200",
        Low: "bg-blue-50 text-blue-700 border-blue-200",
    };
    return (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${colors[priority] || "bg-slate-50 text-slate-500"}`}>
            {priority}
        </span>
    );
};

const ActionMenu = ({ doc, onPreview, onReason, onReupload }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} onBlur={() => setTimeout(() => setIsOpen(false), 200)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                <MoreVertical size={18} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50"
                    >
                        <button onClick={() => onReason(doc)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"><AlertTriangle size={16} className="text-red-400"/> View Rejection Reason</button>
                        <button onClick={() => onReupload(doc)} className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2 font-medium"><RefreshCw size={16} className="text-blue-400"/> Replace Document</button>
                        <div className="h-px bg-slate-100 my-1"></div>
                        <button onClick={() => onPreview(doc)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"><Eye size={16} className="text-slate-400"/> Preview Original</button>
                        <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"><Download size={16} className="text-slate-400"/> Download Original</button>
                        <div className="h-px bg-slate-100 my-1"></div>
                        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"><Trash2 size={16} className="text-red-400"/> Delete Document</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const RejectionReasonModal = ({ doc, onClose, onReupload }) => {
    if (!doc) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between"><h2 className="font-bold text-slate-800">Rejection Details</h2><button onClick={onClose} className="text-slate-500 hover:bg-slate-100 p-2 rounded-full"><XCircle size={20}/></button></div>
                <div className="p-6">
                    <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3 mb-6 text-red-800">
                        <AlertTriangle size={24} className="shrink-0" />
                        <div>
                            <h4 className="font-bold">Reason for Rejection</h4>
                            <p className="text-sm mt-1">{doc.reason}</p>
                        </div>
                    </div>
                    <div className="space-y-4 mb-8">
                        <h4 className="font-semibold text-slate-800 text-sm">Suggestions to Fix</h4>
                        <ul className="space-y-2">
                            {doc.suggestions.map((s, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                    <CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                    <span>{s}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 mb-6 text-sm border border-slate-100 space-y-2">
                        <div className="flex justify-between"><span className="text-slate-500">Reviewed By</span> <span className="font-medium text-slate-800">{doc.rejectedBy}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Date</span> <span className="font-medium text-slate-800">{doc.rejectedDate}</span></div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl font-medium hover:bg-slate-50 transition">Close</button>
                        <button onClick={() => {onClose(); onReupload(doc);}} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"><RefreshCw size={18}/> Replace Document</button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const ReUploadModal = ({ doc, onClose }) => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const inputRef = useRef(null);

    if (!doc) return null;

    const handleDrag = (e) => {
        e.preventDefault(); e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault(); e.stopPropagation(); setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between"><h2 className="font-bold text-slate-800">Upload Corrected Document</h2><button onClick={onClose} className="text-slate-500 hover:bg-slate-100 p-2 rounded-full"><XCircle size={20}/></button></div>
                <div className="p-6 overflow-y-auto">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl mb-6">
                        <div className="w-10 h-10 bg-slate-200 text-slate-500 flex items-center justify-center rounded-lg"><FileText size={18}/></div>
                        <div>
                            <p className="text-xs text-slate-400">Replacing</p>
                            <p className="text-sm font-medium text-slate-800">{doc.name} <span className="text-slate-500 font-normal">({doc.category})</span></p>
                        </div>
                    </div>

                    {!file ? (
                        <div 
                            className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${dragActive ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
                            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                        >
                            <input ref={inputRef} type="file" className="hidden" accept="image/jpeg, image/png, application/pdf" onChange={handleChange} />
                            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-blue-500"><UploadCloud size={24} /></div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-1">Drag & Drop new file here</h3>
                            <p className="text-slate-500 text-sm mb-4">or</p>
                            <button onClick={() => inputRef.current.click()} className="bg-slate-900 text-white px-5 py-2 rounded-xl font-medium text-sm hover:bg-slate-800 transition">Browse Files</button>
                        </div>
                    ) : (
                        <div className="border border-blue-100 rounded-xl p-4 bg-blue-50/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white text-blue-600 rounded-lg shadow-sm flex items-center justify-center"><File size={24}/></div>
                                <div><p className="font-semibold text-slate-800 text-sm">{file.name}</p><p className="text-xs text-slate-500">{(file.size/(1024*1024)).toFixed(2)} MB</p></div>
                            </div>
                            <button onClick={() => setFile(null)} className="text-slate-400 hover:text-red-500 p-2"><Trash2 size={18}/></button>
                        </div>
                    )}

                    <div className="mt-8 flex gap-3">
                        <button onClick={onClose} className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
                        <button disabled={!file} className={`flex-1 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition ${file ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}><UploadCloud size={18}/> Upload Document</button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Rejected = () => {
    const [viewMode, setViewMode] = useState('table');
    const [previewDoc, setPreviewDoc] = useState(null);
    const [reasonDoc, setReasonDoc] = useState(null);
    const [reuploadDoc, setReuploadDoc] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const totalCount = rejectedDocs.length;
    const readyCount = rejectedDocs.filter(d => d.status === 'Ready to Upload').length;

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Rejected Documents</h1>
                    <p className="text-sm text-slate-500 mt-1">Review rejected documents, understand rejection reasons, and upload corrected versions.</p>
                </div>
                <Link to="/user/upload" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-slate-800 transition shadow-sm">
                    <Plus size={18} /> Upload New Document
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div whileHover={{ y: -5 }}>
                    <Card><CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div><p className="text-sm text-slate-500 font-medium">Total Rejected</p><h3 className="text-3xl font-bold text-slate-800 mt-1">{totalCount}</h3></div>
                            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center"><XCircle size={20}/></div>
                        </div>
                        <p className="text-xs text-slate-400 mt-4">Require attention</p>
                    </CardContent></Card>
                </motion.div>
                <motion.div whileHover={{ y: -5 }}>
                    <Card><CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div><p className="text-sm text-slate-500 font-medium">Ready for Re-upload</p><h3 className="text-3xl font-bold text-slate-800 mt-1">{readyCount}</h3></div>
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><RefreshCw size={20}/></div>
                        </div>
                        <p className="text-xs text-slate-400 mt-4">Drafted for submission</p>
                    </CardContent></Card>
                </motion.div>
                <motion.div whileHover={{ y: -5 }}>
                    <Card><CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div><p className="text-sm text-slate-500 font-medium">Common Issues</p><h3 className="text-3xl font-bold text-slate-800 mt-1">3</h3></div>
                            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center"><AlertTriangle size={20}/></div>
                        </div>
                        <p className="text-xs text-slate-400 mt-4">Blurry, Expired, Incomplete</p>
                    </CardContent></Card>
                </motion.div>
                <motion.div whileHover={{ y: -5 }}>
                    <Card><CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div><p className="text-sm text-slate-500 font-medium">Recently Rejected</p><h3 className="text-3xl font-bold text-slate-800 mt-1">2</h3></div>
                            <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center"><Clock3 size={20}/></div>
                        </div>
                        <p className="text-xs text-slate-400 mt-4">Within the last 7 days</p>
                    </CardContent></Card>
                </motion.div>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1 space-y-4">
                    {/* Toolbar */}
                    <Card>
                        <CardContent className="p-4 flex flex-col lg:flex-row gap-4 justify-between items-center">
                            <div className="flex flex-1 w-full gap-4">
                                <div className="relative flex-1 max-w-sm">
                                    <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
                                    <input type="text" placeholder="Search rejected documents..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 text-sm" />
                                </div>
                                <select className="px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-white hidden md:block"><option>All Categories</option></select>
                                <select className="px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-white hidden lg:block"><option>Newest First</option></select>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex bg-slate-100 p-1 rounded-xl">
                                    <button onClick={() => setViewMode('table')} className={`p-1.5 rounded-lg ${viewMode === 'table' ? 'bg-white shadow-sm' : 'text-slate-500'}`}><List size={18} /></button>
                                    <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-slate-500'}`}><LayoutGrid size={18} /></button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Main Content */}
                    {isLoading ? (
                        <Card><CardContent className="p-6 space-y-4">{[1,2,3].map(i => <div key={i} className="h-16 bg-slate-100 animate-pulse rounded-xl"></div>)}</CardContent></Card>
                    ) : rejectedDocs.length === 0 ? (
                        <Card><CardContent className="flex flex-col items-center justify-center py-20 text-center">
                            <CheckCircle size={48} className="text-green-500 mb-4" />
                            <h3 className="text-xl font-bold text-slate-800">Great News!</h3>
                            <p className="text-slate-500 mb-6">You don't have any rejected documents.</p>
                            <Link to="/user/approved" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium">View Approved Documents</Link>
                        </CardContent></Card>
                    ) : viewMode === 'table' ? (
                        <Card className="overflow-hidden hidden md:block">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Document</th>
                                        <th className="px-6 py-4 font-medium">Rejected Date</th>
                                        <th className="px-6 py-4 font-medium">Reason</th>
                                        <th className="px-6 py-4 font-medium">Priority</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {rejectedDocs.map(doc => (
                                        <motion.tr key={doc.id} whileHover={{ backgroundColor: "rgba(248, 250, 252, 1)" }} className="group">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-800 cursor-pointer hover:text-blue-600" onClick={() => setReasonDoc(doc)}>{doc.name}</div>
                                                <div className="text-xs text-slate-500 mt-1">{doc.category}</div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">{doc.rejectedDate}</td>
                                            <td className="px-6 py-4 text-slate-600 max-w-[200px] truncate">{doc.reason}</td>
                                            <td className="px-6 py-4"><PriorityBadge priority={doc.priority} /></td>
                                            <td className="px-6 py-4"><Badge status={doc.status} /></td>
                                            <td className="px-6 py-4 text-right flex justify-end">
                                                <ActionMenu doc={doc} onPreview={setPreviewDoc} onReason={setReasonDoc} onReupload={setReuploadDoc} />
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rejectedDocs.map(doc => (
                                <motion.div key={doc.id} whileHover={{ y: -4 }}>
                                    <Card className="h-full flex flex-col group overflow-hidden border-red-100">
                                        <div className="h-40 bg-slate-100 relative cursor-pointer" onClick={() => setReasonDoc(doc)}>
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-900/10 transition-opacity">
                                                <div className="bg-white p-2 rounded-full shadow-sm"><AlertTriangle size={20} className="text-red-600"/></div>
                                            </div>
                                            <img src={doc.thumbnail} alt="thumb" className="w-full h-full object-cover opacity-50 mix-blend-multiply" />
                                            <div className="absolute top-3 left-3"><Badge status="Rejected" /></div>
                                        </div>
                                        <CardContent className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-semibold text-slate-800 line-clamp-1">{doc.name}</h4>
                                                <p className="text-xs text-slate-500 mt-1">{doc.category}</p>
                                                <div className="mt-3 bg-red-50 p-2 rounded text-xs text-red-700 border border-red-100 line-clamp-2">
                                                    <strong>Reason:</strong> {doc.reason}
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                                <PriorityBadge priority={doc.priority} />
                                                <ActionMenu doc={doc} onPreview={setPreviewDoc} onReason={setReasonDoc} onReupload={setReuploadDoc} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="w-full xl:w-80 space-y-6">
                    <Card>
                        <CardHeader title="Common Reasons" icon={Info} />
                        <CardContent className="pt-0 space-y-3 text-sm text-slate-600">
                            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100"><span>Blurred Image</span><span className="text-xs font-semibold text-slate-400">45%</span></div>
                            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100"><span>Expired Document</span><span className="text-xs font-semibold text-slate-400">20%</span></div>
                            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100"><span>Wrong Category</span><span className="text-xs font-semibold text-slate-400">15%</span></div>
                            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100"><span>Incomplete Scan</span><span className="text-xs font-semibold text-slate-400">10%</span></div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader title="Tips for Approval" />
                        <CardContent className="pt-0 space-y-3 text-sm text-slate-600">
                            <ul className="space-y-3 list-disc pl-4 marker:text-blue-500">
                                <li>Upload high-quality, flat scans.</li>
                                <li>Ensure all 4 corners are visible.</li>
                                <li>Double-check the selected category.</li>
                                <li>Do not upload password-protected PDFs.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {previewDoc && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                                <div><h2 className="text-lg font-bold text-slate-800">{previewDoc.name}</h2><p className="text-sm text-slate-500">{previewDoc.category} • {previewDoc.size}</p></div>
                                <button onClick={() => setPreviewDoc(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><XCircle size={24} /></button>
                            </div>
                            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                                <div className="flex-1 bg-slate-100 p-4 flex items-center justify-center overflow-auto"><img src={previewDoc.previewUrl} alt={previewDoc.name} className="max-w-full max-h-full object-contain rounded shadow-sm border border-slate-200" /></div>
                                <div className="w-full md:w-80 bg-white border-l border-slate-100 p-6 overflow-y-auto">
                                    <h3 className="font-semibold text-slate-800 mb-4">Original Upload Details</h3>
                                    <div className="space-y-4">
                                        <div><p className="text-xs text-slate-500 mb-1">Status</p><Badge status={previewDoc.status}/></div>
                                        <div><p className="text-xs text-slate-500 mb-1">Upload Date</p><p className="text-sm font-medium text-slate-700">{previewDoc.uploadDate}</p></div>
                                        <div><p className="text-xs text-slate-500 mb-1">Rejected Date</p><p className="text-sm font-medium text-slate-700">{previewDoc.rejectedDate}</p></div>
                                        <div><p className="text-xs text-slate-500 mb-1">Rejected By</p><p className="text-sm font-medium text-slate-700">{previewDoc.rejectedBy}</p></div>
                                    </div>
                                    <div className="mt-8 flex flex-col gap-3">
                                        <button onClick={() => {setPreviewDoc(null); setReasonDoc(previewDoc);}} className="w-full bg-red-50 text-red-600 py-2 rounded-xl text-sm font-medium border border-red-200 hover:bg-red-100 transition">View Rejection Reason</button>
                                        <button onClick={() => {setPreviewDoc(null); setReuploadDoc(previewDoc);}} className="w-full bg-slate-900 text-white py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition">Replace Document</button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {reasonDoc && <RejectionReasonModal doc={reasonDoc} onClose={() => setReasonDoc(null)} onReupload={setReuploadDoc} />}
                {reuploadDoc && <ReUploadModal doc={reuploadDoc} onClose={() => setReuploadDoc(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default Rejected;
