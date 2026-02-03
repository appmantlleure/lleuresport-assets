// ══════════════════════════════════════════════════════════════════
// FORMULARIO: TEMPERATURA TERMINALES
// ══════════════════════════════════════════════════════════════════

const FormularioTemperatura = ({ usuario, centro, config, onVolver, onExito }) => {
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
            tipoAccion: 'Temperatura puntos terminales',
            ...vals
        };
        
        google.script.run
            .withSuccessHandler((resultado) => {
                setEnviando(false);
                if (resultado.success) {
                    setModal({ title: '✅ Registro Guardado', msg: 'Temperaturas registradas correctamente.', type: 'success' });
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
            <FormularioBase titulo="Temperatura" emoji="🌡️" valores={valores} onCambio={handleCambio} onSubmit={handleSubmit} onVolver={onVolver} enviando={enviando} usuario={usuario} centro={centro}>
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Temperaturas Generales</h3>
                    <CampoInput label="Temp. Depósito/Caldera (°C)" nombre="temp_deposito_caldera" tipo="number" valor={valores.temp_deposito_caldera} onChange={handleCambio} step="0.1" required />
                    <CampoInput label="Temp. Retorno ACS (°C)" nombre="temp_retorno_acs" tipo="number" valor={valores.temp_retorno_acs} onChange={handleCambio} step="0.1" />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Punto de Medición</h3>
                    <CampoInput label="Zona de Medición" nombre="zona_medicion" tipo="text" valor={valores.zona_medicion} onChange={handleCambio} placeholder="Ej: Vestuarios planta 1" required />
                    <CampoInput label="Número de Punto" nombre="numero_punto" tipo="text" valor={valores.numero_punto} onChange={handleCambio} placeholder="Ej: P1, P2..." required />
                    <CampoInput label="Tipo de Punto" nombre="tipo_punto" tipo="select" valor={valores.tipo_punto} onChange={handleCambio} opciones={['Ducha', 'Pica']} required />
                    
                    {valores.tipo_punto === 'Ducha' && (
                        <CampoInput label="Temp. Agua Caliente (°C)" nombre="temp_caliente" tipo="number" valor={valores.temp_caliente} onChange={handleCambio} step="0.1" required />
                    )}
                    
                    <CampoInput label="Fecha de Revisión" nombre="fecha_revision_temp" tipo="date" valor={valores.fecha_revision_temp} onChange={handleCambio} />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Observaciones</h3>
                    <CampoInput label="Observación 1" nombre="obs_1" tipo="textarea" valor={valores.obs_1} onChange={handleCambio} />
                    <CampoInput label="Observación 2" nombre="obs_2" tipo="textarea" valor={valores.obs_2} onChange={handleCambio} />
                </div>
            </FormularioBase>
            {modal && <Modal title={modal.title} type={modal.type} onClose={() => { setModal(null); if (modal.type === 'success') onExito(); }}>{modal.msg}</Modal>}
        </>
    );
};
