// Espera a que todo el contenido HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // Selecciona TODOS los checkboxes y textareas del documento
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const allTextAreas = document.querySelectorAll('textarea');

    // --- FUNCIÓN PARA GUARDAR PROGRESO ---
    function saveProgress(element) {
        if (element.type === 'checkbox') {
            // Si es un checkbox, guarda su estado (true/false)
            localStorage.setItem(element.id, element.checked);
        } else if (element.tagName === 'TEXTAREA') {
            // Si es un textarea, guarda su contenido de texto
            localStorage.setItem(element.id, element.value);
        }
    }

    // --- FUNCIÓN PARA CARGAR PROGRESO ---
    function loadProgress() {
        console.log("Loading progress from localStorage...");

        // Cargar estado de todos los checkboxes
        allCheckboxes.forEach(checkbox => {
            const savedState = localStorage.getItem(checkbox.id);
            if (savedState !== null) {
                // 'localStorage' guarda todo como string, por eso comparamos con 'true'
                checkbox.checked = (savedState === 'true');
            }
        });

        // Cargar contenido de todos los textareas
        allTextAreas.forEach(textarea => {
            const savedText = localStorage.getItem(textarea.id);
            if (savedText !== null) {
                textarea.value = savedText;
            }
        });
        
        console.log("Progress loaded.");
    }

    // --- AÑADIR "ESCUCHADORES" DE EVENTOS ---

    // Añade un 'escuchador' a CADA checkbox
    // Se activa cuando el estado (marcado/desmarcado) cambia
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            saveProgress(e.target);
        });
    });

    // Añade un 'escuchador' a CADA textarea
    // Se activa cada vez que el usuario escribe una letra
    allTextAreas.forEach(textarea => {
        textarea.addEventListener('input', (e) => {
            saveProgress(e.target);
        });
    });

    // --- CARGA INICIAL ---
    // Llama a loadProgress() tan pronto como la página esté lista
    loadProgress();

});
