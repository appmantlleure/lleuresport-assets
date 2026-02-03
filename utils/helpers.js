// ══════════════════════════════════════════════════════════════════
// UTILIDADES: FUNCIONES AUXILIARES
// ══════════════════════════════════════════════════════════════════

const helpers = {
    // Formatear fecha
    formatearFecha: (fecha) => {
        if (!fecha) return '';
        const d = new Date(fecha);
        const dia = String(d.getDate()).padStart(2, '0');
        const mes = String(d.getMonth() + 1).padStart(2, '0');
        const anio = d.getFullYear();
        return `${dia}/${mes}/${anio}`;
    },
    
    // Formatear fecha y hora
    formatearFechaHora: (fecha) => {
        if (!fecha) return '';
        const d = new Date(fecha);
        const dia = String(d.getDate()).padStart(2, '0');
        const mes = String(d.getMonth() + 1).padStart(2, '0');
        const anio = d.getFullYear();
        const hora = String(d.getHours()).padStart(2, '0');
        const min = String(d.getMinutes()).padStart(2, '0');
        return `${dia}/${mes}/${anio} ${hora}:${min}`;
    },
    
    // Obtener fecha actual ISO
    obtenerFechaISO: () => {
        return new Date().toISOString();
    },
    
    // Reemplazar comas por puntos en números
    normalizarNumero: (valor) => {
        if (typeof valor === 'string') {
            return valor.replace(',', '.');
        }
        return valor;
    },
    
    // Validar número
    esNumeroValido: (valor) => {
        if (valor === '' || valor === null || valor === undefined) return true;
        const num = parseFloat(valor);
        return !isNaN(num);
    },
    
    // Obtener color según nivel
    obtenerColorNivel: (nivel) => {
        if (nivel < 10) return 'text-red-500';
        if (nivel < 20) return 'text-orange-500';
        if (nivel < 50) return 'text-yellow-500';
        return 'text-green-500';
    },
    
    // Obtener color de fondo según nivel
    obtenerBgColorNivel: (nivel) => {
        if (nivel < 10) return 'bg-red-500';
        if (nivel < 20) return 'bg-orange-500';
        if (nivel < 50) return 'bg-yellow-500';
        return 'bg-green-500';
    },
    
    // Calcular diferencial CO2
    calcularDiferencialCO2: (co2Piscina, co2Exterior) => {
        if (!co2Piscina || !co2Exterior) return null;
        return parseFloat(co2Piscina) - parseFloat(co2Exterior);
    },
    
    // Obtener nombre del mes
    obtenerNombreMes: (mes) => {
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return meses[mes - 1] || '';
    },
    
    // Obtener mes y año actual
    obtenerMesAnioActual: () => {
        const ahora = new Date();
        return {
            mes: ahora.getMonth() + 1,
            anio: ahora.getFullYear()
        };
    },
    
    // Convertir imagen a Base64
    convertirImagenABase64: (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    },
    
    // Generar ID único
    generarID: () => {
        return 'ID-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    },
    
    // Capitalizar primera letra
    capitalizar: (texto) => {
        if (!texto) return '';
        return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    },
    
    // Copiar al portapapeles
    copiarAlPortapapeles: async (texto) => {
        try {
            await navigator.clipboard.writeText(texto);
            return true;
        } catch (err) {
            console.error('Error al copiar:', err);
            return false;
        }
    },
    
    // Descargar como archivo
    descargarComoArchivo: (contenido, nombreArchivo, tipo = 'text/plain') => {
        const blob = new Blob([contenido], { type: tipo });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = nombreArchivo;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};
