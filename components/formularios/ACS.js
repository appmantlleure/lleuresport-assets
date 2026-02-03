// ══════════════════════════════════════════════════════════════════
// FORMULARIO: ACS (AGUA CALIENTE SANITARIA)
// ══════════════════════════════════════════════════════════════════

const FormularioACS = ({ usuario, centro, config, onVolver, onExito }) => {
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
            tipoAccion: 'Revisión depósito y circuito ACS',
            ...vals
        };
        
        google.script.run
            .withSuccessHandler((resultado) => {
                setEnviando(false);
                if (resultado.success) {
                    setModal({ title: '✅ Registro Guardado', msg: 'Revisión ACS registrada correctamente.', type: 'success' });
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
            <FormularioBase titulo="ACS" emoji="🔥" valores={valores} onCambio={handleCambio} onSubmit={handleSubmit} onVolver={onVolver} enviando={enviando} usuario={usuario} centro={centro}>
                <div className="card space-y-4">
                    <CampoInput label="Instalación" nombre="instalacion" tipo="text" valor={valores.instalacion} onChange={handleCambio} placeholder="Ej: Circuito principal" required />
                    <CampoInput label="Tipo de Operación" nombre="tipo_operacion_acs" tipo="select" valor={valores.tipo_operacion_acs} onChange={handleCambio} opciones={['Revisión', 'Mensual', 'Trimestral', 'Anual']} required />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Temperaturas</h3>
                    <CampoInput label="Temp. Acumulación (°C)" nombre="temp_acumulacion" tipo="number" valor={valores.temp_acumulacion} onChange={handleCambio} step="0.1" required />
                    <CampoInput label="Temp. Retorno (°C)" nombre="temp_retorno" tipo="number" valor={valores.temp_retorno} onChange={handleCambio} step="0.1" required />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Estado</h3>
                    <CampoInput label="Estado Incrustación" nombre="estado_incrustacion" tipo="select" valor={valores.estado_incrustacion} onChange={handleCambio} opciones={['Sin incrustación', 'Incrustación leve', 'Incrustación moderada', 'Incrustación severa']} />
                    <CampoInput label="Estado General" nombre="estado_general" tipo="select" valor={valores.estado_general} onChange={handleCambio} opciones={['Excelente', 'Bueno', 'Regular', 'Malo']} />
                    <CampoInput label="Observaciones" nombre="observaciones" tipo="textarea" valor={valores.observaciones} onChange={handleCambio} placeholder="Notas adicionales..." />
                </div>
            </FormularioBase>
            {modal && <Modal title={modal.title} type={modal.type} onClose={() => { setModal(null); if (modal.type === 'success') onExito(); }}>{modal.msg}</Modal>}
        </>
    );
};
