// ══════════════════════════════════════════════════════════════════
// FORMULARIO: PURGA TERMINALES
// ══════════════════════════════════════════════════════════════════

const FormularioPurga = ({ usuario, centro, config, onVolver, onExito }) => {
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
            tipoAccion: 'Purga de puntos terminales',
            ...vals
        };
        
        google.script.run
            .withSuccessHandler((resultado) => {
                setEnviando(false);
                if (resultado.success) {
                    setModal({ title: '✅ Registro Guardado', msg: 'Purga registrada correctamente.', type: 'success' });
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
            <FormularioBase titulo="Purga Terminales" emoji="💧" valores={valores} onCambio={handleCambio} onSubmit={handleSubmit} onVolver={onVolver} enviando={enviando} usuario={usuario} centro={centro}>
                <div className="card space-y-4">
                    <CampoInput label="Instalación" nombre="instalacion" tipo="text" valor={valores.instalacion} onChange={handleCambio} placeholder="Ej: Vestuarios planta 1" required />
                    <CampoInput label="Puntos de Purga" nombre="puntos_purga" tipo="textarea" valor={valores.puntos_purga} onChange={handleCambio} placeholder="Lista de puntos purgados (uno por línea)..." required />
                    <CampoInput label="Observaciones" nombre="observaciones" tipo="textarea" valor={valores.observaciones} onChange={handleCambio} placeholder="Notas adicionales..." />
                </div>
            </FormularioBase>
            {modal && <Modal title={modal.title} type={modal.type} onClose={() => { setModal(null); if (modal.type === 'success') onExito(); }}>{modal.msg}</Modal>}
        </>
    );
};
