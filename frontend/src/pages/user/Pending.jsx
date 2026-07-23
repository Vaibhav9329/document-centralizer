
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FileText, Clock3, UserCog, ShieldAlert, Search, Filter, Plus, 
    Download, Trash2, RefreshCw, Eye, MoreVertical, LayoutGrid, List,
    Activity, CheckCircle2, ChevronRight, AlertCircle, ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

// DUMMY DATA FOR PENDING DOCS
const pendingDocs = [
    {
        id: "P-101",
        name: "Aadhaar Card Update",
        category: "Aadhaar Card",
        uploadDate: "2026-07-22",
        expectedCompletion: "Today, 5:00 PM",
        assignedReviewer: "Admin Smith",
        status: "Admin Review",
        stage: 2,
        size: "2.4 MB",
        description: "Address update proof.",
        previewUrl: "https://via.placeholder.com/800x600?text=Aadhaar+Preview",
        timeline: [
            { stage: "Uploaded Successfully", completed: true, time: "2026-07-22 09:00 AM" },
            { stage: "Validation Completed", completed: true, time: "2026-07-22 09:15 AM" },
            { stage: "Admin Review", completed: false, active: true, time: "In Progress" },
            { stage: "Super Admin Review", completed: false, active: false, time: "Waiting" },
            { stage: "Verification Completed", completed: false, active: false, time: "Waiting" }
        ]
    },
    {
        id: "P-102",
        name: "Passport Valid.pdf",
        category: "Passport",
        uploadDate: "2026-07-21",
        expectedCompletion: "Tomorrow",
        assignedReviewer: "SuperAdmin Jones",
        status: "Waiting for Super Admin",
        stage: 3,
        size: "4.1 MB",
        description: "Scanned copy of passport.",
        previewUrl: "https://via.placeholder.com/800x600?text=Passport+Preview",
        timeline: [
            { stage: "Uploaded Successfully", completed: true, time: "2026-07-21 10:00 AM" },
            { stage: "Validation Completed", completed: true, time: "2026-07-21 10:30 AM" },
            { stage: "Admin Review", completed: true, time: "2026-07-22 11:00 AM" },
            { stage: "Super Admin Review", completed: false, active: true, time: "In Progress" },
            { stage: "Verification Completed", completed: false, active: false, time: "Waiting" }
        ]
    },
    {
        id: "P-103",
        name: "Degree Certificate",
        category: "Degree Certificate",
        uploadDate: "2026-07-22",
        expectedCompletion: "Today, 6:00 PM",
        assignedReviewer: "Unassigned",
        status: "Pending",
        stage: 1,
        size: "1.8 MB",
        description: "BTech Certificate.",
        previewUrl: "https://via.placeholder.com/800x600?text=Degree+Preview",
        timeline: [
            { stage: "Uploaded Successfully", completed: true, time: "2026-07-22 12:00 PM" },
            { stage: "Validation Completed", completed: true, time: "2026-07-22 12:05 PM" },
            { stage: "Admin Review", completed: false, active: false, time: "Waiting" },
            { stage: "Super Admin Review", completed: false, active: false, time: "Waiting" },
            { stage: "Verification Completed", completed: false, active: false, time: "Waiting" }
        ]
    }
];

const STAGES = ["Uploaded", "Pending Review", "Admin Verification", "Waiting for Super Admin", "Completed"];

const StatusBadge = ({ status }) => {
    const colors = {
        "Pending": "bg-yellow-100 text-yellow-700 border-yellow-200",
        "Admin Review": "bg-blue-100 text-blue-700 border-blue-200",
        "Waiting for Super Admin": "bg-purple-100 text-purple-700 border-purple-200",
        "Verification in Progress": "bg-orange-100 text-orange-700 border-orange-200",
    };
    return (
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${colors[status] || "bg-slate-100 text-slate-700"}`}>
            {status}
        </span>
    );
};

const WorkflowBadge = ({ currentStage }) => {
    return (
        <div className="flex items-center gap-1">
            {STAGES.map((s, idx) => (
                <div key={idx} className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${idx <= currentStage ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
                    {idx < STAGES.length - 1 && <div className={`w-3 h-0.5 ${idx < currentStage ? 'bg-blue-500' : 'bg-slate-200'}`}></div>}
                </div>
            ))}
        </div>
    );
};

const ActionMenu = ({ doc, onPreview, onTimeline }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} onBlur={() => setTimeout(() => setIsOpen(false), 200)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                <MoreVertical size={18} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50"
                    >
                        <button onClick={() => onPreview(doc)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"><Eye size={16} className="text-slate-400"/> Preview</button>
                        <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"><Download size={16} className="text-slate-400"/> Download</button>
                        <button onClick={() => onTimeline(doc)} className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2 font-medium"><Activity size={16} className="text-blue-400"/> View Status Timeline</button>
                        <div className="h-px bg-slate-100 my-1"></div>
                        <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"><RefreshCw size={16} className="text-slate-400"/> Replace Document</button>
                        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"><Trash2 size={16} className="text-red-400"/> Delete Request</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const TimelineModal = ({ doc, onClose }) => {
    if (!doc) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <h2 className="text-lg font-bold text-slate-800">Verification Timeline</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><XCircle size={24} /></button>
                </div>
                <div className="p-6">
                    <p className="font-semibold text-slate-800 mb-6">{doc.name}</p>
                    <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                        {doc.timeline.map((step, idx) => (
                            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${step.completed ? 'bg-green-100 text-green-600' : step.active ? 'bg-blue-100 text-blue-600 border-blue-50 animate-pulse' : ''}`}>
                                    {step.completed ? <CheckCircle2 size={16}/> : step.active ? <Activity size={16}/> : <div className="w-2 h-2 rounded-full bg-slate-400"></div>}
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl shadow border border-slate-100 bg-white">
                                    <div className="flex items-center justify-between space-x-2 mb-1">
                                        <div className={`font-bold ${step.completed ? 'text-slate-800' : step.active ? 'text-blue-600' : 'text-slate-400'}`}>{step.stage}</div>
                                    </div>
                                    <div className="text-slate-500 text-xs">{step.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const CircularProgress = ({ percentage }) => (
    <div className="relative w-32 h-32 flex items-center justify-center mx-auto mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <motion.path 
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: `${percentage}, 100` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-blue-500" strokeWidth="3" strokeDasharray={`${percentage}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
            />
        </svg>
        <div className="absolute text-2xl font-bold text-slate-800">{percentage}%</div>
    </div>
);

const Pending = () => {
    const [viewMode, setViewMode] = useState('table');
    const [previewDoc, setPreviewDoc] = useState(null);
    const [timelineDoc, setTimelineDoc] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const totalCount = pendingDocs.length;
    const adminCount = pendingDocs.filter(d => d.status === 'Admin Review').length;
    const superAdminCount = pendingDocs.filter(d => d.status === 'Waiting for Super Admin').length;

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Pending Documents</h1>
                    <p className="text-sm text-slate-500 mt-1">Track documents currently under verification.</p>
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
                            <div><p className="text-sm text-slate-500 font-medium">Total Pending</p><h3 className="text-3xl font-bold text-slate-800 mt-1">{totalCount}</h3></div>
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><FileText size={20}/></div>
                        </div>
                        <p className="text-xs text-slate-400 mt-4">Documents in queue</p>
                    </CardContent></Card>
                </motion.div>
                <motion.div whileHover={{ y: -5 }}>
                    <Card><CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div><p className="text-sm text-slate-500 font-medium">Avg. Verification</p><h3 className="text-3xl font-bold text-slate-800 mt-1">24h</h3></div>
                            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center"><Clock3 size={20}/></div>
                        </div>
                        <p className="text-xs text-slate-400 mt-4">Estimated turnaround</p>
                    </CardContent></Card>
                </motion.div>
                <motion.div whileHover={{ y: -5 }}>
                    <Card><CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div><p className="text-sm text-slate-500 font-medium">Admin Review</p><h3 className="text-3xl font-bold text-slate-800 mt-1">{adminCount}</h3></div>
                            <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center"><UserCog size={20}/></div>
                        </div>
                        <p className="text-xs text-slate-400 mt-4">Under initial verification</p>
                    </CardContent></Card>
                </motion.div>
                <motion.div whileHover={{ y: -5 }}>
                    <Card><CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div><p className="text-sm text-slate-500 font-medium">Super Admin</p><h3 className="text-3xl font-bold text-slate-800 mt-1">{superAdminCount}</h3></div>
                            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center"><ShieldAlert size={20}/></div>
                        </div>
                        <p className="text-xs text-slate-400 mt-4">Waiting for final approval</p>
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
                                    <input type="text" placeholder="Search pending documents..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                                </div>
                                <select className="px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white hidden md:block"><option>All Categories</option></select>
                                <select className="px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white hidden lg:block"><option>All Stages</option></select>
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
                    ) : pendingDocs.length === 0 ? (
                        <Card><CardContent className="flex flex-col items-center justify-center py-20 text-center">
                            <ShieldCheck size={48} className="text-slate-300 mb-4" />
                            <h3 className="text-lg font-semibold text-slate-800">No Pending Documents</h3>
                            <p className="text-slate-500 mb-6">All your uploaded documents have been processed.</p>
                            <Link to="/user/upload" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium">Upload New Document</Link>
                        </CardContent></Card>
                    ) : viewMode === 'table' ? (
                        <Card className="overflow-hidden hidden md:block">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Document</th>
                                        <th className="px-6 py-4 font-medium">Upload Date</th>
                                        <th className="px-6 py-4 font-medium">Current Stage</th>
                                        <th className="px-6 py-4 font-medium">Expected Completion</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {pendingDocs.map(doc => (
                                        <motion.tr key={doc.id} whileHover={{ backgroundColor: "rgba(248, 250, 252, 1)" }} className="group">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-800 cursor-pointer hover:text-blue-600" onClick={() => setPreviewDoc(doc)}>{doc.name}</div>
                                                <div className="text-xs text-slate-500 mt-1">{doc.category}</div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">{doc.uploadDate}</td>
                                            <td className="px-6 py-4"><WorkflowBadge currentStage={doc.stage} /></td>
                                            <td className="px-6 py-4 text-slate-600 font-medium">{doc.expectedCompletion}</td>
                                            <td className="px-6 py-4"><StatusBadge status={doc.status} /></td>
                                            <td className="px-6 py-4 text-right flex justify-end">
                                                <ActionMenu doc={doc} onPreview={setPreviewDoc} onTimeline={setTimelineDoc} />
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Mobile/Card view fallback */}
                            {pendingDocs.map(doc => (
                                <Card key={doc.id} className="overflow-hidden group">
                                    <div className="p-5 border-b border-slate-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <StatusBadge status={doc.status} />
                                            <ActionMenu doc={doc} onPreview={setPreviewDoc} onTimeline={setTimelineDoc} />
                                        </div>
                                        <h4 className="font-bold text-slate-800 mt-2">{doc.name}</h4>
                                        <p className="text-xs text-slate-500">{doc.category}</p>
                                    </div>
                                    <div className="p-5 bg-slate-50 space-y-3">
                                        <div><p className="text-xs text-slate-400">Current Stage</p><div className="mt-1"><WorkflowBadge currentStage={doc.stage} /></div></div>
                                        <div><p className="text-xs text-slate-400">Expected</p><p className="text-sm font-medium text-slate-700">{doc.expectedCompletion}</p></div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="w-full xl:w-80 space-y-6">
                    <Card>
                        <CardHeader title="Verification Progress" />
                        <CardContent className="pt-0 pb-6 text-center">
                            <CircularProgress percentage={70} />
                            <p className="text-sm text-slate-500 font-medium">Overall progress of pending files</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader title="Verification Tips" icon={AlertCircle} />
                        <CardContent className="pt-0 space-y-4 text-sm text-slate-600">
                            <ul className="space-y-3 list-disc pl-4 marker:text-blue-500">
                                <li>Do not upload duplicate documents while pending.</li>
                                <li>Ensure images are clear and readable.</li>
                                <li>Invalid documents will be rejected and require re-upload.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader title="Recent Updates" icon={Activity} />
                        <CardContent className="pt-0 space-y-4">
                            <div className="flex gap-3"><div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0"></div><p className="text-sm text-slate-600"><span className="font-medium text-slate-800">PAN Card</span> moved to Admin Review.</p></div>
                            <div className="flex gap-3"><div className="w-2 h-2 mt-1.5 rounded-full bg-purple-500 shrink-0"></div><p className="text-sm text-slate-600"><span className="font-medium text-slate-800">Passport</span> waiting for Super Admin.</p></div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {previewDoc && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between"><h2 className="font-bold text-slate-800">Document Preview</h2><button onClick={() => setPreviewDoc(null)} className="text-slate-500 hover:bg-slate-100 p-2 rounded-full"><XCircle size={20}/></button></div>
                            <div className="p-6 flex flex-col md:flex-row gap-6">
                                <div className="flex-1 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px]">
                                    <img src={previewDoc.previewUrl} alt="Preview" className="max-w-full" />
                                </div>
                                <div className="w-full md:w-64 space-y-4 text-sm">
                                    <div><p className="text-slate-400 text-xs">Name</p><p className="font-medium text-slate-800">{previewDoc.name}</p></div>
                                    <div><p className="text-slate-400 text-xs">Category</p><p className="font-medium text-slate-800">{previewDoc.category}</p></div>
                                    <div><p className="text-slate-400 text-xs">Status</p><div className="mt-1"><StatusBadge status={previewDoc.status}/></div></div>
                                    <div><p className="text-slate-400 text-xs">Assigned</p><p className="font-medium text-slate-800">{previewDoc.assignedReviewer}</p></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {timelineDoc && <TimelineModal doc={timelineDoc} onClose={() => setTimelineDoc(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default Pending;
