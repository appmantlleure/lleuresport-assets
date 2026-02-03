// ══════════════════════════════════════════════════════════════════
// FORMULARIO: CONTROL DE LEGIONELA
// ══════════════════════════════════════════════════════════════════

const FormularioLegionela = ({ usuario, centro, config, onVolver, onExito }) => {
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
            tipoAccion: 'Control de Legionela',
            ...vals
        };
        
        google.script.run
            .withSuccessHandler((resultado) => {
                setEnviando(false);
                if (resultado.success) {
                    setModal({ title: '✅ Registro Guardado', msg: 'Control de legionela registrado correctamente.', type: 'success' });
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
            <FormularioBase titulo="Legionela" emoji="🦠" valores={valores} onCambio={handleCambio} onSubmit={handleSubmit} onVolver={onVolver} enviando={enviando} usuario={usuario} centro={centro}>
                <div className="card space-y-4">
                    <CampoInput label="Instalación" nombre="instalacion" tipo="text" valor={valores.instalacion} onChange={handleCambio} placeholder="Ej: Sistema ACS" required />
                    <CampoInput label="Tarea" nombre="tarea" tipo="text" valor={valores.tarea} onChange={handleCambio} placeholder="Ej: Muestreo mensual" required />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Punto de Muestreo</h3>
                    <CampoInput label="Zona de Muestreo" nombre="zona_muestreo" tipo="text" valor={valores.zona_muestreo} onChange={handleCambio} placeholder="Ej: Vestuarios planta 1" required />
                    <CampoInput label="Punto Específico" nombre="punto_especifico" tipo="text" valor={valores.punto_especifico} onChange={handleCambio} placeholder="Ej: Ducha 3" required />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Parámetros</h3>
                    <CampoInput label="Temperatura (°C)" nombre="temp_agua_legionela" tipo="number" valor={valores.temp_agua_legionela} onChange={handleCambio} step="0.1" required />
                    <CampoInput label="Cloro Residual (mg/L)" nombre="cloro_residual_legionela" tipo="number" valor={valores.cloro_residual_legionela} onChange={handleCambio} step="0.01" />
                    <CampoInput label="pH" nombre="ph_legionela" tipo="number" valor={valores.ph_legionela} onChange={handleCambio} step="0.1" min="0" max="14" />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Análisis</h3>
                    <CampoInput label="Resultado Análisis" nombre="resultado_analisis" tipo="select" valor={valores.resultado_analisis} onChange={handleCambio} opciones={['Negativo', 'Positivo <100 UFC/L', 'Positivo 100-1000 UFC/L', 'Positivo >1000 UFC/L']} />
                    <CampoInput label="Técnica Utilizada" nombre="tecnica" tipo="text" valor={valores.tecnica} onChange={handleCambio} placeholder="Ej: Cultivo" />
                    <CampoInput label="Fecha Análisis Lab" nombre="fecha_lab" tipo="date" valor={valores.fecha_lab} onChange={handleCambio} />
                    <CampoInput label="Acción Curativa" nombre="accion_curativa" tipo="textarea" valor={valores.accion_curativa} onChange={handleCambio} placeholder="Acciones realizadas..." />
                    <CampoInput label="Observaciones" nombre="observaciones" tipo="textarea" valor={valores.observaciones} onChange={handleCambio} placeholder="Notas adicionales..." />
                </div>
            </FormularioBase>
            {modal && <Modal title={modal.title} type={modal.type} onClose={() => { setModal(null); if (modal.type === 'success') onExito(); }}>{modal.msg}</Modal>}
        </>
    );
};
