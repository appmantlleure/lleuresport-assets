// ══════════════════════════════════════════════════════════════════
// FORMULARIO: ÍNDICE DE LANGELIER
// ══════════════════════════════════════════════════════════════════

const FormularioLangelier = ({ usuario, centro, config, onVolver, onExito }) => {
    const [valores, setValores] = React.useState({});
    const [enviando, setEnviando] = React.useState(false);
    const [modal, setModal] = React.useState(null);
    
    const handleCambio = (nombre, valor) => {
        setValores(prev => ({ ...prev, [nombre]: valor }));
    };
    
    const handleSubmit = (vals) => {
        setEnviando(true);
        const datos = {
            timestamp: new Date().toISOString(),
            operador: usuario.nombre,
            centro: centro,
            tipoAccion: 'Índice de Langelier',
            ...vals
        };
        
        google.script.run
            .withSuccessHandler((resultado) => {
                setEnviando(false);
                if (resultado.success) {
                    setModal({
                        title: '✅ Análisis Completado',
                        type: 'success',
                        langelier: resultado.langelier
                    });
                } else {
                    setModal({ title: '❌ Error', msg: resultado.error, type: 'error' });
                }
            })
            .withFailureHandler((e) => {
                setEnviando(false);
                setModal({ title: '❌ Error', msg: e.message, type: 'error' });
            })
            .guardarFormulario(datos);
    };
    
    return (
        <>
            <FormularioBase titulo="Langelier" emoji="🔢" valores={valores} onCambio={handleCambio} onSubmit={handleSubmit} onVolver={onVolver} enviando={enviando} usuario={usuario} centro={centro}>
                <div className="card space-y-4">
                    <CampoInput label="Instalación" nombre="instalacion" tipo="text" valor={valores.instalacion} onChange={handleCambio} placeholder="Ej: Piscina Grande" required />
                    <CampoInput label="Tarea" nombre="tarea" tipo="text" valor={valores.tarea} onChange={handleCambio} placeholder="Ej: Análisis mensual" required />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Parámetros</h3>
                    <CampoInput label="pH" nombre="ph_langelier" tipo="number" valor={valores.ph_langelier} onChange={handleCambio} step="0.1" min="0" max="14" required />
                    <CampoInput label="Temperatura (°C)" nombre="temperatura_langelier" tipo="number" valor={valores.temperatura_langelier} onChange={handleCambio} step="0.1" required />
                    <CampoInput label="Dureza Cálcica (mg/L Ca)" nombre="dureza_langelier" tipo="number" valor={valores.dureza_langelier} onChange={handleCambio} step="1" required />
                    <CampoInput label="Alcalinidad (mg/L CaCO₃)" nombre="alcalinidad_langelier" tipo="number" valor={valores.alcalinidad_langelier} onChange={handleCambio} step="1" required />
                    <CampoInput label="TDS / Sólidos (mg/L)" nombre="tds_langelier" tipo="number" valor={valores.tds_langelier} onChange={handleCambio} step="1" required />
                </div>
                
                {valores.ph_langelier && valores.temperatura_langelier && valores.dureza_langelier && valores.alcalinidad_langelier && valores.tds_langelier && (
                    <div className="card bg-sky-900/20 border border-sky-500/30">
                        <p className="text-sm text-slate-400 mb-2">
                            💡 El índice de Langelier se calculará automáticamente al guardar
                        </p>
                    </div>
                )}
            </FormularioBase>
            {modal && (
                <Modal
                    title={modal.title}
                    type={modal.type}
                    langelier={modal.langelier}
                    onClose={() => {
                        setModal(null);
                        if (modal.type === 'success') onExito();
                    }}
                >
                    {modal.msg}
                </Modal>
            )}
        </>
    );
};
