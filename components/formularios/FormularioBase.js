// ══════════════════════════════════════════════════════════════════
// COMPONENTE BASE: FORMULARIO REUTILIZABLE
// ══════════════════════════════════════════════════════════════════

const FormularioBase = ({ 
    titulo, 
    emoji, 
    children, 
    valores, 
    onCambio, 
    onSubmit, 
    onVolver, 
    enviando,
    usuario,
    centro 
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(valores);
    };
    
    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            {/* Header */}
            <header className="bg-slate-900 p-4 safe-top sticky top-0 z-40 shadow-lg">
                <div className="flex items-center">
                    <button
                        onClick={onVolver}
                        className="text-sky-400 mr-3 text-2xl"
                        disabled={enviando}
                    >
                        ‹
                    </button>
                    <div className="flex-1">
                        <div className="flex items-center">
                            <span className="text-2xl mr-2">{emoji}</span>
                            <h1 className="text-xl font-bold text-white">{titulo}</h1>
                        </div>
                        <p className="text-sm text-slate-400">{centro}</p>
                    </div>
                </div>
            </header>
            
            {/* Formulario */}
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                {/* Info del usuario */}
                <div className="card bg-slate-800/50">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Operario:</span>
                        <span className="text-white font-medium">{usuario.nombre}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                        <span className="text-slate-400">Fecha:</span>
                        <span className="text-white font-medium">
                            {new Date().toLocaleDateString('es-ES')}
                        </span>
                    </div>
                </div>
                
                {/* Campos dinámicos */}
                {children}
                
                {/* Botón enviar */}
                <div className="sticky bottom-4 pt-4">
                    <button
                        type="submit"
                        disabled={enviando}
                        className="w-full btn btn-success text-lg py-4"
                    >
                        {enviando ? (
                            <div className="flex items-center justify-center">
                                <div className="spinner mr-2" style={{ width: '20px', height: '20px' }}></div>
                                GUARDANDO...
                            </div>
                        ) : (
                            '✓ GUARDAR REGISTRO'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

// ══════════════════════════════════════════════════════════════════
// COMPONENTE AUXILIAR: CAMPO DE INPUT
// ══════════════════════════════════════════════════════════════════

const CampoInput = ({ 
    label, 
    nombre, 
    tipo = 'text', 
    valor, 
    onChange, 
    required = false,
    placeholder = '',
    min,
    max,
    step,
    opciones = [],
    disabled = false
}) => {
    const handleChange = (e) => {
        const nuevoValor = tipo === 'number' ? parseFloat(e.target.value) || '' : e.target.value;
        onChange(nombre, nuevoValor);
    };
    
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>
            
            {tipo === 'select' ? (
                <select
                    value={valor || ''}
                    onChange={handleChange}
                    className="input"
                    required={required}
                    disabled={disabled}
                >
                    <option value="">Seleccionar...</option>
                    {opciones.map((opcion, idx) => (
                        <option key={idx} value={opcion.value || opcion}>
                            {opcion.label || opcion}
                        </option>
                    ))}
                </select>
            ) : tipo === 'textarea' ? (
                <textarea
                    value={valor || ''}
                    onChange={handleChange}
                    className="input"
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    rows={3}
                />
            ) : (
                <input
                    type={tipo}
                    value={valor || ''}
                    onChange={handleChange}
                    className="input"
                    placeholder={placeholder}
                    required={required}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                />
            )}
        </div>
    );
};
