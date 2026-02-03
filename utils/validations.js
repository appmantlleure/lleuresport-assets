// ══════════════════════════════════════════════════════════════════
// UTILIDADES: VALIDACIONES DE FORMULARIOS
// ══════════════════════════════════════════════════════════════════

const validaciones = {
    // Validar pH (0-14)
    validarPH: (valor) => {
        if (!valor) return { valido: true };
        const num = parseFloat(valor);
        if (isNaN(num)) return { valido: false, error: 'Debe ser un número' };
        if (num < 0 || num > 14) return { valido: false, error: 'pH debe estar entre 0 y 14' };
        return { valido: true };
    },
    
    // Validar cloro (0-10 mg/L)
    validarCloro: (valor) => {
        if (!valor) return { valido: true };
        const num = parseFloat(valor);
        if (isNaN(num)) return { valido: false, error: 'Debe ser un número' };
        if (num < 0) return { valido: false, error: 'El cloro no puede ser negativo' };
        if (num > 10) return { valido: false, error: 'Valor de cloro muy alto (>10 mg/L)' };
        return { valido: true };
    },
    
    // Validar temperatura (-10 a 100°C)
    validarTemperatura: (valor) => {
        if (!valor) return { valido: true };
        const num = parseFloat(valor);
        if (isNaN(num)) return { valido: false, error: 'Debe ser un número' };
        if (num < -10 || num > 100) return { valido: false, error: 'Temperatura fuera de rango' };
        return { valido: true };
    },
    
    // Validar turbidez (0-100 NTU)
    validarTurbidez: (valor) => {
        if (!valor) return { valido: true };
        const num = parseFloat(valor);
        if (isNaN(num)) return { valido: false, error: 'Debe ser un número' };
        if (num < 0) return { valido: false, error: 'La turbidez no puede ser negativa' };
        if (num > 100) return { valido: false, error: 'Valor de turbidez muy alto' };
        return { valido: true };
    },
    
    // Validar humedad (0-100%)
    validarHumedad: (valor) => {
        if (!valor) return { valido: true };
        const num = parseFloat(valor);
        if (isNaN(num)) return { valido: false, error: 'Debe ser un número' };
        if (num < 0 || num > 100) return { valido: false, error: 'Humedad debe estar entre 0 y 100%' };
        return { valido: true };
    },
    
    // Validar CO2 (0-5000 ppm)
    validarCO2: (valor) => {
        if (!valor) return { valido: true };
        const num = parseFloat(valor);
        if (isNaN(num)) return { valido: false, error: 'Debe ser un número' };
        if (num < 0) return { valido: false, error: 'El CO2 no puede ser negativo' };
        if (num > 5000) return { valido: false, error: 'Valor de CO2 muy alto' };
        return { valido: true };
    },
    
    // Validar presión (0-10 bar)
    validarPresion: (valor) => {
        if (!valor) return { valido: true };
        const num = parseFloat(valor);
        if (isNaN(num)) return { valido: false, error: 'Debe ser un número' };
        if (num < 0) return { valido: false, error: 'La presión no puede ser negativa' };
        if (num > 10) return { valido: false, error: 'Presión muy alta (>10 bar)' };
        return { valido: true };
    },
    
    // Validar dureza (0-500 mg/L)
    validarDureza: (valor) => {
        if (!valor) return { valido: true };
        const num = parseFloat(valor);
        if (isNaN(num)) return { valido: false, error: 'Debe ser un número' };
        if (num < 0) return { valido: false, error: 'La dureza no puede ser negativa' };
        return { valido: true };
    },
    
    // Validar alcalinidad (0-500 mg/L)
    validarAlcalinidad: (valor) => {
        if (!valor) return { valido: true };
        const num = parseFloat(valor);
        if (isNaN(num)) return { valido: false, error: 'Debe ser un número' };
        if (num < 0) return { valido: false, error: 'La alcalinidad no puede ser negativa' };
        return { valido: true };
    },
    
    // Validar TDS (0-3000 mg/L)
    validarTDS: (valor) => {
        if (!valor) return { valido: true };
        const num = parseFloat(valor);
        if (isNaN(num)) return { valido: false, error: 'Debe ser un número' };
        if (num < 0) return { valido: false, error: 'Los TDS no pueden ser negativos' };
        return { valido: true };
    },
    
    // Validar email
    validarEmail: (valor) => {
        if (!valor) return { valido: true };
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(valor)) return { valido: false, error: 'Email inválido' };
        return { valido: true };
    },
    
    // Validar teléfono
    validarTelefono: (valor) => {
        if (!valor) return { valido: true };
        const regex = /^[0-9]{9}$/;
        if (!regex.test(valor)) return { valido: false, error: 'Teléfono debe tener 9 dígitos' };
        return { valido: true };
    },
    
    // Validar DNI/NIE
    validarDNI: (valor) => {
        if (!valor) return { valido: true };
        const regex = /^[0-9]{8}[A-Z]$|^[XYZ][0-9]{7}[A-Z]$/;
        if (!regex.test(valor.toUpperCase())) return { valido: false, error: 'DNI/NIE inválido' };
        return { valido: true };
    },
    
    // Validar campo requerido
    validarRequerido: (valor, nombreCampo) => {
        if (!valor || (typeof valor === 'string' && valor.trim() === '')) {
            return { valido: false, error: `${nombreCampo} es obligatorio` };
        }
        return { valido: true };
    },
    
    // Validar rango numérico
    validarRango: (valor, min, max, nombreCampo) => {
        if (!valor) return { valido: true };
        const num = parseFloat(valor);
        if (isNaN(num)) return { valido: false, error: 'Debe ser un número' };
        if (num < min || num > max) {
            return { valido: false, error: `${nombreCampo} debe estar entre ${min} y ${max}` };
        }
        return { valido: true };
    },
    
    // Validar formulario completo
    validarFormulario: (valores, reglas) => {
        const errores = {};
        
        for (const [campo, valor] of Object.entries(valores)) {
            if (reglas[campo]) {
                const regla = reglas[campo];
                
                // Validar requerido
                if (regla.requerido) {
                    const resultado = validaciones.validarRequerido(valor, regla.nombre || campo);
                    if (!resultado.valido) {
                        errores[campo] = resultado.error;
                        continue;
                    }
                }
                
                // Validar tipo específico
                if (regla.tipo && valor) {
                    let resultado;
                    switch (regla.tipo) {
                        case 'ph':
                            resultado = validaciones.validarPH(valor);
                            break;
                        case 'cloro':
                            resultado = validaciones.validarCloro(valor);
                            break;
                        case 'temperatura':
                            resultado = validaciones.validarTemperatura(valor);
                            break;
                        case 'turbidez':
                            resultado = validaciones.validarTurbidez(valor);
                            break;
                        case 'humedad':
                            resultado = validaciones.validarHumedad(valor);
                            break;
                        case 'co2':
                            resultado = validaciones.validarCO2(valor);
                            break;
                        case 'presion':
                            resultado = validaciones.validarPresion(valor);
                            break;
                        case 'email':
                            resultado = validaciones.validarEmail(valor);
                            break;
                        case 'telefono':
                            resultado = validaciones.validarTelefono(valor);
                            break;
                        case 'dni':
                            resultado = validaciones.validarDNI(valor);
                            break;
                    }
                    
                    if (resultado && !resultado.valido) {
                        errores[campo] = resultado.error;
                    }
                }
                
                // Validar rango personalizado
                if (regla.min !== undefined && regla.max !== undefined && valor) {
                    const resultado = validaciones.validarRango(
                        valor, 
                        regla.min, 
                        regla.max, 
                        regla.nombre || campo
                    );
                    if (!resultado.valido) {
                        errores[campo] = resultado.error;
                    }
                }
            }
        }
        
        return {
            valido: Object.keys(errores).length === 0,
            errores
        };
    }
};
