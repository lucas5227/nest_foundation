window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);

        // 열 너비 조정
        const thElements = datatablesSimple.querySelectorAll('th');

        if (thElements.length) {
            thElements[0].style.width = '5%';  // No.
            thElements[1].style.width = '15%'; // ID
            thElements[2].style.width = '25%'; // Name
            thElements[3].style.width = '30%'; // Email
            thElements[4].style.width = '15%'; // Regi date
            thElements[5].style.width = '10%'; // Modify
        }
    }
});
