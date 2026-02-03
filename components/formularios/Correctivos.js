// ══════════════════════════════════════════════════════════════════
// FORMULARIO: ACCIONES CORRECTIVAS
// ══════════════════════════════════════════════════════════════════

const FormularioCorrectivos = ({ usuario, centro, config, onVolver, onExito }) => {
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
            tipoAccion: 'Acciones Correctivas',
            ...vals
        };
        
        google.script.run
            .withSuccessHandler((resultado) => {
                setEnviando(false);
                if (resultado.success) {
                    setModal({ title: '✅ Registro Guardado', msg: 'Acción correctiva registrada correctamente.', type: 'success' });
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
            <FormularioBase titulo="Correctivos" emoji="🚨" valores={valores} onCambio={handleCambio} onSubmit={handleSubmit} onVolver={onVolver} enviando={enviando} usuario={usuario} centro={centro}>
                <div className="card space-y-4">
                    <CampoInput label="Instalación" nombre="instalacion" tipo="text" valor={valores.instalacion} onChange={handleCambio} placeholder="Ej: Sistema ACS" required />
                    <CampoInput label="Tarea / Orden" nombre="tarea" tipo="text" valor={valores.tarea} onChange={handleCambio} placeholder="Ej: Reparación urgente" required />
                    <CampoInput label="Prioridad" nombre="prioridad" tipo="select" valor={valores.prioridad} onChange={handleCambio} opciones={['Baja', 'Media', 'Alta', 'Crítica']} required />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Ubicación</h3>
                    <CampoInput label="Sistema" nombre="sistema" tipo="select" valor={valores.sistema} onChange={handleCambio} opciones={['ACS', 'Piscina', 'Climatización', 'Fontanería', 'Eléctrico', 'Otro']} required />
                    <CampoInput label="Ubicación Específica" nombre="ubicacion" tipo="text" valor={valores.ubicacion} onChange={handleCambio} placeholder="Ej: Sala de máquinas" required />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Incidencia</h3>
                    <CampoInput label="Tipo de Incidencia" nombre="incidencia" tipo="select" valor={valores.incidencia} onChange={handleCambio} opciones={['Fuga', 'Avería', 'Mal funcionamiento', 'Rotura', 'Otro']} required />
                    <CampoInput label="Detalle de la Incidencia" nombre="detalle" tipo="textarea" valor={valores.detalle} onChange={handleCambio} placeholder="Describe la incidencia..." required />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Acción Realizada</h3>
                    <CampoInput label="Acción Correctiva" nombre="accion_realizada" tipo="textarea" valor={valores.accion_realizada} onChange={handleCambio} placeholder="Describe la acción realizada..." required />
                    <CampoInput label="Repuestos Utilizados" nombre="repuestos" tipo="textarea" valor={valores.repuestos} onChange={handleCambio} placeholder="Lista de repuestos..." />
                </div>
            </FormularioBase>
            {modal && <Modal title={modal.title} type={modal.type} onClose={() => { setModal(null); if (modal.type === 'success') onExito(); }}>{modal.msg}</Modal>}
        </>
    );
};
