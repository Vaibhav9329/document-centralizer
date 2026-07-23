
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CreditCard, Cloud, Upload, Share2, ShieldCheck, Zap, Download, 
    Check, Star, Building2, ToggleLeft, ToggleRight, HardDrive,
    Receipt, HeadphonesIcon, HelpCircle, ExternalLink, ChevronRight,
    Plus, Smartphone, Wifi, Wallet
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

// DUMMY DATA
const currentPlan = {
    name: "Premium Plan",
    status: "Active",
    price: "₹199",
    cycle: "Monthly",
    renewalDate: "25 August 2026",
    subscriptionId: "SUB-2026-10021",
    storage: 50,
    storageUsed: 18.6,
    verificationPriority: "High Priority",
    shareableLinks: "Unlimited",
    digitalLocker: "Enabled",
    verificationRequests: "Unlimited",
};

const paymentHistory = [
    { id: "INV-2026-12003", plan: "Premium Monthly", amount: "₹199", date: "2026-07-01", method: "UPI", status: "Paid" },
    { id: "INV-2026-12002", plan: "Premium Monthly", amount: "₹199", date: "2026-06-01", method: "Visa •••• 4242", status: "Paid" },
    { id: "INV-2026-12001", plan: "Premium Monthly", amount: "₹199", date: "2026-05-01", method: "UPI", status: "Paid" },
    { id: "INV-2026-11999", plan: "Free Plan",       amount: "₹0",   date: "2026-04-01", method: "-",   status: "Paid" },
];

const paymentMethods = [
    { id: 1, type: "visa",    label: "Visa •••• 4242", icon: CreditCard, expires: "12/27", isDefault: true },
    { id: 2, type: "upi",     label: "user@upi",       icon: Smartphone, expires: "",      isDefault: false },
    { id: 3, type: "wallet",  label: "Paytm Wallet",   icon: Wallet,     expires: "",      isDefault: false },
];

const features = [
    "Unlimited Document Upload", "Priority Verification", "Unlimited Share Links",
    "QR Code Verification", "Digital Document Locker", "Secure Cloud Backup",
    "Faster Verification", "Download Verified Documents", "Multi Device Access", "Document History"
];

const plans = [
    {
        name: "Free",
        price: "₹0",
        cycle: "",
        badge: null,
        features: ["5 GB Storage", "10 Document Uploads", "Basic Verification", "Limited Sharing"],
        cta: "Current Plan",
        highlight: false,
        isCurrent: false,
    },
    {
        name: "Premium",
        price: "₹199",
        cycle: "/ month",
        badge: "Most Popular",
        features: ["50 GB Storage", "Unlimited Uploads", "Priority Verification", "Unlimited Sharing", "QR Verification", "Cloud Backup"],
        cta: "Current Plan",
        highlight: true,
        isCurrent: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        cycle: "",
        badge: null,
        features: ["Unlimited Storage", "Unlimited Users", "Admin Dashboard", "Analytics", "Priority Support", "Custom Branding"],
        cta: "Contact Sales",
        highlight: false,
        isCurrent: false,
    },
];

// Sub Components
const ProgressCircle = ({ used, total }) => {
    const pct = Math.round((used / total) * 100);
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (pct / 100) * circumference;
    return (
        <div className="relative w-40 h-40 flex items-center justify-center mx-auto">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                <motion.circle cx="60" cy="60" r="54" fill="none" stroke="#1e293b" strokeWidth="10"
                    strokeLinecap="round" strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </svg>
            <div className="absolute text-center">
                <p className="text-2xl font-bold text-slate-800">{pct}%</p>
                <p className="text-xs text-slate-500">Used</p>
            </div>
        </div>
    );
};

const PlanCard = ({ plan }) => (
    <motion.div whileHover={{ y: -6 }} className={`relative flex flex-col rounded-2xl border-2 p-6 ${plan.highlight ? 'border-slate-900 shadow-xl' : 'border-slate-200 shadow-sm bg-white'} ${plan.highlight ? 'bg-slate-900 text-white' : ''}`}>
        {plan.badge && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">{plan.badge}</span>
            </div>
        )}
        {plan.isCurrent && (
            <div className="absolute top-4 right-4">
                <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Active</span>
            </div>
        )}
        <h3 className={`font-bold text-lg mb-1 ${plan.highlight ? 'text-white' : 'text-slate-800'}`}>{plan.name}</h3>
        <div className="flex items-end gap-1 mb-6">
            <span className={`text-4xl font-black ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
            <span className={`text-sm mb-1.5 ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>{plan.cycle}</span>
        </div>
        <ul className="space-y-3 flex-1 mb-8">
            {plan.features.map((f, i) => (
                <li key={i} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-slate-200' : 'text-slate-600'}`}>
                    <Check size={16} className={plan.highlight ? 'text-green-400' : 'text-green-600'} /> {f}
                </li>
            ))}
        </ul>
        <button className={`w-full py-3 rounded-xl font-semibold text-sm transition ${plan.highlight ? 'bg-white text-slate-900 hover:bg-slate-100' : plan.cta === 'Contact Sales' ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-100 text-slate-500 cursor-default'}`}>
            {plan.cta}
        </button>
    </motion.div>
);

// Main Page
const Subscription = () => {
    const [autoRenew, setAutoRenew] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setIsLoading(false), 700);
        return () => clearTimeout(t);
    }, []);

    const storagePercent = Math.round((currentPlan.storageUsed / currentPlan.storage) * 100);

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-16">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">My Subscription</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage your current plan, billing details, storage usage and payment history.</p>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-slate-800 transition shadow-sm">
                    <Zap size={16} /> Upgrade Plan
                </motion.button>
            </div>

            {/* Top Row — Current Plan + Storage + Auto Renewal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Current Plan Card */}
                <div className="lg:col-span-2">
                    <Card className="h-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl"></div>
                        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3"></div>
                        <CardContent className="relative z-10 p-8 text-white flex flex-col gap-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Star size={20} className="text-yellow-400 fill-yellow-400" />
                                        <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Premium Plan</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-white">{currentPlan.price}<span className="text-lg font-medium text-slate-300"> / {currentPlan.cycle}</span></h2>
                                </div>
                                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Active</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {[
                                    { label: "Subscription ID", value: currentPlan.subscriptionId },
                                    { label: "Renewal Date",    value: currentPlan.renewalDate },
                                    { label: "Storage",         value: currentPlan.storage + " GB" },
                                    { label: "Verification",    value: currentPlan.verificationPriority },
                                    { label: "Share Links",     value: currentPlan.shareableLinks },
                                    { label: "Digital Locker",  value: currentPlan.digitalLocker },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/10 rounded-xl p-3">
                                        <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                                        <p className="text-sm font-semibold text-white">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Storage Card */}
                <Card>
                    <CardHeader title="Storage Usage" />
                    <CardContent className="pt-0 text-center space-y-4">
                        <ProgressCircle used={currentPlan.storageUsed} total={currentPlan.storage} />
                        <div>
                            <p className="text-xl font-bold text-slate-800">{currentPlan.storageUsed} GB <span className="text-slate-400 font-normal text-base">/ {currentPlan.storage} GB</span></p>
                            <p className="text-sm text-slate-500 mt-1">{(currentPlan.storage - currentPlan.storageUsed).toFixed(1)} GB remaining</p>
                        </div>
                        {storagePercent > 30 && (
                            <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs p-3 rounded-xl">
                                Upgrade to get more storage.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Features included */}
            <Card>
                <CardHeader title="Features Included in Your Plan" subtitle="Everything available in Premium" />
                <CardContent className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700 font-medium">
                            <Check size={16} className="text-green-500 shrink-0" /> {f}
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Available Plans */}
            <div>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Available Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan, i) => <PlanCard key={i} plan={plan} />)}
                </div>
            </div>

            {/* Auto Renewal + Payment Methods */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Auto Renewal */}
                <Card>
                    <CardHeader title="Auto Renewal" />
                    <CardContent className="pt-0 space-y-5">
                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                            <div>
                                <p className="font-semibold text-slate-800">Auto-renewal is {autoRenew ? "enabled" : "disabled"}</p>
                                <p className="text-sm text-slate-500 mt-1">Next billing: <span className="font-medium text-slate-700">25 August 2026 — ₹199</span></p>
                            </div>
                            <button onClick={() => setAutoRenew(!autoRenew)} className="shrink-0">
                                {autoRenew
                                    ? <ToggleRight size={44} className="text-green-500" />
                                    : <ToggleLeft size={44} className="text-slate-300" />
                                }
                            </button>
                        </div>
                        <button className="w-full border border-slate-200 text-slate-700 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition flex items-center justify-center gap-2">
                            <CreditCard size={16} /> Manage Billing
                        </button>
                    </CardContent>
                </Card>

                {/* Payment Methods */}
                <Card>
                    <CardHeader title="Payment Methods" action={
                        <button className="flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:text-blue-700"><Plus size={16}/> Add New</button>
                    }/>
                    <CardContent className="pt-0 space-y-3">
                        {paymentMethods.map((pm) => (
                            <div key={pm.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600"><pm.icon size={18}/></div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">{pm.label}</p>
                                        {pm.expires && <p className="text-xs text-slate-400">Expires {pm.expires}</p>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {pm.isDefault && <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full font-semibold">Default</span>}
                                    <button className="text-slate-400 hover:text-red-500 text-xs hidden group-hover:block">Remove</button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Payment History */}
            <Card>
                <CardHeader title="Payment History" subtitle="Your recent billing records" />
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Invoice ID</th>
                                <th className="px-6 py-4 font-medium">Plan</th>
                                <th className="px-6 py-4 font-medium">Amount</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Method</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {paymentHistory.map((inv) => (
                                <motion.tr key={inv.id} whileHover={{ backgroundColor: "rgba(248,250,252,1)" }} className="group">
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{inv.id}</td>
                                    <td className="px-6 py-4 font-medium text-slate-800">{inv.plan}</td>
                                    <td className="px-6 py-4 font-bold text-slate-800">{inv.amount}</td>
                                    <td className="px-6 py-4 text-slate-500">{inv.date}</td>
                                    <td className="px-6 py-4 text-slate-500">{inv.method}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">{inv.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-slate-700 p-2 hover:bg-slate-100 rounded-lg transition"><Download size={16}/></button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Right sidebar section — Help & Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Subscription Summary */}
                <Card>
                    <CardHeader title="Subscription Summary" />
                    <CardContent className="pt-0 space-y-3 text-sm">
                        {[
                            { label: "Current Plan", value: "Premium" },
                            { label: "Status",       value: "Active" },
                            { label: "Renewal Date", value: "25 Aug 2026" },
                            { label: "Storage",      value: `${currentPlan.storageUsed} / ${currentPlan.storage} GB` },
                        ].map((r, i) => (
                            <div key={i} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                                <span className="text-slate-500">{r.label}</span>
                                <span className="font-semibold text-slate-800">{r.value}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader title="Quick Actions" />
                    <CardContent className="pt-0 space-y-2">
                        {[
                            { label: "Upgrade Plan",      icon: Zap },
                            { label: "Download Invoice",  icon: Download },
                            { label: "Payment History",   icon: Receipt },
                            { label: "Manage Billing",    icon: CreditCard },
                        ].map((action, i) => (
                            <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100 group">
                                <span className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                    <action.icon size={16} className="text-slate-400 group-hover:text-slate-700" /> {action.label}
                                </span>
                                <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500" />
                            </button>
                        ))}
                    </CardContent>
                </Card>

                {/* Support */}
                <Card>
                    <CardHeader title="Need Help?" />
                    <CardContent className="pt-0 space-y-2">
                        {[
                            { label: "Contact Support", icon: HeadphonesIcon },
                            { label: "FAQs",            icon: HelpCircle },
                            { label: "Help Center",     icon: ExternalLink },
                        ].map((item, i) => (
                            <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100 group">
                                <span className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                    <item.icon size={16} className="text-slate-400 group-hover:text-blue-500" /> {item.label}
                                </span>
                                <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500" />
                            </button>
                        ))}
                    </CardContent>
                </Card>
            </div>

        </div>
    );
};

export default Subscription;
