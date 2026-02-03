// ══════════════════════════════════════════════════════════════════
// COMPONENTE: GESTIÓN DE ÓRDENES COMPLETO
// ══════════════════════════════════════════════════════════════════

const VistaOrdenes = ({ usuario, centro, onVolver }) => {
    const [ordenes, setOrdenes] = React.useState([]);
    const [cargando, setCargando] = React.useState(true);
    const [modal, setModal] = React.useState(null);
    const [nuevaOrden, setNuevaOrden] = React.useState(null);
    const [completarOrden, setCompletarOrden] = React.useState(null);
    
    React.useEffect(() => {
        cargarOrdenes();
    }, [centro]);
    
    const cargarOrdenes = () => {
        setCargando(true);
        google.script.run
            .withSuccessHandler((data) => {
                setOrdenes(data || []);
                setCargando(false);
            })
            .withFailureHandler((e) => {
                console.error('Error:', e);
                setCargando(false);
            })
            .getPendingTasks(centro);
    };
    
    const handleCrearOrden = () => {
        if (!nuevaOrden || !nuevaOrden.tarea) {
            alert('⚠️ Completa todos los campos');
            return;
        }
        
        setCargando(true);
        google.script.run
            .withSuccessHandler(() => {
                cargarOrdenes();
                setNuevaOrden(null);
                setModal({
                    title: '✅ Orden Creada',
                    msg: 'La orden ha sido creada correctamente',
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
            .addPendingTask(
                null,
                centro,
                usuario.nombre,
                nuevaOrden.tarea,
                nuevaOrden.urgente || false
            );
    };
    
    const handleCompletarOrden = () => {
        if (!completarOrden || !completarOrden.nota) {
            alert('⚠️ Añade una nota de resolución');
            return;
        }
        
        setCargando(true);
        google.script.run
            .withSuccessHandler(() => {
                cargarOrdenes();
                setCompletarOrden(null);
                setModal({
                    title: '✅ Orden Completada',
                    msg: 'La orden ha sido cerrada correctamente',
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
            .completePendingTaskYCalendario(
                completarOrden.id,
                usuario.nombre,
                completarOrden.nota,
                centro
            );
    };
    
    const getColorPrioridad = (prioridad) => {
        switch (prioridad) {
            case 'Crítica': return 'bg-red-600';
            case 'Alta': return 'bg-orange-600';
            case 'Media': return 'bg-yellow-600';
            default: return 'bg-blue-600';
        }
    };
    
    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            <header className="bg-slate-900 p-4 safe-top sticky top-0 z-40 shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={onVolver}
                            className="text-sky-400 mr-3 text-2xl"
                        >
                            ‹
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-white">📝 Órdenes de Trabajo</h1>
                            <p className="text-sm text-slate-400">{centro}</p>
                        </div>
                    </div>
                </div>
            </header>
            
            <div className="p-4 space-y-4">
                {/* Botón crear orden */}
                <button
                    onClick={() => setNuevaOrden({ tarea: '', urgente: false })}
                    className="w-full btn btn-primary"
                >
                    + Nueva Orden
                </button>
                
                {/* Estadísticas */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="card text-center bg-gradient-to-br from-sky-900/50 to-blue-900/50">
                        <p className="text-3xl font-bold text-sky-400">{ordenes.length}</p>
                        <p className="text-sm text-slate-400 mt-1">Pendientes</p>
                    </div>
                    <div className="card text-center bg-gradient-to-br from-red-900/50 to-orange-900/50">
                        <p className="text-3xl font-bold text-red-400">
                            {ordenes.filter(o => o.Prioridad === 'Crítica' || o.Prioridad === 'Alta').length}
                        </p>
                        <p className="text-sm text-slate-400 mt-1">Urgentes</p>
                    </div>
                </div>
                
                {/* Lista de órdenes */}
                {cargando ? (
                    <div className="flex items-center justify-center p-8">
                        <div className="spinner"></div>
                    </div>
                ) : ordenes.length === 0 ? (
                    <div className="card text-center">
                        <p className="text-slate-400">No hay órdenes pendientes</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {ordenes.map((orden, idx) => (
                            <div key={idx} className="card">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-2 py-1 rounded text-xs font-bold text-white ${getColorPrioridad(orden.Prioridad)}`}>
                                                {orden.Prioridad || 'Media'}
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                #{orden.ID}
                                            </span>
                                        </div>
                                        <h4 className="text-white font-bold mb-2">{orden.Orden}</h4>
                                        <p className="text-sm text-slate-400 mb-1">
                                            📅 {orden['Fecha Apertura']}
                                        </p>
                                        <p className="text-sm text-slate-400">
                                            👤 {orden['Operario Apertura']}
                                        </p>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => setCompletarOrden({ id: orden.ID, nota: '' })}
                                    className="w-full btn btn-success text-sm"
                                >
                                    ✓ Completar
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Modal nueva orden */}
            {nuevaOrden && (
                <Modal
                    title="Nueva Orden de Trabajo"
                    type="info"
                    onClose={() => setNuevaOrden(null)}
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-slate-300 mb-2">Descripción</label>
                            <textarea
                                className="input"
                                value={nuevaOrden.tarea}
                                onChange={(e) => setNuevaOrden({...nuevaOrden, tarea: e.target.value})}
                                placeholder="Describe la tarea..."
                                rows="3"
                            />
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="urgente"
                                checked={nuevaOrden.urgente}
                                onChange={(e) => setNuevaOrden({...nuevaOrden, urgente: e.target.checked})}
                                className="w-5 h-5"
                            />
                            <label htmlFor="urgente" className="text-white">
                                Marcar como urgente
                            </label>
                        </div>
                        
                        <button
                            onClick={handleCrearOrden}
                            className="w-full btn btn-primary"
                        >
                            Crear Orden
                        </button>
                    </div>
                </Modal>
            )}
            
            {/* Modal completar orden */}
            {completarOrden && (
                <Modal
                    title="Completar Orden"
                    type="success"
                    onClose={() => setCompletarOrden(null)}
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-slate-300 mb-2">Notas de resolución</label>
                            <textarea
                                className="input"
                                value={completarOrden.nota}
                                onChange={(e) => setCompletarOrden({...completarOrden, nota: e.target.value})}
                                placeholder="Describe lo que se hizo..."
                                rows="3"
                            />
                        </div>
                        
                        <button
                            onClick={handleCompletarOrden}
                            className="w-full btn btn-success"
                        >
                            ✓ Confirmar Completado
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
