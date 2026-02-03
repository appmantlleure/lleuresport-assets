// ══════════════════════════════════════════════════════════════════
// COMPONENTE: VISTA LOGIN
// ══════════════════════════════════════════════════════════════════

const VistaLogin = ({ onLogin, config }) => {
    const [nombre, setNombre] = React.useState('');
    const [pin, setPin] = React.useState('');
    const [centroSel, setCentroSel] = React.useState('');
    const [cargando, setCargando] = React.useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!nombre || !pin || !centroSel) {
            alert('⚠️ Por favor completa todos los campos');
            return;
        }
        
        setCargando(true);
        onLogin(nombre, pin, centroSel);
    };
    
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="card slide-up">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-3xl">🏊</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Lleuresport</h1>
                        <p className="text-slate-400">Sistema de Mantenimiento</p>
                    </div>
                    
                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Usuario
                            </label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="input"
                                placeholder="Tu nombre"
                                autoComplete="username"
                                disabled={cargando}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                PIN
                            </label>
                            <input
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="input"
                                placeholder="••••"
                                autoComplete="current-password"
                                disabled={cargando}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Centro
                            </label>
                            <select
                                value={centroSel}
                                onChange={(e) => setCentroSel(e.target.value)}
                                className="input"
                                disabled={cargando}
                            >
                                <option value="">Seleccionar centro...</option>
                                <option value="CEM Can Ricart">CEM Can Ricart</option>
                                <option value="CEM Colom">CEM Colom</option>
                            </select>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full btn btn-primary"
                            disabled={cargando}
                        >
                            {cargando ? 'INICIANDO...' : 'INICIAR SESIÓN'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
