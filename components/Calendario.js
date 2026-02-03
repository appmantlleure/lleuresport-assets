// Componente Calendario - PLACEHOLDER
const VistaCalendario = ({ usuario, centro, onVolver }) => {
    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            <header className="bg-slate-900 p-4 safe-top sticky top-0 z-40">
                <div className="flex items-center">
                    <button onClick={onVolver} className="text-sky-400 mr-3 text-2xl">‹</button>
                    <h1 className="text-xl font-bold text-white">📅 Calendario</h1>
                </div>
            </header>
            <div className="p-4">
                <div className="card">
                    <p className="text-white">Calendario de tareas (componente en desarrollo)</p>
                </div>
            </div>
        </div>
    );
};
