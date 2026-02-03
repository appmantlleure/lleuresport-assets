// ══════════════════════════════════════════════════════════════════
// COMPONENTE: MONITOR DE QUÍMICOS COMPLETO
// ══════════════════════════════════════════════════════════════════

const MonitorQuimicos = ({ centro, usuario, onVolver, onActualizar }) => {
    const [niveles, setNiveles] = React.useState([]);
    const [cargando, setCargando] = React.useState(true);
    const [modal, setModal] = React.useState(null);
    const [editando, setEditando] = React.useState(null);
    
    React.useEffect(() => {
        cargarNiveles();
    }, [centro]);
    
    const cargarNiveles = () => {
        setCargando(true);
        google.script.run
            .withSuccessHandler((data) => {
                setNiveles(data || []);
                setCargando(false);
            })
            .withFailureHandler((e) => {
                console.error('Error:', e);
                setCargando(false);
            })
            .getNivelesQuimicos(centro);
    };
    
    const handleConsumirBidon = (producto) => {
        if (!confirm(`¿Consumir un bidón de ${producto}?`)) return;
        
        setCargando(true);
        google.script.run
            .withSuccessHandler(() => {
                cargarNiveles();
                if (onActualizar) onActualizar();
                setModal({
                    title: '✅ Bidón Consumido',
                    msg: `Se ha registrado el consumo de un bidón de ${producto}`,
                    type: 'success'
                });
            })
            .withFailureHandler((e) => {
                setCargando(false);
                setModal({
                    title: '❌ Error',
                    msg: e.message,
                    type: 'error'
                });
            })
            .consumirBidon(centro, producto, usuario.nombre);
    };
    
    const handleActualizarNivel = (producto, nuevoNivel) => {
        setCargando(true);
        google.script.run
            .withSuccessHandler(() => {
                cargarNiveles();
                if (onActualizar) onActualizar();
                setEditando(null);
                setModal({
                    title: '✅ Nivel Actualizado',
                    msg: `Nivel de ${producto} actualizado a ${nuevoNivel}%`,
                    type: 'success'
                });
            })
            .withFailureHandler((e) => {
                setCargando(false);
                setModal({
                    title: '❌ Error',
                    msg: e.message,
                    type: 'error'
                });
            })
            .actualizarNivelQuimico(centro, producto, parseFloat(nuevoNivel), usuario.nombre);
    };
    
    const handleActualizarStock = (producto, nuevoStock) => {
        setCargando(true);
        google.script.run
            .withSuccessHandler(() => {
                cargarNiveles();
                if (onActualizar) onActualizar();
                setEditando(null);
                setModal({
                    title: '✅ Stock Actualizado',
                    msg: `Stock de ${producto} actualizado a ${nuevoStock} bidones`,
                    type: 'success'
                });
            })
            .withFailureHandler((e) => {
                setCargando(false);
                setModal({
                    title: '❌ Error',
                    msg: e.message,
                    type: 'error'
                });
            })
            .actualizarStockBidones(centro, producto, parseInt(nuevoStock), usuario.nombre);
    };
    
    const getColorNivel = (nivel) => {
        if (nivel < 10) return 'bg-red-500';
        if (nivel < 20) return 'bg-orange-500';
        if (nivel < 50) return 'bg-yellow-500';
        return 'bg-green-500';
    };
    
    const getTextColorNivel = (nivel) => {
        if (nivel < 10) return 'text-red-500';
        if (nivel < 20) return 'text-orange-500';
        if (nivel < 50) return 'text-yellow-500';
        return 'text-green-500';
    };
    
    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            <header className="bg-slate-900 p-4 safe-top sticky top-0 z-40 shadow-lg">
                <div className="flex items-center">
                    <button
                        onClick={onVolver}
                        className="text-sky-400 mr-3 text-2xl"
                    >
                        ‹
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-white">🧪 Monitor Químicos</h1>
                        <p className="text-sm text-slate-400">{centro}</p>
                    </div>
                </div>
            </header>
            
            {cargando ? (
                <div className="flex items-center justify-center p-8">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="p-4 space-y-4">
                    {niveles.length === 0 ? (
                        <div className="card text-center">
                            <p className="text-slate-400">No hay productos químicos configurados</p>
                        </div>
                    ) : (
                        niveles.map((nivel, idx) => (
                            <div key={idx} className="card">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-bold text-white">{nivel.producto}</h3>
                                    <span className={`text-2xl font-bold ${getTextColorNivel(nivel.nivel)}`}>
                                        {nivel.nivel}%
                                    </span>
                                </div>
                                
                                {/* Barra de progreso */}
                                <div className="w-full bg-slate-600 rounded-full h-3 mb-3">
                                    <div
                                        className={`h-3 rounded-full transition-all ${getColorNivel(nivel.nivel)}`}
                                        style={{ width: `${Math.min(100, nivel.nivel)}%` }}
                                    ></div>
                                </div>
                                
                                {/* Info */}
                                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                                    <div className="bg-slate-700/50 rounded p-2">
                                        <p className="text-slate-400 text-xs">Días Restantes</p>
                                        <p className="text-white font-bold">{nivel.diasRestantes}</p>
                                    </div>
                                    <div className="bg-slate-700/50 rounded p-2">
                                        <p className="text-slate-400 text-xs">Stock Bidones</p>
                                        <p className="text-white font-bold">{nivel.stockBidones || 0}</p>
                                    </div>
                                    <div className="bg-slate-700/50 rounded p-2">
                                        <p className="text-slate-400 text-xs">Agotamiento</p>
                                        <p className="text-white text-xs">{nivel.fechaAgotamiento}</p>
                                    </div>
                                    <div className="bg-slate-700/50 rounded p-2">
                                        <p className="text-slate-400 text-xs">Capacidad Bidón</p>
                                        <p className="text-white font-bold">{nivel.capacidadBidon} L</p>
                                    </div>
                                </div>
                                
                                {/* Alertas */}
                                {nivel.alertaCritica && (
                                    <div className="bg-red-900/30 border border-red-500 rounded-lg p-3 mb-3">
                                        <p className="text-red-400 text-sm font-bold">⚠️ NIVEL CRÍTICO</p>
                                        <p className="text-red-300 text-xs">Recargar urgentemente</p>
                                    </div>
                                )}
                                
                                {nivel.alerta && !nivel.alertaCritica && (
                                    <div className="bg-orange-900/30 border border-orange-500 rounded-lg p-3 mb-3">
                                        <p className="text-orange-400 text-sm font-bold">⚠️ NIVEL BAJO</p>
                                        <p className="text-orange-300 text-xs">Planificar recarga</p>
                                    </div>
                                )}
                                
                                {/* Botones */}
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => handleConsumirBidon(nivel.producto)}
                                        className="btn btn-success text-sm"
                                        disabled={cargando}
                                    >
                                        Consumir Bidón
                                    </button>
                                    <button
                                        onClick={() => setEditando({ producto: nivel.producto, tipo: 'nivel', valor: nivel.nivel })}
                                        className="btn btn-secondary text-sm"
                                        disabled={cargando}
                                    >
                                        Ajustar Nivel
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                    
                    <button
                        onClick={cargarNiveles}
                        className="w-full btn btn-secondary"
                    >
                        🔄 Actualizar
                    </button>
                </div>
            )}
            
            {/* Modal de edición */}
            {editando && (
                <Modal
                    title={`Ajustar ${editando.tipo === 'nivel' ? 'Nivel' : 'Stock'}`}
                    type="info"
                    onClose={() => setEditando(null)}
                >
                    <div className="space-y-4">
                        <p className="text-white">{editando.producto}</p>
                        <input
                            type="number"
                            className="input"
                            value={editando.valor}
                            onChange={(e) => setEditando({...editando, valor: e.target.value})}
                            min="0"
                            max={editando.tipo === 'nivel' ? '100' : '999'}
                            step={editando.tipo === 'nivel' ? '0.1' : '1'}
                        />
                        <button
                            onClick={() => {
                                if (editando.tipo === 'nivel') {
                                    handleActualizarNivel(editando.producto, editando.valor);
                                } else {
                                    handleActualizarStock(editando.producto, editando.valor);
                                }
                            }}
                            className="w-full btn btn-primary"
                        >
                            Confirmar
                        </button>
                    </div>
                </Modal>
            )}
            
            {/* Modal de mensajes */}
            {modal && (
                <Modal
                    title={modal.title}
                    type={modal.type}
                    onClose={() => setModal(null)}
                >
                    {modal.msg}
                </Modal>
            )}
        </div>
    );
};
