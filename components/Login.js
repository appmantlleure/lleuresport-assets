// ══════════════════════════════════════════════════════════════════
// COMPONENTE: VISTA LOGIN MEJORADA
// ══════════════════════════════════════════════════════════════════

const VistaLogin = ({ onLogin, config }) => {
    const [usuarios, setUsuarios] = React.useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = React.useState(null);
    const [pin, setPin] = React.useState('');
    const [centroSel, setCentroSel] = React.useState('');
    const [cargando, setCargando] = React.useState(false);
    const [paso, setPaso] = React.useState('usuarios'); // 'usuarios', 'pin', 'centro'
    
    // Cargar usuarios al iniciar
    React.useEffect(() => {
        setCargando(true);
        google.script.run
            .withSuccessHandler((data) => {
                if (data && data.usuarios) {
                    setUsuarios(data.usuarios.filter(u => u.Estado === 'Activo'));
                }
                setCargando(false);
            })
            .withFailureHandler((e) => {
                console.error('Error cargando usuarios:', e);
                setCargando(false);
            })
            .adminGetDatos();
    }, []);
    
    const handleSeleccionarUsuario = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setPaso('pin');
    };
    
    const handleVerificarPin = (e) => {
        e.preventDefault();
        if (!pin) {
            alert('⚠️ Ingresa tu PIN');
            return;
        }
        setPaso('centro');
    };
    
    const handleSeleccionarCentro = (centro) => {
        setCentroSel(centro);
        setCargando(true);
        onLogin(usuarioSeleccionado.Nombre, pin, centro);
    };
    
    const renderSeleccionUsuarios = () => (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-white text-center mb-4">Selecciona tu usuario</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
                {usuarios.map((usuario, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSeleccionarUsuario(usuario)}
                        className="w-full p-4 bg-slate-700 hover:bg-slate-600 rounded-lg text-left transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white font-bold">{usuario.Nombre}</p>
                                <p className="text-sm text-slate-400">{usuario.Rol}</p>
                            </div>
                            <span className="text-sky-400 text-2xl">›</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
    
    const renderIngresarPin = () => (
        <div className="space-y-4">
            <button
                onClick={() => setPaso('usuarios')}
                className="text-sky-400 mb-4"
            >
                ‹ Cambiar usuario
            </button>
            
            <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl">👤</span>
                </div>
                <h2 className="text-xl font-bold text-white">{usuarioSeleccionado.Nombre}</h2>
                <p className="text-sm text-slate-400">{usuarioSeleccionado.Rol}</p>
            </div>
            
            <form onSubmit={handleVerificarPin} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        PIN
                    </label>
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="input text-center text-2xl tracking-widest"
                        placeholder="••••"
                        autoComplete="current-password"
                        autoFocus
                        maxLength="4"
                    />
                </div>
                
                <button type="submit" className="w-full btn btn-primary">
                    CONTINUAR
                </button>
            </form>
        </div>
    );
    
    const renderSeleccionarCentro = () => (
        <div className="space-y-4">
            <button
                onClick={() => setPaso('pin')}
                className="text-sky-400 mb-4"
            >
                ‹ Volver
            </button>
            
            <h2 className="text-xl font-bold text-white text-center mb-6">Selecciona el centro</h2>
            
            <div className="space-y-3">
                <button
                    onClick={() => handleSeleccionarCentro('CEM Can Ricart')}
                    className="w-full p-6 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl transition-all"
                    disabled={cargando}
                >
                    <div className="text-center">
                        <p className="text-2xl mb-2">🏊</p>
                        <p className="text-white font-bold text-lg">CEM Can Ricart</p>
                    </div>
                </button>
                
                <button
                    onClick={() => handleSeleccionarCentro('CEM Colom')}
                    className="w-full p-6 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-xl transition-all"
                    disabled={cargando}
                >
                    <div className="text-center">
                        <p className="text-2xl mb-2">🏊</p>
                        <p className="text-white font-bold text-lg">CEM Colom</p>
                    </div>
                </button>
            </div>
        </div>
    );
    
    if (cargando && usuarios.length === 0) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="spinner mx-auto mb-4"></div>
                    <p className="text-slate-400">Cargando usuarios...</p>
                </div>
            </div>
        );
    }
    
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
                    
                    {/* Contenido dinámico */}
                    {paso === 'usuarios' && renderSeleccionUsuarios()}
                    {paso === 'pin' && renderIngresarPin()}
                    {paso === 'centro' && renderSeleccionarCentro()}
                </div>
            </div>
        </div>
    );
};
