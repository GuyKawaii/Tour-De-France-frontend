// Fetch all Cykelryttere when the page loads
window.onload = function() {
    refreshList();
};

// Add event listener to Create form
document.getElementById('create-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = {
        navn: document.getElementById('create-navn').value,
        alder: document.getElementById('create-alder').value,
        samletTid: document.getElementById('create-samletTid').value,
        bjergpoint: document.getElementById('create-bjergpoint').value,
        spurtpoint: document.getElementById('create-spurtpoint').value,
        cykelhold: {
            id: document.getElementById('create-holdId').value
        }
    };

    fetch('http://localhost:8080/api/cykelryttere', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(response => {
        if (response.ok) {
            refreshList();
        }
    });
});

// Refresh list of Cykelryttere
function refreshList() {
    fetch('http://localhost:8080/api/cykelryttere')
        .then(response => response.json())
        .then(data => {
            var table = document.getElementById('cykelrytter-list');
            // Clear the table
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }
            // Repopulate the table
            data.forEach(cykelrytter => {
                var row = table.insertRow(-1);
                row.insertCell(0).textContent = cykelrytter.id;
                row.insertCell(1).textContent = cykelrytter.navn;
                row.insertCell(2).textContent = cykelrytter.alder;
                row.insertCell(3).textContent = cykelrytter.samletTid;
                row.insertCell(4).textContent = cykelrytter.bjergpoint;
                row.insertCell(5).textContent = cykelrytter.spurtpoint;
                row.insertCell(6).textContent = cykelrytter.cykelhold.id;
                row.insertCell(7).textContent = cykelrytter.cykelhold.navn;

                // Create "Update" button
                var updateButton = document.createElement('button');
                updateButton.textContent = "Update";
                updateButton.addEventListener('click', function() {
                    updateCykelrytter(cykelrytter.id);
                });

                // Create "Delete" button
                var deleteButton = document.createElement('button');
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener('click', function() {
                    deleteCykelrytter(cykelrytter.id);
                });

                // Add buttons to new cell
                var actionsCell = row.insertCell(6);
                actionsCell.appendChild(updateButton);
                actionsCell.appendChild(deleteButton);
            });
        });
}

// Update a Cykelrytter
function updateCykelrytter(id) {
    var updateModal = document.getElementById("updateModal");
    document.getElementById("updateId").value = id;

    // Fetch current details of Cykelrytter and fill in form
    fetch(`http://localhost:8080/api/cykelryttere/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("navn").value = data.navn;
            document.getElementById("alder").value = data.alder;
            document.getElementById("samletTid").value = data.samletTid;
            document.getElementById("bjergpoint").value = data.bjergpoint;
            document.getElementById("spurtpoint").value = data.spurtpoint;
            document.getElementById("holdId").value = data.cykelhold.id;
        });

    updateModal.style.display = "block";
}

// Close button functionality
document.getElementById("close").onclick = function() {
    console.log("close");
    var updateModal = document.getElementById("updateModal");
    updateModal.style.display = "none";
}

// Submit form for update
document.getElementById("updateForm").addEventListener("submit", function(event){
    event.preventDefault();

    var formData = {
        navn: document.getElementById("navn").value,
        alder: document.getElementById("alder").value,
        samletTid: document.getElementById("samletTid").value,
        bjergpoint: document.getElementById("bjergpoint").value,
        spurtpoint: document.getElementById("spurtpoint").value,
        cykelhold: {
            id: document.getElementById("holdId").value
        }
    };

    var id = document.getElementById("updateId").value;

    fetch(`http://localhost:8080/api/cykelryttere/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(response => {
        if (response.ok) {
            refreshList();
            var updateModal = document.getElementById("updateModal");
            updateModal.style.display = "none";
        }
    });
});


// Delete a Cykelrytter
function deleteCykelrytter(id) {
    fetch(`http://localhost:8080/api/cykelryttere/${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            refreshList();
        }
    });
}
