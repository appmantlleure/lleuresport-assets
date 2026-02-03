// ══════════════════════════════════════════════════════════════════
// FORMULARIO: AGUA DE RED
// ══════════════════════════════════════════════════════════════════

const FormularioAguaRed = ({ usuario, centro, config, onVolver, onExito }) => {
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
            tipoAccion: 'Contador y agua de red',
            ...vals
        };
        
        google.script.run
            .withSuccessHandler((resultado) => {
                setEnviando(false);
                if (resultado.success) {
                    setModal({ title: '✅ Registro Guardado', msg: 'Agua de red registrada correctamente.', type: 'success' });
                } else {
                    setModal({ title: resultado.tipo === 'duplicado' ? '⚠️ Registro Duplicado' : '❌ Error', msg: resultado.error, type: 'error' });
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
            <FormularioBase titulo="Agua de Red" emoji="🚰" valores={valores} onCambio={handleCambio} onSubmit={handleSubmit} onVolver={onVolver} enviando={enviando} usuario={usuario} centro={centro}>
                <div className="card space-y-4">
                    <CampoInput label="Ubicación/Contador" nombre="ubicacion_contador" tipo="select" valor={valores.ubicacion_contador} onChange={handleCambio} opciones={['Sant Oleguer', 'Sant Pau']} required />
                    <CampoInput label="Lectura Contador (m³)" nombre="lectura_contador" tipo="number" valor={valores.lectura_contador} onChange={handleCambio} step="0.01" required />
                    <CampoInput label="Temperatura (°C)" nombre="temperatura_agua_red" tipo="number" valor={valores.temperatura_agua_red} onChange={handleCambio} step="0.1" />
                    <CampoInput label="Cloro (mg/L)" nombre="cloro_agua_red" tipo="number" valor={valores.cloro_agua_red} onChange={handleCambio} step="0.01" />
                    <CampoInput label="pH" nombre="ph_agua_red" tipo="number" valor={valores.ph_agua_red} onChange={handleCambio} step="0.1" min="0" max="14" />
                    <CampoInput label="Turbidez (NTU)" nombre="turbidez_agua_red" tipo="number" valor={valores.turbidez_agua_red} onChange={handleCambio} step="0.1" />
                    <CampoInput label="Observaciones" nombre="observaciones" tipo="textarea" valor={valores.observaciones} onChange={handleCambio} placeholder="Notas adicionales..." />
                </div>
            </FormularioBase>
            {modal && <Modal title={modal.title} type={modal.type} onClose={() => { setModal(null); if (modal.type === 'success') onExito(); }}>{modal.msg}</Modal>}
        </>
    );
};
