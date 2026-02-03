// ══════════════════════════════════════════════════════════════════
// FORMULARIO: VISITAS LABORATORIO (36 columnas)
// ══════════════════════════════════════════════════════════════════

const FormularioVisitasLab = ({ usuario, centro, config, onVolver, onExito }) => {
    const [valores, setValores] = React.useState({ centro: centro });
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
            tipoAccion: 'Registro de Visitas',
            ...vals
        };
        
        google.script.run
            .withSuccessHandler((resultado) => {
                setEnviando(false);
                if (resultado.success) {
                    setModal({ title: '✅ Registro Guardado', msg: 'Visita registrada correctamente.', type: 'success' });
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
            <FormularioBase titulo="Visitas Lab" emoji="📋" valores={valores} onCambio={handleCambio} onSubmit={handleSubmit} onVolver={onVolver} enviando={enviando} usuario={usuario} centro={centro}>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Datos de Entrada</h3>
                    <CampoInput label="Fecha de Entrada" nombre="fecha_entrada" tipo="date" valor={valores.fecha_entrada} onChange={handleCambio} required />
                    <CampoInput label="Hora de Entrada" nombre="hora_entrada" tipo="time" valor={valores.hora_entrada} onChange={handleCambio} required />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Datos del Visitante</h3>
                    <CampoInput label="Nombre Completo" nombre="nombre_visitante" tipo="text" valor={valores.nombre_visitante} onChange={handleCambio} required />
                    <CampoInput label="DNI/NIE" nombre="dni_visitante" tipo="text" valor={valores.dni_visitante} onChange={handleCambio} required />
                    <CampoInput label="Empresa" nombre="empresa_visitante" tipo="text" valor={valores.empresa_visitante} onChange={handleCambio} required />
                    <CampoInput label="Teléfono" nombre="telefono_visitante" tipo="tel" valor={valores.telefono_visitante} onChange={handleCambio} placeholder="999999999" />
                    <CampoInput label="Email" nombre="email_visitante" tipo="email" valor={valores.email_visitante} onChange={handleCambio} />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Responsable y Tipo de Visita</h3>
                    <CampoInput label="Responsable del Centro" nombre="responsable_centro" tipo="text" valor={valores.responsable_centro} onChange={handleCambio} required />
                    <CampoInput label="Tipo de Visita" nombre="tipo_visita" tipo="select" valor={valores.tipo_visita} onChange={handleCambio} opciones={['Mantenimiento', 'Inspección', 'Análisis', 'Reparación', 'Otro']} required />
                    <CampoInput label="Motivo Detallado" nombre="motivo_detallado" tipo="textarea" valor={valores.motivo_detallado} onChange={handleCambio} required />
                    <CampoInput label="Persona de Contacto" nombre="persona_contacto" tipo="text" valor={valores.persona_contacto} onChange={handleCambio} />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Acceso y Zonas</h3>
                    <CampoInput label="Zonas de Acceso" nombre="zonas_acceso" tipo="textarea" valor={valores.zonas_acceso} onChange={handleCambio} placeholder="Lista de zonas visitadas..." required />
                    <CampoInput label="¿Acceso a Zona de Riesgo?" nombre="acceso_zona_riesgo" tipo="select" valor={valores.acceso_zona_riesgo} onChange={handleCambio} opciones={['Sí', 'No']} required />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Toma de Muestras</h3>
                    <CampoInput label="¿Se tomaron muestras?" nombre="toma_muestras" tipo="select" valor={valores.toma_muestras} onChange={handleCambio} opciones={['Sí', 'No']} required />
                    {valores.toma_muestras === 'Sí' && (
                        <>
                            <CampoInput label="Puntos de Muestreo" nombre="puntos_muestreo" tipo="textarea" valor={valores.puntos_muestreo} onChange={handleCambio} placeholder="Lista de puntos..." />
                            <CampoInput label="¿Requirió Vaciado?" nombre="requirio_vaciado" tipo="select" valor={valores.requirio_vaciado} onChange={handleCambio} opciones={['Sí', 'No']} />
                        </>
                    )}
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Equipos y Materiales</h3>
                    <CampoInput label="Equipos/Materiales Utilizados" nombre="equipos_materiales" tipo="textarea" valor={valores.equipos_materiales} onChange={handleCambio} placeholder="Lista de equipos..." />
                    <CampoInput label="Matrícula Vehículo" nombre="matricula" tipo="text" valor={valores.matricula} onChange={handleCambio} placeholder="1234ABC" />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Acreditaciones</h3>
                    <CampoInput label="¿Lab. Acreditado ISO?" nombre="lab_acreditado_iso" tipo="select" valor={valores.lab_acreditado_iso} onChange={handleCambio} opciones={['Sí', 'No']} />
                    {valores.lab_acreditado_iso === 'Sí' && (
                        <CampoInput label="Nº Acreditación ENAC" nombre="num_acreditacion_enac" tipo="text" valor={valores.num_acreditacion_enac} onChange={handleCambio} />
                    )}
                    <CampoInput label="¿Empresa Autorizada?" nombre="empresa_autorizada" tipo="select" valor={valores.empresa_autorizada} onChange={handleCambio} opciones={['Sí', 'No']} />
                    {valores.empresa_autorizada === 'Sí' && (
                        <CampoInput label="Nº Registro RERA" nombre="num_registro_rera" tipo="text" valor={valores.num_registro_rera} onChange={handleCambio} />
                    )}
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Datos de Salida</h3>
                    <CampoInput label="Fecha de Salida" nombre="fecha_salida" tipo="date" valor={valores.fecha_salida} onChange={handleCambio} required />
                    <CampoInput label="Hora de Salida" nombre="hora_salida" tipo="time" valor={valores.hora_salida} onChange={handleCambio} required />
                    {valores.fecha_entrada && valores.hora_entrada && valores.fecha_salida && valores.hora_salida && (
                        <div className="bg-slate-700/50 rounded-lg p-3">
                            <p className="text-sm text-slate-400">Duración aproximada</p>
                            <p className="text-lg font-bold text-white">
                                {(() => {
                                    const entrada = new Date(`${valores.fecha_entrada}T${valores.hora_entrada}`);
                                    const salida = new Date(`${valores.fecha_salida}T${valores.hora_salida}`);
                                    const diff = Math.round((salida - entrada) / 60000);
                                    return `${diff} minutos`;
                                })()}
                            </p>
                        </div>
                    )}
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Trabajo Realizado</h3>
                    <CampoInput label="Descripción del Trabajo" nombre="trabajo_realizado" tipo="textarea" valor={valores.trabajo_realizado} onChange={handleCambio} placeholder="Describe el trabajo realizado..." required />
                    <CampoInput label="Documentación Entregada" nombre="documentacion_entregada" tipo="textarea" valor={valores.documentacion_entregada} onChange={handleCambio} placeholder="Lista de documentos..." />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Próxima Visita</h3>
                    <CampoInput label="¿Próxima Visita Programada?" nombre="proxima_visita" tipo="select" valor={valores.proxima_visita} onChange={handleCambio} opciones={['Sí', 'No']} />
                    {valores.proxima_visita === 'Sí' && (
                        <CampoInput label="Fecha Próxima Visita" nombre="fecha_proxima" tipo="date" valor={valores.fecha_proxima} onChange={handleCambio} />
                    )}
                    <CampoInput label="Observaciones" nombre="observaciones" tipo="textarea" valor={valores.observaciones} onChange={handleCambio} placeholder="Notas adicionales..." />
                </div>
                
                <div className="card bg-slate-700/50">
                    <p className="text-xs text-slate-400">
                        ℹ️ Al enviar este formulario, confirmas que has leído y aceptas la política de protección de datos (RGPD).
                    </p>
                </div>
                
            </FormularioBase>
            {modal && <Modal title={modal.title} type={modal.type} onClose={() => { setModal(null); if (modal.type === 'success') onExito(); }}>{modal.msg}</Modal>}
        </>
    );
};
