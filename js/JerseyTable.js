fetch('http://localhost:8080/api/cykelryttere/jersey')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#jerseyTable tbody');
        data.forEach(cykelrytter => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cykelrytter.id}</td>
                <td>${cykelrytter.navn}</td>
                <td>${cykelrytter.alder}</td>
                <td>${cykelrytter.samletTid}</td>
                <td>${cykelrytter.bjergpoint}</td>
                <td>${cykelrytter.spurtpoint}</td>
                <td>${cykelrytter.jersey}</td>
                <td>${cykelrytter.cykelhold.navn}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.log('Error:', error);
    });
