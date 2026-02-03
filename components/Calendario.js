// ══════════════════════════════════════════════════════════════════
// COMPONENTE: CALENDARIO COMPLETO
// ══════════════════════════════════════════════════════════════════

const VistaCalendario = ({ usuario, centro, onVolver }) => {
    const [eventos, setEventos] = React.useState([]);
    const [mesActual, setMesActual] = React.useState(new Date().getMonth() + 1);
    const [anioActual, setAnioActual] = React.useState(new Date().getFullYear());
    const [cargando, setCargando] = React.useState(true);
    const [modal, setModal] = React.useState(null);
    
    React.useEffect(() => {
        cargarEventos();
    }, [mesActual, anioActual, centro]);
    
    const cargarEventos = () => {
        setCargando(true);
        google.script.run
            .withSuccessHandler((data) => {
                setEventos(data || []);
                setCargando(false);
            })
            .withFailureHandler((e) => {
                console.error('Error:', e);
                setCargando(false);
            })
            .getCalendarEvents(centro, mesActual, anioActual);
    };
    
    const getNombreMes = (mes) => {
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return meses[mes - 1];
    };
    
    const cambiarMes = (direccion) => {
        let nuevoMes = mesActual + direccion;
        let nuevoAnio = anioActual;
        
        if (nuevoMes > 12) {
            nuevoMes = 1;
            nuevoAnio++;
        } else if (nuevoMes < 1) {
            nuevoMes = 12;
            nuevoAnio--;
        }
        
        setMesActual(nuevoMes);
        setAnioActual(nuevoAnio);
    };
    
    const getDiasDelMes = () => {
        const diasEnMes = new Date(anioActual, mesActual, 0).getDate();
        const primerDia = new Date(anioActual, mesActual - 1, 1).getDay();
        
        const dias = [];
        
        // Días vacíos al inicio
        for (let i = 0; i < primerDia; i++) {
            dias.push(null);
        }
        
        // Días del mes
        for (let dia = 1; dia <= diasEnMes; dia++) {
            const fecha = `${anioActual}-${String(mesActual).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
            const eventosDelDia = eventos.filter(e => e.FECHA && e.FECHA.startsWith(fecha));
            dias.push({ dia, eventos: eventosDelDia });
        }
        
        return dias;
    };
    
    const getColorEvento = (evento) => {
        if (evento.Completado === 'Sí') return 'bg-green-600';
        if (evento.COLOR) return evento.COLOR;
        return 'bg-blue-600';
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
                            <h1 className="text-xl font-bold text-white">📅 Calendario</h1>
                            <p className="text-sm text-slate-400">{centro}</p>
                        </div>
                    </div>
                </div>
            </header>
            
            <div className="p-4">
                {/* Navegación de mes */}
                <div className="card mb-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => cambiarMes(-1)}
                            className="btn btn-secondary text-sm"
                        >
                            ‹ Anterior
                        </button>
                        <h2 className="text-xl font-bold text-white">
                            {getNombreMes(mesActual)} {anioActual}
                        </h2>
                        <button
                            onClick={() => cambiarMes(1)}
                            className="btn btn-secondary text-sm"
                        >
                            Siguiente ›
                        </button>
                    </div>
                </div>
                
                {cargando ? (
                    <div className="flex items-center justify-center p-8">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <>
                        {/* Calendario */}
                        <div className="card mb-4">
                            {/* Días de la semana */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map((dia, idx) => (
                                    <div key={idx} className="text-center text-slate-400 text-sm font-bold py-2">
                                        {dia}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Días del mes */}
                            <div className="grid grid-cols-7 gap-1">
                                {getDiasDelMes().map((diaInfo, idx) => (
                                    <div
                                        key={idx}
                                        className={`aspect-square p-1 rounded ${
                                            diaInfo ? 'bg-slate-700/50' : ''
                                        }`}
                                    >
                                        {diaInfo && (
                                            <>
                                                <div className="text-white text-xs font-bold mb-1">
                                                    {diaInfo.dia}
                                                </div>
                                                {diaInfo.eventos.length > 0 && (
                                                    <div className="space-y-1">
                                                        {diaInfo.eventos.slice(0, 2).map((evento, eIdx) => (
                                                            <div
                                                                key={eIdx}
                                                                className={`h-1 rounded ${getColorEvento(evento)}`}
                                                            ></div>
                                                        ))}
                                                        {diaInfo.eventos.length > 2 && (
                                                            <div className="text-xs text-slate-400">
                                                                +{diaInfo.eventos.length - 2}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Lista de eventos */}
                        <div className="space-y-3">
                            <h3 className="text-white font-bold">Tareas del mes</h3>
                            {eventos.length === 0 ? (
                                <div className="card text-center">
                                    <p className="text-slate-400">No hay tareas programadas</p>
                                </div>
                            ) : (
                                eventos.map((evento, idx) => (
                                    <div key={idx} className="card">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className={`w-3 h-3 rounded-full ${getColorEvento(evento)}`}></div>
                                                    <h4 className="text-white font-bold">{evento.TAREA}</h4>
                                                </div>
                                                <p className="text-sm text-slate-400 mb-1">
                                                    📅 {evento.FECHA} - {evento.TURNO}
                                                </p>
                                                {evento.Completado === 'Sí' && (
                                                    <span className="inline-block px-2 py-1 bg-green-900/50 text-green-400 text-xs rounded">
                                                        ✓ Completado
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
