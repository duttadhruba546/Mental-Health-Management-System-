import React, { useState } from "react";

// Mental Health Management System - Single-file React demo
// Tailwind CSS classes are used for styling (no extra CSS file required if Tailwind is available)
// How to run:
// 1) Create a new React app (Vite or CRA) and enable Tailwind.
// 2) Drop this file as `MentalHealthDemo.jsx` and import it in App.jsx: `import MentalHealthDemo from './MentalHealthDemo'`.
// 3) Render <MentalHealthDemo /> in your app.

export default function MentalHealthDemo() {
  const [view, setView] = useState("home"); // home | dashboard | tracker | resources | contact
  const [mood, setMood] = useState(7);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState([
    { date: "2025-10-15", mood: 6, note: "Light exercise helped." },
    { date: "2025-10-16", mood: 8, note: "Good sleep." },
    { date: "2025-10-18", mood: 5, note: "Stressed about exams." },
  ]);

  function addEntry() {
    const newEntry = {
      date: new Date().toISOString().slice(0, 10),
      mood: Number(mood),
      note: note.slice(0, 200),
    };
    setEntries([newEntry, ...entries]);
    setNote("");
  }

  // simple metrics
  const avgMood =
    entries.length === 0
      ? 0
      : Math.round(entries.reduce((s, e) => s + e.mood, 0) / entries.length);

  // small inline bar chart data derived from entries
  const chartData = entries
    .slice(0, 7)
    .map((e) => ({ label: e.date.slice(5), value: e.mood }));

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">MH</div>
            <div>
              <h1 className="text-lg font-semibold">Mental Health Management System</h1>
              <p className="text-xs text-gray-500">Track moods • Learn coping tools • Get resources</p>
            </div>
          </div>

          <nav className="flex gap-2 items-center">
            <button onClick={() => setView("home")} className={`px-3 py-2 rounded ${view==='home'? 'bg-indigo-50 text-indigo-600' : 'text-sm text-gray-600'}`}>Home</button>
            <button onClick={() => setView("dashboard")} className={`px-3 py-2 rounded ${view==='dashboard'? 'bg-indigo-50 text-indigo-600' : 'text-sm text-gray-600'}`}>Dashboard</button>
            <button onClick={() => setView("tracker")} className={`px-3 py-2 rounded ${view==='tracker'? 'bg-indigo-50 text-indigo-600' : 'text-sm text-gray-600'}`}>Mood Tracker</button>
            <button onClick={() => setView("resources")} className={`px-3 py-2 rounded ${view==='resources'? 'bg-indigo-50 text-indigo-600' : 'text-sm text-gray-600'}`}>Resources</button>
            <button onClick={() => setView("contact")} className={`px-3 py-2 rounded ${view==='contact'? 'bg-indigo-50 text-indigo-600' : 'text-sm text-gray-600'}`}>Contact</button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {view === "home" && (
          <section className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold">A simple, private way to manage your mental wellbeing</h2>
              <p className="mt-3 text-gray-600">Log moods, track progress, learn quick coping exercises and access local/national resources. Designed for students and anyone who wants a low-effort daily check-in.</p>

              <div className="mt-6 flex gap-3">
                <button onClick={() => setView("tracker")} className="px-4 py-2 bg-indigo-600 text-white rounded shadow">Start Tracker</button>
                <button onClick={() => setView("resources")} className="px-4 py-2 border rounded">See Resources</button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="p-4 bg-white rounded shadow-sm">
                  <strong>Privacy-first</strong>
                  <div className="text-xs text-gray-500">Data stays on your device in this demo (no servers).</div>
                </div>
                <div className="p-4 bg-white rounded shadow-sm">
                  <strong>Quick check-ins</strong>
                  <div className="text-xs text-gray-500">Takes 20 seconds to log and reflect.</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold">Today's Snapshot</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 rounded">
                  <div className="text-sm text-gray-500">Average mood (last {entries.length} entries)</div>
                  <div className="text-3xl font-bold">{avgMood}</div>
                </div>
                <div className="p-4 bg-rose-50 rounded">
                  <div className="text-sm text-gray-500">Entries tracked</div>
                  <div className="text-3xl font-bold">{entries.length}</div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm text-gray-600">Recent notes</h4>
                <ul className="mt-2 space-y-2">
                  {entries.slice(0,3).map((e, i) => (
                    <li key={i} className="text-sm p-2 bg-gray-50 rounded">{e.date} — <span className="font-medium">{e.mood}</span> — {e.note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {view === "dashboard" && (
          <section className="mt-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-gray-600 mt-1">Overview of your recent mood trends and notes.</p>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded shadow">
                <div className="text-xs text-gray-500">Average Mood</div>
                <div className="text-3xl font-bold">{avgMood}</div>
                <div className="text-sm text-gray-500 mt-2">Based on {entries.length} entries</div>
              </div>

              <div className="p-4 bg-white rounded shadow col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Recent Mood (last {chartData.length} days)</div>
                    <div className="text-lg font-semibold">Mood trend</div>
                  </div>
                </div>

                {/* Inline simple bar chart */}
                <div className="mt-4 h-32 flex items-end gap-2">
                  {chartData.length === 0 ? (
                    <div className="text-sm text-gray-500">No data yet — add entries in Mood Tracker.</div>
                  ) : (
                    chartData.map((d, i) => {
                      const height = (d.value / 10) * 100; // percent
                      return (
                        <div key={i} className="flex-1 h-full flex items-end">
                          <div className="w-full rounded-t" style={{ height: `${height}%`, background: `linear-gradient(180deg, #7c3aed, #06b6d4)` }} title={`${d.label}: ${d.value}`} />
                        </div>
                      );
                    })
                  )}
                </div>

              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded shadow">
                <h4 className="font-semibold">Recent Notes</h4>
                <div className="mt-3 space-y-2 text-sm">
                  {entries.map((e, i) => (
                    <div key={i} className="p-2 bg-gray-50 rounded">{e.date} — <strong>{e.mood}</strong> — {e.note}</div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white rounded shadow">
                <h4 className="font-semibold">Quick Coping Exercises</h4>
                <ul className="mt-3 list-disc pl-5 text-sm text-gray-700">
                  <li>4-4-8 breathing — inhale 4s, hold 4s, exhale 8s (repeat 3x)</li>
                  <li>5-minute walk and sensory check: 3 things you see, 2 you hear, 1 you feel</li>
                  <li>Write 3 small wins of today</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {view === "tracker" && (
          <section className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold">Mood Tracker</h3>
              <p className="text-sm text-gray-500 mt-1">Quick daily check-in — pick a number from 1 (low) to 10 (high).</p>

              <div className="mt-4">
                <label className="block text-sm mb-2">Mood: <span className="font-medium">{mood}</span></label>
                <input type="range" min="1" max="10" value={mood} onChange={(e) => setMood(e.target.value)} className="w-full" />

                <label className="block text-sm mt-4">Note (optional)</label>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} className="w-full mt-2 p-2 border rounded" rows={4} placeholder="What happened today? Anything helpful/difficult?" />

                <div className="mt-4 flex gap-2">
                  <button onClick={addEntry} className="px-4 py-2 bg-indigo-600 text-white rounded">Save entry</button>
                  <button onClick={() => { setMood(7); setNote(""); }} className="px-4 py-2 border rounded">Reset</button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold">History</h3>
              <p className="text-sm text-gray-500 mt-1">Recent check-ins</p>

              <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
                {entries.map((e, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium">{e.date} — Mood {e.mood}</div>
                      <div className="text-xs text-gray-600 mt-1">{e.note}</div>
                    </div>
                    <div className="text-xs text-gray-500">#{i+1}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {view === "resources" && (
          <section className="mt-6">
            <h2 className="text-2xl font-bold">Resources</h2>
            <p className="text-gray-600 mt-1">Helpful places and tools to explore.</p>

            <div className="mt-4 grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded shadow">
                <h4 className="font-semibold">Self-help guides</h4>
                <div className="text-sm text-gray-600 mt-2">Guided breathing, cognitive reframing worksheets, and sleep hygiene tips.</div>
              </div>

              <div className="p-4 bg-white rounded shadow">
                <h4 className="font-semibold">Crisis</h4>
                <div className="text-sm text-gray-600 mt-2">If you're in immediate danger or thinking of harming yourself, contact local emergency services. This demo doesn't replace professional help.</div>
              </div>

              <div className="p-4 bg-white rounded shadow">
                <h4 className="font-semibold">Local services</h4>
                <div className="text-sm text-gray-600 mt-2">Contact campus counseling, national hotlines, or trusted local NGOs. Add links in production.</div>
              </div>
            </div>
          </section>
        )}

        {view === "contact" && (
          <section className="mt-6 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold">Contact / Feedback</h2>
            <p className="text-gray-600 mt-1">Share feedback about this demo or request features.</p>

            <form className="mt-4 grid gap-3 max-w-xl">
              <input className="p-2 border rounded" placeholder="Your name (optional)" />
              <input className="p-2 border rounded" placeholder="Email (optional)" />
              <textarea className="p-2 border rounded" rows={4} placeholder="Message" />
              <div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded">Send</button>
              </div>
            </form>
          </section>
        )}

        <footer className="mt-8 text-sm text-gray-500 text-center">Made with care — Mental Health Management System demo</footer>
      </main>
    </div>
  );
}
