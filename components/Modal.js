// ══════════════════════════════════════════════════════════════════
// COMPONENTE: MODAL CON PORTAL
// ══════════════════════════════════════════════════════════════════

const Modal = ({ title, children, type = 'info', onClose, langelier }) => {
    const modalRoot = document.getElementById('modal-root');
    
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);
    
    const getColorClasses = () => {
        if (langelier) {
            if (langelier.tipo === 'corrosivo') return 'bg-red-500';
            if (langelier.tipo === 'incrustante') return 'bg-orange-500';
            return 'bg-green-500';
        }
        
        switch (type) {
            case 'success': return 'bg-green-500';
            case 'error': return 'bg-red-500';
            case 'warning': return 'bg-orange-500';
            default: return 'bg-sky-500';
        }
    };
    
    const modalContent = (
        <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 fade-in safe-top safe-bottom" 
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`w-full h-2 rounded-full ${getColorClasses()} mb-4`}></div>
                
                <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
                
                {langelier ? (
                    <div className="space-y-4">
                        <div className="bg-slate-700/50 rounded-lg p-4">
                            <p className="text-sm text-slate-400">Índice de Langelier (LSI)</p>
                            <p className="text-3xl font-bold text-white">{langelier.lsi}</p>
                        </div>
                        
                        <div className="bg-slate-700/50 rounded-lg p-4">
                            <p className="text-sm text-slate-400">Interpretación</p>
                            <p className="text-lg font-semibold text-white">{langelier.interpretacion}</p>
                        </div>
                        
                        <div className="bg-slate-700/50 rounded-lg p-4">
                            <p className="text-sm text-slate-400">Acción Recomendada</p>
                            <p className="text-white">{langelier.accion}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-slate-300 mb-6">{children}</p>
                )}
                
                <button onClick={onClose} className="w-full btn btn-primary mt-4">
                    CERRAR
                </button>
            </div>
        </div>
    );
    
    return ReactDOM.createPortal(modalContent, modalRoot);
};
