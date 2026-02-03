// ══════════════════════════════════════════════════════════════════
// FORMULARIO: CONTROL PISCINA
// ══════════════════════════════════════════════════════════════════

const FormularioControlPiscina = ({ usuario, centro, config, onVolver, onExito }) => {
    const [valores, setValores] = React.useState({
        instalacion: 'Piscina',
        turno: ''
    });
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
            tipoAccion: 'Registro de Piscinas',
            ...vals
        };
        
        google.script.run
            .withSuccessHandler((resultado) => {
                setEnviando(false);
                if (resultado.success) {
                    setModal({
                        title: '✅ Registro Guardado',
                        msg: 'El control de piscina se ha guardado correctamente.',
                        type: 'success'
                    });
                } else {
                    setModal({
                        title: resultado.tipo === 'duplicado' ? '⚠️ Registro Duplicado' : '❌ Error',
                        msg: resultado.error,
                        type: 'error'
                    });
                }
            })
            .withFailureHandler((e) => {
                setEnviando(false);
                setModal({
                    title: '❌ Error',
                    msg: e.message,
                    type: 'error'
                });
            })
            .guardarFormulario(datos);
    };
    
    return (
        <>
            <FormularioBase
                titulo="Control Piscina"
                emoji="📊"
                valores={valores}
                onCambio={handleCambio}
                onSubmit={handleSubmit}
                onVolver={onVolver}
                enviando={enviando}
                usuario={usuario}
                centro={centro}
            >
                <div className="card space-y-4">
                    <CampoInput
                        label="Instalación"
                        nombre="instalacion"
                        tipo="select"
                        valor={valores.instalacion}
                        onChange={handleCambio}
                        opciones={['Piscina', 'Vestuarios']}
                        required
                    />
                    
                    {valores.instalacion === 'Piscina' && (
                        <>
                            <CampoInput
                                label="Tipo de Piscina"
                                nombre="piscina_tipo"
                                tipo="select"
                                valor={valores.piscina_tipo}
                                onChange={handleCambio}
                                opciones={['Piscina Grande', 'Piscina Pequeña']}
                                required
                            />
                            
                            <CampoInput
                                label="Turno"
                                nombre="turno"
                                tipo="select"
                                valor={valores.turno}
                                onChange={handleCambio}
                                opciones={['06:30', '14:30', '15:30', '23:30']}
                                required
                            />
                        </>
                    )}
                    
                    {valores.instalacion === 'Vestuarios' && (
                        <CampoInput
                            label="Número de Ducha"
                            nombre="numero_ducha"
                            tipo="text"
                            valor={valores.numero_ducha}
                            onChange={handleCambio}
                            placeholder="Ej: Ducha 1"
                            required
                        />
                    )}
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Parámetros Vigilant</h3>
                    
                    <CampoInput
                        label="pH Vigilant"
                        nombre="ph_vigilant"
                        tipo="number"
                        valor={valores.ph_vigilant}
                        onChange={handleCambio}
                        step="0.1"
                        min="0"
                        max="14"
                        required
                    />
                    
                    <CampoInput
                        label="Cloro Vigilant (mg/L)"
                        nombre="cl_vigilant"
                        tipo="number"
                        valor={valores.cl_vigilant}
                        onChange={handleCambio}
                        step="0.01"
                        min="0"
                        required
                    />
                    
                    <CampoInput
                        label="Turbidez (NTU)"
                        nombre="turbidez"
                        tipo="number"
                        valor={valores.turbidez}
                        onChange={handleCambio}
                        step="0.1"
                        min="0"
                    />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Parámetros Photómetro</h3>
                    
                    <CampoInput
                        label="pH Photómetro"
                        nombre="ph_photometro"
                        tipo="number"
                        valor={valores.ph_photometro}
                        onChange={handleCambio}
                        step="0.1"
                        min="0"
                        max="14"
                    />
                    
                    <CampoInput
                        label="Cloro Photómetro (mg/L)"
                        nombre="cl_photometro"
                        tipo="number"
                        valor={valores.cl_photometro}
                        onChange={handleCambio}
                        step="0.01"
                        min="0"
                    />
                    
                    <CampoInput
                        label="Cloro Total (mg/L)"
                        nombre="cl_total"
                        tipo="number"
                        valor={valores.cl_total}
                        onChange={handleCambio}
                        step="0.01"
                        min="0"
                    />
                    
                    <CampoInput
                        label="Cloro Combinado (mg/L)"
                        nombre="cl_combinado"
                        tipo="number"
                        valor={valores.cl_combinado}
                        onChange={handleCambio}
                        step="0.01"
                        min="0"
                    />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Temperatura y Ambiente</h3>
                    
                    <CampoInput
                        label="Temp. Aire (°C)"
                        nombre="temp_aire"
                        tipo="number"
                        valor={valores.temp_aire}
                        onChange={handleCambio}
                        step="0.1"
                    />
                    
                    <CampoInput
                        label="Temp. Vaso (°C)"
                        nombre="temp_vaso"
                        tipo="number"
                        valor={valores.temp_vaso}
                        onChange={handleCambio}
                        step="0.1"
                    />
                    
                    <CampoInput
                        label="Humedad (%)"
                        nombre="humedad"
                        tipo="number"
                        valor={valores.humedad}
                        onChange={handleCambio}
                        step="1"
                        min="0"
                        max="100"
                    />
                    
                    <CampoInput
                        label="Transparencia"
                        nombre="transparencia"
                        tipo="select"
                        valor={valores.transparencia}
                        onChange={handleCambio}
                        opciones={['Excelente', 'Buena', 'Regular', 'Mala']}
                    />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">CO2</h3>
                    
                    <CampoInput
                        label="CO2 Exterior (ppm)"
                        nombre="co2_exterior"
                        tipo="number"
                        valor={valores.co2_exterior}
                        onChange={handleCambio}
                        step="1"
                        min="0"
                    />
                    
                    <CampoInput
                        label="CO2 Piscina (ppm)"
                        nombre="co2_piscina"
                        tipo="number"
                        valor={valores.co2_piscina}
                        onChange={handleCambio}
                        step="1"
                        min="0"
                    />
                    
                    {valores.co2_exterior && valores.co2_piscina && (
                        <div className="bg-slate-700/50 rounded-lg p-3">
                            <p className="text-sm text-slate-400">Diferencial CO2</p>
                            <p className="text-2xl font-bold text-white">
                                {(valores.co2_piscina - valores.co2_exterior).toFixed(0)} ppm
                            </p>
                        </div>
                    )}
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Agua y Presión</h3>
                    
                    <CampoInput
                        label="Lectura Agua Nueva"
                        nombre="lectura_agua_nueva"
                        tipo="number"
                        valor={valores.lectura_agua_nueva}
                        onChange={handleCambio}
                        step="0.01"
                    />
                    
                    <CampoInput
                        label="Lectura Agua Recirculada"
                        nombre="lectura_agua_recirculada"
                        tipo="number"
                        valor={valores.lectura_agua_recirculada}
                        onChange={handleCambio}
                        step="0.01"
                    />
                    
                    <CampoInput
                        label="Presión Filtro 1 (bar)"
                        nombre="presion_filtro_1"
                        tipo="number"
                        valor={valores.presion_filtro_1}
                        onChange={handleCambio}
                        step="0.1"
                        min="0"
                    />
                    
                    <CampoInput
                        label="Presión Filtro 2 (bar)"
                        nombre="presion_filtro_2"
                        tipo="number"
                        valor={valores.presion_filtro_2}
                        onChange={handleCambio}
                        step="0.1"
                        min="0"
                    />
                </div>
                
                <div className="card space-y-4">
                    <h3 className="text-white font-bold">Limpieza</h3>
                    
                    <CampoInput
                        label="Limpieza Realizada"
                        nombre="limpieza_realizada"
                        tipo="select"
                        valor={valores.limpieza_realizada}
                        onChange={handleCambio}
                        opciones={['Sí', 'No']}
                    />
                    
                    <CampoInput
                        label="Observaciones"
                        nombre="observaciones"
                        tipo="textarea"
                        valor={valores.observaciones}
                        onChange={handleCambio}
                        placeholder="Notas adicionales..."
                    />
                </div>
            </FormularioBase>
            
            {modal && (
                <Modal
                    title={modal.title}
                    type={modal.type}
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
