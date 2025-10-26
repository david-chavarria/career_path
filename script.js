document.addEventListener('DOMContentLoaded', () => {
    
    // --- CHECKLIST LOGIC ---
    const checklist = document.getElementById('checklist');
    const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');

    function saveProgress() {
        checkboxes.forEach(checkbox => {
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    }

    function loadProgress() {
        checkboxes.forEach(checkbox => {
            const isChecked = localStorage.getItem(checkbox.id) === 'true';
            checkbox.checked = isChecked;
        });
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', saveProgress);
    });

    loadProgress();

    // --- CALENDAR LOGIC ---
    const date = new Date();
    const monthDaysContainer = document.getElementById('month-days');

    const renderCalendar = () => {
        date.setDate(1);

        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        
        let firstDayIndex = date.getDay();
        if (firstDayIndex === 0) { // Sunday (0) becomes 6
            firstDayIndex = 6;
        } else { // Monday (1) to Saturday (6) become 0 to 5
            firstDayIndex -= 1; 
        }

        const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
        const nextDays = (lastDayIndex === 0) ? 0 : 7 - lastDayIndex;

        // Change language to English (en-US)
        const monthOptions = { month: 'long' };
        const monthName = date.toLocaleDateString('en-US', monthOptions);

        document.getElementById('month-name').innerText = monthName;
        document.getElementById('date-str').innerText = date.getFullYear().toString();

        let daysHTML = "";

        // Previous month's days
        for (let x = firstDayIndex; x > 0; x--) {
            daysHTML += `<li class="empty">${prevLastDay - x + 1}</li>`;
        }

        // Current month's days
        const today = new Date();
        for (let i = 1; i <= lastDay; i++) {
            const isToday = i === today.getDate() &&
                            date.getMonth() === today.getMonth() &&
                            date.getFullYear() === today.getFullYear();
            
            // --- ¡NUEVA LÓGICA! ---
            // Create a unique ID for each day to save its state
            const dayID = `day-${date.getFullYear()}-${date.getMonth()}-${i}`;
            // Check localStorage to see if this day was marked
            const isStudyDay = localStorage.getItem(dayID) === 'true';

            let classes = "";
            if (isToday) classes += "today ";
            if (isStudyDay) classes += "study-day";

            // Add the id and classes to the li element
            daysHTML += `<li id="${dayID}" class="${classes.trim()}">${i}</li>`;
        }

        // Next month's days
        for (let j = 1; j <= nextDays; j++) {
            daysHTML += `<li class="empty">${j}</li>`;
        }

        monthDaysContainer.innerHTML = daysHTML;
    };

    // --- ¡NUEVA LÓGICA DE CLIC! ---
    // Add click listener to the entire calendar days container
    monthDaysContainer.addEventListener('click', (e) => {
        // Check if the clicked element is an <li> and NOT an empty one
        if (e.target.tagName === 'LI' && !e.target.classList.contains('empty')) {
            // Toggle the 'study-day' class
            e.target.classList.toggle('study-day');
            
            // Save the new state to localStorage
            const dayID = e.target.id;
            if (e.target.classList.contains('study-day')) {
                localStorage.setItem(dayID, 'true');
L            } else {
                // If the class is removed, remove the item from storage
                localStorage.removeItem(dayID);
            }
        }
    });

    // Event listeners for prev/next month buttons
    document.querySelector('.prev').addEventListener('click', () => {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    });

    document.querySelector('.next').addEventListener('click', () => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    });

    // Initial render
    renderCalendar();
});
