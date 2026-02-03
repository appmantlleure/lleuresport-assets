// ══════════════════════════════════════════════════════════════════
// FORMULARIO: CHECK PREVENTIVO
// ══════════════════════════════════════════════════════════════════

const FormularioCheckPreventivo = ({ usuario, centro, config, onVolver, onExito }) => {
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
            tipoAccion: 'Check preventivo',
            ...vals
        };
        
        google.script.run
            .withSuccessHandler((resultado) => {
                setEnviando(false);
                if (resultado.success) {
                    setModal({ title: '✅ Registro Guardado', msg: 'Check preventivo guardado correctamente.', type: 'success' });
                } else {
                    setModal({ title: resultado.tipo === 'frecuencia' ? '⏱️ Frecuencia No Cumplida' : '❌ Error', msg: resultado.error, type: 'error' });
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
            <FormularioBase titulo="Check Preventivo" emoji="🔧" valores={valores} onCambio={handleCambio} onSubmit={handleSubmit} onVolver={onVolver} enviando={enviando} usuario={usuario} centro={centro}>
                <div className="card space-y-4">
                    <CampoInput label="Zona de Control" nombre="zona_check" tipo="text" valor={valores.zona_check} onChange={handleCambio} placeholder="Ej: Sala de máquinas" required />
                    <CampoInput label="Frecuencia" nombre="frecuencia_check" tipo="select" valor={valores.frecuencia_check} onChange={handleCambio} opciones={['DIARIO', 'SEMANAL', 'QUINCENAL', 'MENSUAL', 'TRIMESTRAL', 'SEMESTRAL']} required />
                    <CampoInput label="Tareas Realizadas" nombre="tareas_check" tipo="textarea" valor={valores.tareas_check} onChange={handleCambio} placeholder="Describe las tareas realizadas..." required />
                    <CampoInput label="¿Se requiere vaciado?" nombre="vaciado" tipo="select" valor={valores.vaciado} onChange={handleCambio} opciones={['Sí', 'No']} />
                    <CampoInput label="¿Se requiere reparación?" nombre="reparacion" tipo="select" valor={valores.reparacion} onChange={handleCambio} opciones={['Sí', 'No']} />
                    <CampoInput label="Observaciones" nombre="observaciones" tipo="textarea" valor={valores.observaciones} onChange={handleCambio} placeholder="Notas adicionales..." />
                </div>
            </FormularioBase>
            {modal && <Modal title={modal.title} type={modal.type} onClose={() => { setModal(null); if (modal.type === 'success') onExito(); }}>{modal.msg}</Modal>}
        </>
    );
};
