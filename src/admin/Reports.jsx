import { useState } from 'react';
import { FaExclamationTriangle, FaTrash, FaCheck } from 'react-icons/fa';

export default function Reports() {
  const [reports, setReports] = useState([
    { id: '1', item: 'Duplicate KTU Notes Post', reportedBy: 'Student #428', college: 'MEC Kochi', reason: 'Repeated posting of same item multiple times', date: '16 Nov 2026' },
    { id: '2', item: 'Fake Calculator Model Number', reportedBy: 'Student #104', college: 'CET Trivandrum', reason: 'Title says fx-991EX but photo shows older 82MS model', date: '15 Nov 2026' }
  ]);

  const handleResolve = (id) => {
    setReports(reports.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Flagged Listings & Reports</h1>
        <p className="text-xs text-slate-400 mt-1">Review community flags and reported marketplace items.</p>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FaExclamationTriangle className="text-amber-400 text-sm" />
                <h3 className="font-bold text-white text-sm">{report.item}</h3>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                  📍 {report.college}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Reason: <span className="text-slate-200">{report.reason}</span>
              </p>
              <p className="text-[11px] text-slate-500">
                Reported by {report.reportedBy} on {report.date}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleResolve(report.id)}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 hover:bg-emerald-900 px-3 py-1.5 text-xs font-bold transition"
              >
                <FaCheck className="text-[10px]" />
                <span>Dismiss</span>
              </button>
              <button
                onClick={() => handleResolve(report.id)}
                className="flex items-center gap-1.5 rounded-lg bg-red-950 border border-red-800 text-red-400 hover:bg-red-900 px-3 py-1.5 text-xs font-bold transition"
              >
                <FaTrash className="text-[10px]" />
                <span>Remove Item</span>
              </button>
            </div>
          </div>
        ))}

        {reports.length === 0 && (
          <div className="text-center py-12 bg-slate-950 rounded-2xl border border-slate-800 text-slate-400 text-xs">
            🎉 No active reports or flagged items right now!
          </div>
        )}
      </div>
    </div>
  );
}
