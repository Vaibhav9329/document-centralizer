
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FileText, CheckCircle, Download, Share2, QrCode, Search, 
    Filter, LayoutGrid, List, Plus, Eye, MoreVertical, XCircle, 
    ShieldCheck, Clock3, Lock, Copy, RefreshCw, Activity, Shield, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

// DUMMY DATA FOR APPROVED DOCS
const approvedDocs = [
    {
        id: "DOC-2026-1001",
        name: "Aadhaar_Card.pdf",
        category: "Aadhaar Card",
        uploadDate: "2026-07-20",
        verifiedDate: "2026-07-21",
        verifiedBy: "Super Admin Jones",
        size: "2.4 MB",
        status: "Approved",
        remarks: "Clear and authentic document.",
        previewUrl: "https://via.placeholder.com/800x600?text=Aadhaar+Preview",
        thumbnail: "https://via.placeholder.com/150",
    },
    {
        id: "DOC-2026-1002",
        name: "PAN_Card.pdf",
        category: "PAN Card",
        uploadDate: "2026-07-15",
        verifiedDate: "2026-07-16",
        verifiedBy: "Super Admin Smith",
        size: "1.1 MB",
        status: "Approved",
        remarks: "Verification successful.",
        previewUrl: "https://via.placeholder.com/800x600?text=PAN+Card+Preview",
        thumbnail: "https://via.placeholder.com/150",
    },
    {
        id: "DOC-2026-1003",
        name: "Degree_Certificate.pdf",
        category: "Degree Certificate",
        uploadDate: "2026-07-10",
        verifiedDate: "2026-07-12",
        verifiedBy: "Admin Williams",
        size: "5.0 MB",
        status: "Approved",
        remarks: "Matched with university database.",
        previewUrl: "https://via.placeholder.com/800x600?text=Degree+Preview",
        thumbnail: "https://via.placeholder.com/150",
    }
];

const VerifiedBadge = () => (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 w-fit">
        <ShieldCheck size={14} className="text-green-600" /> Verified
    </div>
);

const ActionMenu = ({ doc, onPreview, onShare, onQR, onTimeline }) => {
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
                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50"
                    >
                        <button onClick={() => onPreview(doc)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"><Eye size={16} className="text-slate-400"/> Preview Document</button>
                        <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"><Download size={16} className="text-slate-400"/> Download File</button>
                        <div className="h-px bg-slate-100 my-1"></div>
                        <button onClick={() => onShare(doc)} className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2 font-medium"><Share2 size={16} className="text-blue-400"/> Generate Share Link</button>
                        <button onClick={() => onQR(doc)} className="w-full text-left px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 flex items-center gap-2 font-medium"><QrCode size={16} className="text-purple-400"/> View QR Code</button>
                        <div className="h-px bg-slate-100 my-1"></div>
                        <button onClick={() => onTimeline(doc)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"><Activity size={16} className="text-slate-400"/> Verification Details</button>
                        <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"><Shield size={16} className="text-slate-400"/> View Certificate</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const QRCodeModal = ({ doc, onClose }) => {
    if (!doc) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden text-center">
                <div className="px-6 py-4 flex items-center justify-between"><h2 className="font-bold text-slate-800">Verification QR Code</h2><button onClick={onClose} className="text-slate-500 hover:bg-slate-100 p-2 rounded-full"><XCircle size={20}/></button></div>
                <div className="p-6">
                    <div className="w-48 h-48 bg-slate-50 border border-slate-200 mx-auto rounded-xl flex items-center justify-center mb-6">
                        {/* Placeholder for real QR code */}
                        <QrCode size={120} className="text-slate-300" />
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 text-sm mb-6 border border-slate-100">
                        <p className="text-slate-500 mb-1">Verification ID</p>
                        <p className="font-mono font-bold text-slate-800 tracking-wider">{doc.id}</p>
                    </div>
                    <p className="text-xs text-slate-500 mb-6">Verified on {doc.verifiedDate}</p>
                    <div className="flex gap-3">
                        <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2"><Copy size={16}/> Copy Link</button>
                        <button className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 flex items-center justify-center gap-2"><Download size={16}/> Download</button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const ShareModal = ({ doc, onClose }) => {
    if (!doc) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between"><h2 className="font-bold text-slate-800">Share Securely</h2><button onClick={onClose} className="text-slate-500 hover:bg-slate-100 p-2 rounded-full"><XCircle size={20}/></button></div>
                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 text-sm">
                        <ShieldCheck size={24} className="shrink-0" />
                        <p>Generate a secure, trackable link to share your verified <strong>{doc.name}</strong>.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Link Expiry</label>
                        <select className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500">
                            <option>1 Day</option>
                            <option>7 Days</option>
                            <option>30 Days</option>
                            <option>Never Expire</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                        <div className="flex items-center gap-3">
                            <Lock size={18} className="text-slate-400" />
                            <div><p className="text-sm font-medium text-slate-800">Password Protection</p><p className="text-xs text-slate-500">Require password to view</p></div>
                        </div>
                        <div className="w-10 h-6 bg-slate-200 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div></div>
                    </div>
                    <div className="pt-2">
                        <div className="flex gap-2">
                            <input type="text" readOnly value={`https://doccentralizer.com/s/${doc.id.toLowerCase()}`} className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-600 outline-none" />
                            <button className="bg-slate-900 text-white px-4 py-2.5 rounded-xl hover:bg-slate-800 transition shadow-sm"><Copy size={18} /></button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const VerificationDetailsModal = ({ doc, onClose }) => {
    if (!doc) return null;
    const timeline = [
        { title: "Document Uploaded", date: doc.uploadDate, icon: FileText, color: "bg-blue-500" },
        { title: "Admin Reviewed", date: "System Admin", icon: Eye, color: "bg-purple-500" },
        { title: "Super Admin Approved", date: doc.verifiedBy, icon: ShieldCheck, color: "bg-green-500" },
        { title: "QR Generated", date: doc.verifiedDate, icon: QrCode, color: "bg-indigo-500" },
        { title: "Verification Completed", date: doc.verifiedDate, icon: CheckCircle, color: "bg-emerald-500" }
    ];
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between"><h2 className="font-bold text-slate-800">Verification Details</h2><button onClick={onClose} className="text-slate-500 hover:bg-slate-100 p-2 rounded-full"><XCircle size={20}/></button></div>
                <div className="p-6">
                    <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200">
                        {timeline.map((step, idx) => (
                            <div key={idx} className="relative flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm border-2 border-white ${step.color}`}>
                                    <step.icon size={18}/>
                                </div>
                                <div className="pt-2">
                                    <h4 className="font-bold text-slate-800 text-sm">{step.title}</h4>
                                    <p className="text-xs text-slate-500 mt-0.5">{step.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Approved = () => {
    const [viewMode, setViewMode] = useState('table');
    const [previewDoc, setPreviewDoc] = useState(null);
    const [qrDoc, setQrDoc] = useState(null);
    const [shareDoc, setShareDoc] = useState(null);
    const [timelineDoc, setTimelineDoc] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Approved Documents</h1>
                    <p className="text-sm text-slate-500 mt-1">View, download and securely share all your verified documents.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-slate-50 transition shadow-sm">
                        <Download size={18} /> Download All
                    </button>
                    <Link to="/user/upload" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-slate-800 transition shadow-sm">
                        <Plus size={18} /> Upload New
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div whileHover={{ y: -5 }}>
                    <Card><CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div><p className="text-sm text-slate-500 font-medium">Total Approved</p><h3 className="text-3xl font-bold text-slate-800 mt-1">{approvedDocs.length}</h3></div>
                            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center"><CheckCircle size={20}/></div>
                        </div>
                        <p className="text-xs text-slate-400 mt-4">Verified in digital vault</p>
                    </CardContent></Card>
                </motion.div>
                <motion.div whileHover={{ y: -5 }}>
                    <Card><CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div><p className="text-sm text-slate-500 font-medium">Total Downloads</p><h3 className="text-3xl font-bold text-slate-800 mt-1">42</h3></div>
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Download size={20}/></div>
                        </div>
                        <p className="text-xs text-slate-400 mt-4">Across all documents</p>
                    </CardContent></Card>
                </motion.div>
                <motion.div whileHover={{ y: -5 }}>
                    <Card><CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div><p className="text-sm text-slate-500 font-medium">Shared Links</p><h3 className="text-3xl font-bold text-slate-800 mt-1">12</h3></div>
                            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center"><Share2 size={20}/></div>
                        </div>
                        <p className="text-xs text-slate-400 mt-4">Active secure shares</p>
                    </CardContent></Card>
                </motion.div>
                <motion.div whileHover={{ y: -5 }}>
                    <Card><CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div><p className="text-sm text-slate-500 font-medium">Recently Verified</p><h3 className="text-3xl font-bold text-slate-800 mt-1">2</h3></div>
                            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center"><Clock3 size={20}/></div>
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
                                    <input type="text" placeholder="Search approved documents..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 text-sm" />
                                </div>
                                <select className="px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-white hidden md:block"><option>All Categories</option></select>
                                <select className="px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-white hidden lg:block"><option>Newest Verified</option></select>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex bg-slate-100 p-1 rounded-xl">
                                    <button onClick={() => setViewMode('table')} className={`p-1.5 rounded-lg ${viewMode === 'table' ? 'bg-white shadow-sm' : 'text-slate-500'}`}><List size={18} /></button>
                                    <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-slate-500'}`}><LayoutGrid size={18} /></button>
                                </div>
                                <button className="hidden sm:flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition"><Download size={16} /> Export</button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Main Content */}
                    {isLoading ? (
                        <Card><CardContent className="p-6 space-y-4">{[1,2,3].map(i => <div key={i} className="h-16 bg-slate-100 animate-pulse rounded-xl"></div>)}</CardContent></Card>
                    ) : approvedDocs.length === 0 ? (
                        <Card><CardContent className="flex flex-col items-center justify-center py-20 text-center">
                            <ShieldCheck size={48} className="text-slate-300 mb-4" />
                            <h3 className="text-lg font-semibold text-slate-800">No Approved Documents</h3>
                            <p className="text-slate-500 mb-6">Your verified documents will appear here after approval.</p>
                            <Link to="/user/upload" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium">Upload Document</Link>
                        </CardContent></Card>
                    ) : viewMode === 'table' ? (
                        <Card className="overflow-hidden hidden md:block">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Document</th>
                                        <th className="px-6 py-4 font-medium">Verification ID</th>
                                        <th className="px-6 py-4 font-medium">Verified Date</th>
                                        <th className="px-6 py-4 font-medium">Verified By</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {approvedDocs.map(doc => (
                                        <motion.tr key={doc.id} whileHover={{ backgroundColor: "rgba(248, 250, 252, 1)" }} className="group">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-800 cursor-pointer hover:text-blue-600" onClick={() => setPreviewDoc(doc)}>{doc.name}</div>
                                                <div className="text-xs text-slate-500 mt-1">{doc.category} • {doc.size}</div>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-slate-500 text-xs">{doc.id}</td>
                                            <td className="px-6 py-4 text-slate-500">{doc.verifiedDate}</td>
                                            <td className="px-6 py-4 text-slate-500">{doc.verifiedBy}</td>
                                            <td className="px-6 py-4"><VerifiedBadge /></td>
                                            <td className="px-6 py-4 text-right flex justify-end">
                                                <ActionMenu doc={doc} onPreview={setPreviewDoc} onShare={setShareDoc} onQR={setQrDoc} onTimeline={setTimelineDoc} />
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {approvedDocs.map(doc => (
                                <motion.div key={doc.id} whileHover={{ y: -4 }}>
                                    <Card className="h-full flex flex-col group overflow-hidden">
                                        <div className="h-40 bg-slate-100 relative cursor-pointer" onClick={() => setPreviewDoc(doc)}>
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-900/10 transition-opacity">
                                                <div className="bg-white p-2 rounded-full shadow-sm"><Eye size={20} className="text-slate-700"/></div>
                                            </div>
                                            <img src={doc.thumbnail} alt="thumb" className="w-full h-full object-cover opacity-50 mix-blend-multiply" />
                                            <div className="absolute top-3 left-3"><VerifiedBadge /></div>
                                        </div>
                                        <CardContent className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-semibold text-slate-800 line-clamp-1 hover:text-blue-600 cursor-pointer" onClick={() => setPreviewDoc(doc)}>{doc.name}</h4>
                                                <p className="text-xs text-slate-500 mt-1">{doc.category} • {doc.size}</p>
                                                <p className="font-mono text-[10px] text-slate-400 mt-2 bg-slate-50 p-1 rounded inline-block">{doc.id}</p>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                                <p className="text-xs text-slate-400">Verified: {doc.verifiedDate}</p>
                                                <ActionMenu doc={doc} onPreview={setPreviewDoc} onShare={setShareDoc} onQR={setQrDoc} onTimeline={setTimelineDoc} />
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
                        <CardHeader title="Security Status" icon={ShieldCheck} />
                        <CardContent className="pt-0 space-y-4 text-sm text-slate-600">
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-800 flex gap-3">
                                <Lock size={20} className="shrink-0" />
                                <div>
                                    <p className="font-bold">Vault is Secure</p>
                                    <p className="text-xs mt-1">All documents are encrypted and verified.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader title="Quick Actions" />
                        <CardContent className="pt-0 space-y-3">
                            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition border border-slate-100 text-sm font-medium text-slate-700">
                                <span className="flex items-center gap-2"><Download size={16} className="text-slate-400"/> Download Archive</span>
                                <ChevronRight size={16} className="text-slate-400" />
                            </button>
                            <Link to="/user/upload" className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition border border-slate-100 text-sm font-medium text-slate-700">
                                <span className="flex items-center gap-2"><Plus size={16} className="text-slate-400"/> Upload New</span>
                                <ChevronRight size={16} className="text-slate-400" />
                            </Link>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader title="Recently Verified" />
                        <CardContent className="pt-0 space-y-4">
                            {approvedDocs.slice(0,2).map(doc => (
                                <div key={doc.id} className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0"><CheckCircle size={14}/></div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">{doc.name}</p>
                                        <p className="text-xs text-slate-500 mt-1">{doc.verifiedDate}</p>
                                    </div>
                                </div>
                            ))}
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
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800">{previewDoc.name}</h2>
                                    <p className="text-sm text-slate-500">{previewDoc.category} • {previewDoc.size}</p>
                                </div>
                                <button onClick={() => setPreviewDoc(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><XCircle size={24} /></button>
                            </div>
                            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                                <div className="flex-1 bg-slate-100 p-4 flex items-center justify-center overflow-auto"><img src={previewDoc.previewUrl} alt={previewDoc.name} className="max-w-full max-h-full object-contain rounded shadow-sm border border-slate-200" /></div>
                                <div className="w-full md:w-80 bg-white border-l border-slate-100 p-6 overflow-y-auto">
                                    <h3 className="font-semibold text-slate-800 mb-4">Verification Details</h3>
                                    <div className="space-y-4">
                                        <div><p className="text-xs text-slate-500 mb-1">Status</p><VerifiedBadge /></div>
                                        <div><p className="text-xs text-slate-500 mb-1">Verification ID</p><p className="font-mono text-sm font-medium text-slate-700 bg-slate-50 p-1.5 rounded">{previewDoc.id}</p></div>
                                        <div><p className="text-xs text-slate-500 mb-1">Upload Date</p><p className="text-sm font-medium text-slate-700">{previewDoc.uploadDate}</p></div>
                                        <div><p className="text-xs text-slate-500 mb-1">Verified Date</p><p className="text-sm font-medium text-slate-700">{previewDoc.verifiedDate}</p></div>
                                        <div><p className="text-xs text-slate-500 mb-1">Verified By</p><p className="text-sm font-medium text-slate-700">{previewDoc.verifiedBy}</p></div>
                                    </div>
                                    <div className="mt-8 flex flex-col gap-3">
                                        <button className="w-full bg-slate-900 text-white py-2 rounded-xl text-sm font-medium hover:bg-slate-800 flex items-center justify-center gap-2"><Download size={16}/> Download</button>
                                        <div className="flex gap-3">
                                            <button onClick={() => {setPreviewDoc(null); setShareDoc(previewDoc);}} className="flex-1 border border-slate-200 text-slate-700 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2"><Share2 size={16}/> Share</button>
                                            <button onClick={() => {setPreviewDoc(null); setQrDoc(previewDoc);}} className="flex-1 border border-slate-200 text-slate-700 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2"><QrCode size={16}/> QR</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {qrDoc && <QRCodeModal doc={qrDoc} onClose={() => setQrDoc(null)} />}
                {shareDoc && <ShareModal doc={shareDoc} onClose={() => setShareDoc(null)} />}
                {timelineDoc && <VerificationDetailsModal doc={timelineDoc} onClose={() => setTimelineDoc(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default Approved;
