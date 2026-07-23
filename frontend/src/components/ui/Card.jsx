
export const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 ${className}`}>
        {children}
    </div>
);
export const CardHeader = ({ title, subtitle, action }) => (
    <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div>
            <h3 className="font-semibold text-slate-800">{title}</h3>
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
    </div>
);
export const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);
