// ══════════════════════════════════════════════════════════════════
// FORMULARIO: LIMPIEZA DIFUSORES
// ══════════════════════════════════════════════════════════════════

const FormularioDifusores = ({ usuario, centro, config, onVolver, onExito }) => {
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
            tipoAccion: 'Limpieza difusores de ducha',
            ...vals
        };
        
        google.script.run
            .withSuccessHandler((resultado) => {
                setEnviando(false);
                if (resultado.success) {
                    setModal({ title: '✅ Registro Guardado', msg: 'Limpieza de difusores registrada correctamente.', type: 'success' });
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
            <FormularioBase titulo="Difusores" emoji="🚿" valores={valores} onCambio={handleCambio} onSubmit={handleSubmit} onVolver={onVolver} enviando={enviando} usuario={usuario} centro={centro}>
                <div className="card space-y-4">
                    <CampoInput label="Instalación" nombre="instalacion" tipo="text" valor={valores.instalacion} onChange={handleCambio} placeholder="Ej: Vestuarios planta 1" required />
                    <CampoInput label="Tarea" nombre="tarea" tipo="text" valor={valores.tarea} onChange={handleCambio} placeholder="Ej: Limpieza mensual" required />
                    <CampoInput label="Fecha de Limpieza" nombre="fecha_limpieza" tipo="date" valor={valores.fecha_limpieza} onChange={handleCambio} required />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Operación Realizada</h3>
                    <CampoInput label="Tipo de Operación" nombre="operacion_realizada" tipo="select" valor={valores.operacion_realizada} onChange={handleCambio} opciones={['Limpieza mecánica', 'Desinfección química', 'Sustitución', 'Limpieza + Desinfección']} required />
                    <CampoInput label="Producto / Dosis" nombre="producto_dosis" tipo="text" valor={valores.producto_dosis} onChange={handleCambio} placeholder="Ej: Cloro 50 ppm" />
                    <CampoInput label="Protocolo Seguido" nombre="protocolo" tipo="textarea" valor={valores.protocolo} onChange={handleCambio} placeholder="Describe el protocolo seguido..." />
                    <CampoInput label="Observaciones" nombre="observaciones" tipo="textarea" valor={valores.observaciones} onChange={handleCambio} placeholder="Notas adicionales..." />
                </div>
            </FormularioBase>
            {modal && <Modal title={modal.title} type={modal.type} onClose={() => { setModal(null); if (modal.type === 'success') onExito(); }}>{modal.msg}</Modal>}
        </>
    );
};
