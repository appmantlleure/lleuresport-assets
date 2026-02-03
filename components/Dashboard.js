// ══════════════════════════════════════════════════════════════════
// COMPONENTE: VISTA DASHBOARD
// ══════════════════════════════════════════════════════════════════

const VistaDashboard = ({ usuario, centro, data, niveles, onLogout, onCambiarVista, onRecargarDatos }) => {
    const tipoAcciones = [
        { id: 'control-piscina', nombre: 'Control Piscina', emoji: '📊', color: 'from-blue-500 to-cyan-500' },
        { id: 'check-preventivo', nombre: 'Check Preventivo', emoji: '🔧', color: 'from-green-500 to-emerald-500' },
        { id: 'purga', nombre: 'Purga Terminales', emoji: '💧', color: 'from-sky-500 to-blue-500' },
        { id: 'agua-red', nombre: 'Agua de Red', emoji: '🚰', color: 'from-teal-500 to-cyan-500' },
        { id: 'temperatura', nombre: 'Temperatura', emoji: '🌡️', color: 'from-orange-500 to-red-500' },
        { id: 'acs', nombre: 'ACS', emoji: '🔥', color: 'from-red-500 to-pink-500' },
        { id: 'legionela', nombre: 'Legionela', emoji: '🦠', color: 'from-purple-500 to-pink-500' },
        { id: 'difusores', nombre: 'Difusores', emoji: '🚿', color: 'from-indigo-500 to-purple-500' },
        { id: 'langelier', nombre: 'Langelier', emoji: '🔢', color: 'from-yellow-500 to-orange-500' },
        { id: 'correctivos', nombre: 'Correctivos', emoji: '🚨', color: 'from-red-600 to-rose-600' },
        { id: 'visitas', nombre: 'Visitas Lab', emoji: '📋', color: 'from-slate-500 to-gray-500' }
    ];
    
    const [vistaActual, setVistaActual] = React.useState('inicio');
    
    const renderInicio = () => (
        <div className="p-4 space-y-6">
            {/* Bienvenida */}
            <div className="card">
                <h2 className="text-xl font-bold text-white mb-2">
                    ¡Hola, {usuario.nombre}! 👋
                </h2>
                <p className="text-slate-400">Bienvenido al sistema de mantenimiento</p>
                <p className="text-sm text-slate-500 mt-1">{centro}</p>
            </div>
            
            {/* Estadísticas Rápidas */}
            <div className="grid grid-cols-2 gap-4">
                <div className="card text-center bg-gradient-to-br from-sky-900/50 to-blue-900/50">
                    <p className="text-3xl font-bold text-sky-400">
                        {data.tasks ? data.tasks.length : 0}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">Órdenes Pendientes</p>
                </div>
                <div className="card text-center bg-gradient-to-br from-green-900/50 to-emerald-900/50">
                    <p className="text-3xl font-bold text-green-400">
                        {niveles ? niveles.filter(n => !n.alerta).length : 0}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">Químicos OK</p>
                </div>
            </div>
            
            {/* Alertas */}
            {data.alerts && data.alerts.length > 0 && (
                <div className="card bg-red-900/20 border border-red-500/30">
                    <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center">
                        <span className="mr-2">⚠️</span>
                        Alertas Activas
                    </h3>
                    <div className="space-y-2">
                        {data.alerts.map((alerta, idx) => (
                            <div key={idx} className="bg-slate-800/50 rounded-lg p-3">
                                <p className="text-white font-medium">{alerta.mensaje}</p>
                                <p className="text-xs text-slate-400 mt-1">{alerta.fecha}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Acciones Rápidas */}
            <div className="card">
                <h3 className="text-lg font-bold text-white mb-4">Acciones Rápidas</h3>
                <div className="space-y-3">
                    <button
                        onClick={() => setVistaActual('formularios')}
                        className="w-full btn btn-primary text-left flex items-center justify-between"
                    >
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">📋</span>
                            <span>Nuevo Registro</span>
                        </div>
                        <span>›</span>
                    </button>
                    
                    <button
                        onClick={() => onCambiarVista('calendario')}
                        className="w-full btn btn-secondary text-left flex items-center justify-between"
                    >
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">📅</span>
                            <span>Ver Calendario</span>
                        </div>
                        <span>›</span>
                    </button>
                    
                    <button
                        onClick={() => onCambiarVista('ordenes')}
                        className="w-full btn btn-secondary text-left flex items-center justify-between"
                    >
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">📝</span>
                            <span>Gestionar Órdenes</span>
                        </div>
                        <span>›</span>
                    </button>
                    
                    <button
                        onClick={() => onCambiarVista('quimicos')}
                        className="w-full btn btn-secondary text-left flex items-center justify-between"
                    >
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🧪</span>
                            <span>Monitor Químicos</span>
                        </div>
                        <span>›</span>
                    </button>
                </div>
            </div>
            
            {/* Niveles Químicos */}
            {niveles && niveles.length > 0 && (
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">Niveles Químicos</h3>
                        <button
                            onClick={() => onCambiarVista('quimicos')}
                            className="text-sky-400 text-sm"
                        >
                            Ver todo ›
                        </button>
                    </div>
                    <div className="space-y-3">
                        {niveles.slice(0, 3).map((nivel, idx) => (
                            <div key={idx} className="bg-slate-700/50 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white font-medium">{nivel.producto}</span>
                                    <span className={`text-sm font-bold ${
                                        nivel.alertaCritica ? 'text-red-500' : 
                                        nivel.alerta ? 'text-orange-500' : 'text-green-500'
                                    }`}>
                                        {nivel.nivel}%
                                    </span>
                                </div>
                                <div className="w-full bg-slate-600 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all ${
                                            nivel.alertaCritica ? 'bg-red-500' : 
                                            nivel.alerta ? 'bg-orange-500' : 'bg-green-500'
                                        }`}
                                        style={{ width: `${Math.min(100, nivel.nivel)}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">
                                    {nivel.diasRestantes} días restantes
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Admin (solo para admins) */}
            {usuario.rol === 'Admin' && (
                <div className="card bg-purple-900/20 border border-purple-500/30">
                    <button
                        onClick={() => onCambiarVista('admin')}
                        className="w-full text-left flex items-center justify-between"
                    >
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">⚙️</span>
                            <div>
                                <p className="text-white font-medium">Panel de Administración</p>
                                <p className="text-xs text-slate-400">Gestionar usuarios y sistema</p>
                            </div>
                        </div>
                        <span className="text-purple-400">›</span>
                    </button>
                </div>
            )}
        </div>
    );
    
    const renderFormularios = () => (
        <div className="p-4 space-y-4">
            <div className="flex items-center mb-4">
                <button
                    onClick={() => setVistaActual('inicio')}
                    className="text-sky-400 mr-3"
                >
                    ‹ Volver
                </button>
                <h2 className="text-xl font-bold text-white">Seleccionar Formulario</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
                {tipoAcciones.map((accion) => (
                    <button
                        key={accion.id}
                        onClick={() => onCambiarVista('form-' + accion.id)}
                        className="card card-hover bg-gradient-to-br"
                        style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                    >
                        <div className={`bg-gradient-to-br ${accion.color} p-4 rounded-xl flex items-center justify-between`}>
                            <div className="flex items-center">
                                <span className="text-3xl mr-3">{accion.emoji}</span>
                                <span className="text-white font-bold">{accion.nombre}</span>
                            </div>
                            <span className="text-white text-2xl">›</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
    
    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            {/* Header */}
            <header className="bg-slate-900 p-4 safe-top sticky top-0 z-40 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-white">Lleuresport</h1>
                        <p className="text-sm text-slate-400">{centro}</p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="btn btn-secondary text-sm"
                    >
                        Salir
                    </button>
                </div>
            </header>
            
            {/* Contenido */}
            {vistaActual === 'inicio' && renderInicio()}
            {vistaActual === 'formularios' && renderFormularios()}
        </div>
    );
};
