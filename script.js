// Espera a que todo el contenido HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DEL CHECKLIST ---

    const checklist = document.getElementById('checklist');
    const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');

    // Función para guardar el progreso en el almacenamiento local
    function saveProgress() {
        checkboxes.forEach(checkbox => {
            // Guarda el estado (true/false) de cada checkbox usando su 'id' como llave
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    }

    // Función para cargar el progreso guardado
    function loadProgress() {
        checkboxes.forEach(checkbox => {
            const isChecked = localStorage.getItem(checkbox.id) === 'true';
            checkbox.checked = isChecked;
        });
    }

    // Añade un "escuchador" a cada checkbox para guardar cuando cambie
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', saveProgress);
    });

    // Carga el progreso guardado al iniciar la página
    loadProgress();

    // --- LÓGICA DEL CALENDARIO ---

    const date = new Date(); // Fecha actual

    const renderCalendar = () => {
        date.setDate(1); // Fija la fecha al primer día del mes actual

        const monthDays = document.querySelector('.days');
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        
        // El primer día de la semana (Lunes=1, Domingo=0. Ajustamos para que Lunes sea 0)
        let firstDayIndex = date.getDay();
        if (firstDayIndex === 0) { // Si es Domingo (0), lo pasamos a 6
            firstDayIndex = 6;
        } else { // Si es Lunes (1) a Sábado (6), restamos 1
            firstDayIndex -= 1; 
        }

        const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
        
        // Días que se mostrarán del siguiente mes (Ajuste para que Domingo (0) sea 7)
        const nextDays = (lastDayIndex === 0) ? 0 : 7 - lastDayIndex;

        // Opciones para formatear el mes en español
        const monthOptions = { month: 'long' };
        const monthName = date.toLocaleDateString('es-ES', monthOptions);

        // Actualiza el texto del mes y año
        document.getElementById('month-name').innerText = monthName;
        document.getElementById('date-str').innerText = date.getFullYear().toString();

        let daysHTML = "";

        // Días del mes anterior
        for (let x = firstDayIndex; x > 0; x--) {
            daysHTML += `<li class="empty">${prevLastDay - x + 1}</li>`;
        }

        // Días del mes actual
        const today = new Date();
        for (let i = 1; i <= lastDay; i++) {
            // Comprueba si este día es 'hoy'
            if (
                i === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
            ) {
                daysHTML += `<li class="today">${i}</li>`;
            } else {
                daysHTML += `<li>${i}</li>`;
            }
        }

        // Días del mes siguiente
        for (let j = 1; j <= nextDays; j++) {
            daysHTML += `<li class="empty">${j}</li>`;
        }

        monthDays.innerHTML = daysHTML;
    };

    // Event listeners para los botones de mes previo/siguiente
    document.querySelector('.prev').addEventListener('click', () => {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    });

    document.querySelector('.next').addEventListener('click', () => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    });

    // Renderiza el calendario al cargar la página
    renderCalendar();
});