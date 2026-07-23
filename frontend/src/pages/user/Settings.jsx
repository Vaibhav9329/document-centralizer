
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Shield, Bell, Lock, Eye, Smartphone, Trash2, LogOut,
    Monitor, Globe, Clock, ToggleLeft, ToggleRight, ChevronRight,
    Key, ShieldCheck, AlertTriangle, CheckCircle, XCircle, Star,
    Download, EyeOff, Settings, Layers, CreditCard, HardDrive,
    MapPin, Laptop, RefreshCw, Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

// ─── DUMMY DATA ───────────────────────────────────────────────
const userData = {
    firstName:'Vaibhav', lastName:'Khot', username:'vaibhav_khot',
    email:'vaibhav@example.com', phone:'+91 98765 43210',
    dob:'15 March 2000', gender:'Male',
    address:'Flat 402, Sunrise Apartment', city:'Pune',
    state:'Maharashtra', country:'India', pincode:'411001',
};
const devices = [
    { id:1, name:'Chrome Browser', os:'Windows 11', location:'Pune, India', lastActive:'Active Now',  icon: Laptop, current: true },
    { id:2, name:'Mobile App',     os:'Android 14', location:'Pune, India', lastActive:'2 hours ago', icon: Smartphone, current: false },
    { id:3, name:'Firefox',        os:'macOS',       location:'Mumbai, India',lastActive:'3 days ago', icon: Monitor, current: false },
];
const loginHistory = [
    { date:'Today, 1:14 PM',   device:'Chrome · Windows 11', location:'Pune, India',   ip:'122.160.x.x', status:'success' },
    { date:'Yesterday, 9:00 AM',device:'Mobile App · Android', location:'Pune, India', ip:'122.160.x.x', status:'success' },
    { date:'20 Jul, 8:45 PM',  device:'Firefox · macOS',      location:'Mumbai, India',ip:'117.20.x.x',  status:'failed' },
];

// ─── SMALL REUSABLES ──────────────────────────────────────────
const Toggle = ({ value, onChange }) => (
    <button onClick={() => onChange(!value)} className="shrink-0 transition">
        {value
            ? <ToggleRight size={40} className="text-green-500" />
            : <ToggleLeft  size={40} className="text-slate-300" />}
    </button>
);

const ProgressRing = ({ pct }) => {
    const r = 44, circ = 2 * Math.PI * r;
    const offset = circ - (pct / 100) * circ;
    return (
        <div className="relative w-28 h-28 flex items-center justify-center mx-auto">
            <svg width="112" height="112" style={{ transform:'rotate(-90deg)' }}>
                <circle cx="56" cy="56" r={r} fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <motion.circle cx="56" cy="56" r={r} fill="none" stroke="#1e293b" strokeWidth="8"
                    strokeLinecap="round" strokeDasharray={circ}
                    initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.4, ease:'easeOut' }} />
            </svg>
            <div className="absolute text-center">
                <p className="text-xl font-black text-slate-800">{pct}%</p>
                <p className="text-[10px] text-slate-400 uppercase">Secure</p>
            </div>
        </div>
    );
};

// ─── MODALS ───────────────────────────────────────────────────
const ChangePasswordModal = ({ onClose }) => {
    const [show, setShow] = useState({c:false,n:false,cf:false});
    const [pwd, setPwd]   = useState({c:'',n:'',cf:''});
    const strength = pwd.n.length >= 12 ? 'Strong' : pwd.n.length >= 8 ? 'Medium' : pwd.n.length > 0 ? 'Weak' : '';
    const barClass = { Strong:'w-full bg-green-500', Medium:'w-2/3 bg-yellow-500', Weak:'w-1/3 bg-red-500' };
    const txtClass = { Strong:'text-green-600', Medium:'text-yellow-600', Weak:'text-red-500' };
    const reqs = [
        { label:'Min 8 characters',   ok: pwd.n.length >= 8 },
        { label:'Uppercase letter',    ok: /[A-Z]/.test(pwd.n) },
        { label:'Lowercase letter',    ok: /[a-z]/.test(pwd.n) },
        { label:'Number',              ok: /[0-9]/.test(pwd.n) },
        { label:'Special character',   ok: /[^A-Za-z0-9]/.test(pwd.n) },
    ];
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.96 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <h2 className="font-bold text-slate-800">Change Password</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-200"><XCircle size={20}/></button>
                </div>
                <div className="p-6 space-y-4">
                    {[['c','Current Password','c'],['n','New Password','n'],['cf','Confirm Password','cf']].map(([k,label,key]) => (
                        <div key={k}>
                            <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
                            <div className="relative">
                                <input type={show[key] ? 'text' : 'password'} value={pwd[key]}
                                    onChange={e => setPwd(p => ({...p,[key]:e.target.value}))}
                                    className="w-full px-3 py-2 pr-10 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50 focus:bg-white" />
                                <button type="button" onClick={() => setShow(s => ({...s,[key]:!s[key]}))} className="absolute right-3 top-2.5 text-slate-400">
                                    {show[key] ? <EyeOff size={16}/> : <Eye size={16}/>}
                                </button>
                            </div>
                        </div>
                    ))}
                    {strength && (
                        <div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1"><div className={`h-full rounded-full transition-all ${barClass[strength]}`}></div></div>
                            <p className={`text-xs font-semibold ${txtClass[strength]}`}>{strength} Password</p>
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                        {reqs.map((r, i) => (
                            <div key={i} className={`flex items-center gap-1.5 text-xs ${r.ok ? 'text-green-600' : 'text-slate-400'}`}>
                                {r.ok ? <CheckCircle size={12}/> : <div className="w-3 h-3 rounded-full border border-slate-300"></div>}
                                {r.label}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
                    <button onClick={onClose} className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-50">Cancel</button>
                    <button onClick={onClose} className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-slate-800">Update Password</button>
                </div>
            </motion.div>
        </div>
    );
};

const DeleteModal = ({ onClose }) => {
    const [input, setInput] = useState('');
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.96 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="px-6 py-4 border-b border-red-100 flex items-center justify-between bg-red-50">
                    <h2 className="font-bold text-red-700">Delete Account</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-200"><XCircle size={20}/></button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 text-red-800">
                        <AlertTriangle size={24} className="shrink-0 mt-0.5"/>
                        <div>
                            <p className="font-bold text-sm">Are you absolutely sure?</p>
                            <p className="text-xs mt-1">All documents and verification records will be permanently deleted. This action cannot be undone.</p>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Enter your password to confirm</label>
                        <input type="password" value={input} onChange={e => setInput(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500 bg-slate-50 focus:bg-white" />
                    </div>
                </div>
                <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
                    <button onClick={onClose} className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-50">Cancel</button>
                    <button disabled={!input} className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition ${input ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>Delete Account</button>
                </div>
            </motion.div>
        </div>
    );
};

const TwoFAModal = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [method, setMethod] = useState('');
    const [otp, setOtp] = useState('');
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.96 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <h2 className="font-bold text-slate-800">Enable Two-Factor Authentication</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-200"><XCircle size={20}/></button>
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                        {[1,2,3].map(s => (
                            <React.Fragment key={s}>
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}`}>{s}</div>
                                {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-slate-900' : 'bg-slate-100'}`}></div>}
                            </React.Fragment>
                        ))}
                    </div>
                    {step === 1 && (
                        <div className="space-y-3">
                            <p className="text-sm font-semibold text-slate-700 mb-3">Choose Authentication Method</p>
                            {[['Authenticator App',Shield],['Email OTP',Mail],['SMS OTP',Smartphone]].map(([m, Icon]) => (
                                <button key={m} onClick={() => setMethod(m)}
                                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition ${method === m ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300'}`}>
                                    <Icon size={20} className="text-slate-500"/> <span className="font-medium text-slate-800">{m}</span>
                                    {method === m && <CheckCircle size={18} className="ml-auto text-green-500"/>}
                                </button>
                            ))}
                        </div>
                    )}
                    {step === 2 && (
                        <div className="space-y-4">
                            <p className="text-sm text-slate-600">Enter the OTP sent via <strong>{method}</strong>:</p>
                            <input type="text" maxLength={6} value={otp} onChange={e => setOtp(e.target.value)}
                                placeholder="Enter 6-digit OTP"
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-center text-2xl font-mono tracking-[0.4em] outline-none focus:ring-2 focus:ring-slate-900" />
                        </div>
                    )}
                    {step === 3 && (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={36}/></div>
                            <h3 className="text-lg font-bold text-slate-800">2FA Enabled!</h3>
                            <p className="text-sm text-slate-500 mt-1">Your account is now protected with two-factor authentication.</p>
                        </div>
                    )}
                </div>
                <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
                    <button onClick={onClose} className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-50">Cancel</button>
                    {step < 3
                        ? <button onClick={() => setStep(s => s+1)} disabled={step===1 && !method} className={`flex-1 py-2.5 rounded-xl font-medium text-sm ${(step===1 && !method) ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>{step===2 ? 'Verify OTP' : 'Next'}</button>
                        : <button onClick={onClose} className="flex-1 bg-green-600 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-green-700">Done</button>
                    }
                </div>
            </motion.div>
        </div>
    );
};

// ─── SECTION PANELS ───────────────────────────────────────────
const ProfileSettings = ({ onSave }) => {
    const [form, setForm] = useState(userData);
    const handleChange = (e) => setForm(p => ({...p, [e.target.name]: e.target.value}));
    const field = (name, label, type='text') => (
        <div key={name}>
            <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
            <input name={name} type={type} value={form[name] || ''} onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50 focus:bg-white transition" />
        </div>
    );
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader title="Profile Information" />
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {field('firstName','First Name')} {field('lastName','Last Name')}
                    {field('username','Username')}    {field('email','Email Address','email')}
                    {field('phone','Phone Number')}   {field('dob','Date of Birth')}
                    <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Gender</label>
                        <select name="gender" value={form.gender} onChange={handleChange}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50 cursor-pointer">
                            <option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option>
                        </select>
                    </div>
                    {field('address','Address')}
                    {field('city','City')}    {field('state','State')}
                    {field('country','Country')} {field('pincode','Pincode')}
                </CardContent>
            </Card>
            <div className="flex gap-3 justify-end">
                <button className="border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-50">Cancel</button>
                <button onClick={onSave} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-800">Save Profile</button>
            </div>
        </div>
    );
};

const AccountPreferences = () => {
    const [prefs, setPrefs] = useState({ lang:'English', tz:'Asia/Kolkata', dateFormat:'DD/MM/YYYY', theme:'Light', view:'List View', autoSave:true, rememberLogin:true });
    const toggle = k => setPrefs(p => ({...p,[k]:!p[k]}));
    const select = (k,v) => setPrefs(p => ({...p,[k]:v}));
    return (
        <Card>
            <CardHeader title="Account Preferences" />
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {[['lang','Language',['English','Hindi','Marathi']],['tz','Time Zone',['Asia/Kolkata','UTC','US/Eastern']],['dateFormat','Date Format',['DD/MM/YYYY','MM/DD/YYYY','YYYY-MM-DD']]].map(([k,label,opts]) => (
                        <div key={k}>
                            <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
                            <select value={prefs[k]} onChange={e => select(k,e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50 cursor-pointer">
                                {opts.map(o => <option key={o}>{o}</option>)}
                            </select>
                        </div>
                    ))}
                </div>
                <div>
                    <p className="text-xs font-medium text-slate-600 mb-2">Theme Preference</p>
                    <div className="flex gap-3">
                        {['Light','Dark','System Default'].map(t => (
                            <button key={t} onClick={() => select('theme',t)}
                                className={`flex-1 py-2 rounded-xl border-2 text-sm font-medium transition ${prefs.theme===t ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>{t}</button>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-xs font-medium text-slate-600 mb-2">Default Document View</p>
                    <div className="flex gap-3">
                        {['Grid View','List View'].map(v => (
                            <button key={v} onClick={() => select('view',v)}
                                className={`flex-1 py-2 rounded-xl border-2 text-sm font-medium transition ${prefs.view===v ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>{v}</button>
                        ))}
                    </div>
                </div>
                {[['autoSave','Auto Save Documents','Automatically saves document edits'],['rememberLogin','Remember Login Session','Stay logged in for 30 days']].map(([k,label,desc]) => (
                    <div key={k} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl">
                        <div><p className="text-sm font-semibold text-slate-800">{label}</p><p className="text-xs text-slate-500 mt-0.5">{desc}</p></div>
                        <Toggle value={prefs[k]} onChange={() => toggle(k)} />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

const NotificationSettings = () => {
    const [n, setN] = useState({ approved:true, rejected:true, pending:true, subscription:true, security:true, login:true, marketing:false });
    const toggle = k => setN(p => ({...p,[k]:!p[k]}));
    const items = [
        ['approved','Document Approved','Get notified when a document is approved.'],
        ['rejected','Document Rejected','Get notified when a document is rejected.'],
        ['pending','Document Pending','Get notified about pending documents.'],
        ['subscription','Subscription Updates','Billing reminders and renewal alerts.'],
        ['security','Security Alerts','Unusual login attempts and changes.'],
        ['login','Login Notifications','Every time you sign into your account.'],
        ['marketing','Marketing Emails','Product updates and feature announcements.'],
    ];
    return (
        <Card>
            <CardHeader title="Notification Settings" />
            <CardContent className="space-y-3">
                {items.map(([k, label, desc]) => (
                    <div key={k} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition">
                        <div><p className="text-sm font-semibold text-slate-800">{label}</p><p className="text-xs text-slate-500 mt-0.5">{desc}</p></div>
                        <Toggle value={n[k]} onChange={() => toggle(k)} />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

const PrivacySettings = () => {
    const [p, setP] = useState({ visibility:'Private', sharing:true, publicLink:true, search:false, activity:true });
    const toggle = k => setP(prev => ({...prev,[k]:!prev[k]}));
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader title="Privacy Settings" />
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-xs font-medium text-slate-600 mb-2">Profile Visibility</p>
                        <div className="flex gap-3">
                            {['Public','Private'].map(v => (
                                <button key={v} onClick={() => setP(prev => ({...prev,visibility:v}))}
                                    className={`flex-1 py-2 rounded-xl border-2 text-sm font-medium transition ${p.visibility===v ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>{v}</button>
                            ))}
                        </div>
                    </div>
                    {[['sharing','Allow Document Sharing','Others can request to view your documents.'],['publicLink','Allow Public Verification Link','Anyone with the link can verify your documents.'],['search','Search Visibility','Allow your profile to appear in search results.'],['activity','Show Activity Status','Show when you were last active.']].map(([k,label,desc]) => (
                        <div key={k} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition">
                            <div><p className="text-sm font-semibold text-slate-800">{label}</p><p className="text-xs text-slate-500 mt-0.5">{desc}</p></div>
                            <Toggle value={p[k]} onChange={() => toggle(k)} />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

const ConnectedDevices = () => (
    <div className="space-y-6">
        <Card>
            <CardHeader title="Connected Devices" subtitle={`${devices.length} devices logged in`} />
            <CardContent className="space-y-4">
                {devices.map(dev => (
                    <motion.div key={dev.id} whileHover={{ scale:1.01 }} className={`flex items-center justify-between p-4 border rounded-xl transition ${dev.current ? 'border-green-200 bg-green-50/50' : 'border-slate-100 hover:bg-slate-50'}`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${dev.current ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}><dev.icon size={20}/></div>
                            <div>
                                <div className="flex items-center gap-2"><p className="text-sm font-semibold text-slate-800">{dev.name}</p>{dev.current && <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">Current</span>}</div>
                                <p className="text-xs text-slate-500">{dev.os} · {dev.location}</p>
                                <p className="text-xs text-slate-400 mt-0.5">{dev.lastActive}</p>
                            </div>
                        </div>
                        {!dev.current && (
                            <button className="text-xs text-red-600 hover:bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition"><LogOut size={14}/> Logout</button>
                        )}
                    </motion.div>
                ))}
            </CardContent>
        </Card>
        <Card>
            <CardHeader title="Login History" />
            <div className="overflow-x-auto">
                <table className="w-full text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500">
                        <tr>
                            <th className="px-5 py-3 text-left font-medium">Date</th>
                            <th className="px-5 py-3 text-left font-medium">Device</th>
                            <th className="px-5 py-3 text-left font-medium">Location</th>
                            <th className="px-5 py-3 text-left font-medium">IP</th>
                            <th className="px-5 py-3 text-left font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loginHistory.map((h, i) => (
                            <tr key={i} className="hover:bg-slate-50 transition">
                                <td className="px-5 py-3 text-slate-500">{h.date}</td>
                                <td className="px-5 py-3 font-medium text-slate-800">{h.device}</td>
                                <td className="px-5 py-3 text-slate-500">{h.location}</td>
                                <td className="px-5 py-3 font-mono text-xs text-slate-400">{h.ip}</td>
                                <td className="px-5 py-3">
                                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${h.status === 'success' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                                        {h.status === 'success' ? 'Successful' : 'Failed'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
);

const SubscriptionSettings = () => (
    <Card>
        <CardHeader title="Subscription Settings" />
        <CardContent className="space-y-6">
            <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                <div className="flex items-center gap-2 mb-3"><Star size={18} className="text-yellow-400 fill-yellow-400"/><span className="text-yellow-400 font-semibold text-sm">Premium Plan</span><span className="ml-auto bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span></div>
                <p className="text-3xl font-black">₹199 <span className="text-lg font-normal text-slate-400">/ month</span></p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                    {[['Billing','Monthly'],['Renewal','25 Aug 2026'],['Storage','50 GB'],['Priority','High']].map(([l,v]) => (
                        <div key={l} className="bg-white/10 rounded-xl p-3"><p className="text-[10px] text-slate-400 uppercase">{l}</p><p className="text-sm font-semibold text-white mt-0.5">{v}</p></div>
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap gap-3">
                <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-800 flex items-center gap-2"><Star size={16}/> Upgrade Plan</button>
                <Link to="/user/subscription" className="border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-50 flex items-center gap-2"><CreditCard size={16}/> Manage Subscription</Link>
                <button className="border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-50 flex items-center gap-2"><Download size={16}/> Download Invoice</button>
            </div>
        </CardContent>
    </Card>
);

const SecurityPanel = ({ onChangePwd, onEnable2FA }) => {
    const items = [
        { label:'Password',          value:'Strong',   ok:true,  icon:Key },
        { label:'Email Verified',    value:'Verified', ok:true,  icon:Mail },
        { label:'Mobile Verified',   value:'Verified', ok:true,  icon:Smartphone },
        { label:'Two-Factor Auth',   value:'Disabled', ok:false, icon:ShieldCheck },
        { label:'Login Alerts',      value:'Enabled',  ok:true,  icon:Bell },
    ];
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader title="Security Settings" />
                <CardContent className="space-y-3">
                    {items.map((s, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.ok ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}><s.icon size={18}/></div>
                                <div><p className="text-sm font-semibold text-slate-800">{s.label}</p><p className={`text-xs ${s.ok ? 'text-green-600' : 'text-red-500'}`}>{s.value}</p></div>
                            </div>
                            {s.ok ? <CheckCircle size={18} className="text-green-500"/> : <AlertTriangle size={18} className="text-amber-400"/>}
                        </div>
                    ))}
                    <div className="flex flex-wrap gap-3 pt-2">
                        <button onClick={onChangePwd} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-800 flex items-center gap-2"><Key size={16}/> Change Password</button>
                        <button onClick={onEnable2FA} className="border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-50 flex items-center gap-2"><ShieldCheck size={16}/> Enable 2FA</button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const DangerZone = ({ onDelete }) => (
    <Card className="border-red-200">
        <div className="px-6 py-5 border-b border-red-100 bg-red-50/50 rounded-t-2xl"><h3 className="font-bold text-red-700 flex items-center gap-2"><AlertTriangle size={18}/> Danger Zone</h3></div>
        <CardContent className="space-y-4">
            <div className="flex items-start justify-between p-4 border border-orange-200 bg-orange-50/50 rounded-xl">
                <div><p className="text-sm font-bold text-orange-800">Deactivate Account</p><p className="text-xs text-orange-700 mt-1">Temporarily disable your account. You can reactivate it anytime.</p></div>
                <button className="shrink-0 ml-4 border border-orange-400 text-orange-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-orange-100 transition">Deactivate</button>
            </div>
            <div className="flex items-start justify-between p-4 border border-red-200 bg-red-50/50 rounded-xl">
                <div><p className="text-sm font-bold text-red-800">Delete Account Permanently</p><p className="text-xs text-red-700 mt-1">All documents, verification records and account history will be removed forever.</p></div>
                <button onClick={onDelete} className="shrink-0 ml-4 bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-700 transition flex items-center gap-1.5"><Trash2 size={14}/> Delete</button>
            </div>
        </CardContent>
    </Card>
);

// ─── MAIN PAGE ─────────────────────────────────────────────────
const NAV = [
    { id:'profile',      label:'Profile Settings',    icon: User },
    { id:'preferences',  label:'Account Preferences', icon: Settings },
    { id:'security',     label:'Security',            icon: Shield },
    { id:'notifications',label:'Notifications',       icon: Bell },
    { id:'privacy',      label:'Privacy',             icon: Eye },
    { id:'subscription', label:'Subscription',        icon: CreditCard },
    { id:'devices',      label:'Connected Devices',   icon: Monitor },
    { id:'danger',       label:'Danger Zone',         icon: AlertTriangle },
];

const AccountSettings = () => {
    const [active, setActive]   = useState('profile');
    const [loading, setLoading] = useState(true);
    const [showPwd, setShowPwd] = useState(false);
    const [showDel, setShowDel] = useState(false);
    const [show2fa, setShow2fa] = useState(false);
    const [saved,   setSaved]   = useState(false);

    useEffect(() => { const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t); }, []);

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

    const renderContent = () => {
        if (active === 'profile')       return <ProfileSettings onSave={handleSave} />;
        if (active === 'preferences')   return <AccountPreferences />;
        if (active === 'security')      return <SecurityPanel onChangePwd={() => setShowPwd(true)} onEnable2FA={() => setShow2fa(true)} />;
        if (active === 'notifications') return <NotificationSettings />;
        if (active === 'privacy')       return <PrivacySettings />;
        if (active === 'subscription')  return <SubscriptionSettings />;
        if (active === 'devices')       return <ConnectedDevices />;
        if (active === 'danger')        return <DangerZone onDelete={() => setShowDel(true)} />;
        return null;
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage your account preferences, privacy, security and application settings.</p>
                </div>
                <div className="flex items-center gap-3">
                    {saved && (
                        <motion.span initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0 }}
                            className="flex items-center gap-1.5 text-green-700 text-sm font-medium bg-green-50 border border-green-200 px-3 py-2 rounded-xl">
                            <CheckCircle size={16}/> Saved!
                        </motion.span>
                    )}
                    <button onClick={handleSave} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-800 transition shadow-sm">Save Changes</button>
                </div>
            </div>

            {loading ? (
                <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-2xl"></div>)}</div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* LEFT NAV */}
                    <div className="w-full lg:w-64 shrink-0">
                        <Card>
                            <CardContent className="p-2">
                                <nav className="space-y-1">
                                    {NAV.map(item => (
                                        <button key={item.id} onClick={() => setActive(item.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition text-left ${active === item.id ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'} ${item.id === 'danger' ? 'mt-4 border-t border-slate-100 pt-5 text-red-600 hover:bg-red-50 hover:text-red-700' : ''}`}>
                                            <item.icon size={18} className={active === item.id ? 'text-white' : item.id === 'danger' ? 'text-red-500' : 'text-slate-400'} />
                                            {item.label}
                                        </button>
                                    ))}
                                </nav>
                            </CardContent>
                        </Card>
                    </div>

                    {/* MAIN CONTENT */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col xl:flex-row gap-6">
                            <div className="flex-1 min-w-0">
                                <AnimatePresence mode="wait">
                                    <motion.div key={active} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.2 }}>
                                        {renderContent()}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* RIGHT SIDEBAR */}
                            <div className="w-full xl:w-72 space-y-6">
                                <Card>
                                    <CardHeader title="Security Score" />
                                    <CardContent className="pt-0 flex flex-col items-center gap-4">
                                        <ProgressRing pct={90} />
                                        <div className="w-full space-y-2">
                                            {[['Enable 2FA','amber'],['Update Password','green'],['Verify Mobile','green']].map(([t,c]) => (
                                                <div key={t} className={`flex items-center gap-2 text-xs p-2 rounded-lg ${c==='green' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                                                    {c === 'green' ? <CheckCircle size={13}/> : <AlertTriangle size={13}/>} {t}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader title="Account Overview" />
                                    <CardContent className="pt-0 space-y-3 text-sm">
                                        {[['Status','Verified ✓'],['Subscription','Premium'],['Documents','28'],['Storage Used','37%']].map(([l,v]) => (
                                            <div key={l} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                                                <span className="text-slate-500">{l}</span>
                                                <span className="font-semibold text-slate-800">{v}</span>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader title="Recent Security" />
                                    <CardContent className="pt-0 space-y-3">
                                        {[['Last Login','Today, 1:14 PM',true],['Password Changed','15 May 2026',true],['2FA Status','Disabled',false],['Login Alerts','Enabled',true]].map(([l,v,ok]) => (
                                            <div key={l} className="flex items-start justify-between text-xs py-2 border-b border-slate-100 last:border-0">
                                                <span className="text-slate-500">{l}</span>
                                                <span className={`font-semibold ${ok ? 'text-slate-800' : 'text-red-500'}`}>{v}</span>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <AnimatePresence>
                {showPwd && <ChangePasswordModal onClose={() => setShowPwd(false)} />}
                {showDel && <DeleteModal onClose={() => setShowDel(false)} />}
                {show2fa && <TwoFAModal onClose={() => setShow2fa(false)} />}
            </AnimatePresence>
        </div>
    );
};

export default AccountSettings;
