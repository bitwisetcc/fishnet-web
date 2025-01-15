export default function DashboardPanel({ title, content, description, children }) {
  return (
    <div className="dashboard-panel rounded-lg bg-base-200 border-slate-400 border p-4 shadow-md">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      {content && <span className="text-2xl md:text-3xl">{content}</span>}
      {description && <p className="text-sm">{description}</p>}
      {children}
    </div>
  );
}