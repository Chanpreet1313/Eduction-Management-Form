let button1 = document.querySelector("#center1");
let text = document.querySelector("#center");
text.style.display = "none"; // Initially hide the form
let sub = document.querySelector("#table");
sub.style.display = "none"; // Initially hide the table
let currentEditingRow = null;
let submitBtn = document.querySelector(".submit");

// Show form when "Add Education" button is clicked
document.querySelector(".butt").addEventListener("click", () => {
    text.style.display = "block";
    resetForm();
    submitBtn.innerHTML = "Submit";
    currentEditingRow = null;
});

// Hide form and table when cancel button is clicked
document.querySelector("#cancel").addEventListener("click", () => {
    text.style.display = "none";
    resetForm();
});

// Use only one event listener for the submit button
submitBtn.addEventListener("click", handleSubmit);

function handleSubmit(e) {
    e.preventDefault(); // Prevent form submission

    let degre = document.getElementById('degree');
    let year = document.getElementById('year');
    let regis = document.getElementById('regno');
    let uni = document.getElementById('university');

    if (degre.value.trim() && year.value.trim() && regis.value.trim() && uni.value.trim()) {
        sub.style.display = "block"; // Show the table if the form is valid

        if (currentEditingRow) {
            // Update existing row
            currentEditingRow.cells[1].innerHTML = degre.value;
            currentEditingRow.cells[2].innerHTML = year.value;
            currentEditingRow.cells[3].innerHTML = regis.value;
            currentEditingRow.cells[4].innerHTML = uni.value;
        } else {
            // Add new row
            addNewRow(degre.value, year.value, regis.value, uni.value);
        }

        // Clear form fields and reset
        resetForm();
        text.style.display = "none";
        submitBtn.innerHTML = "Submit";
        currentEditingRow = null;
    } else {
        alert("Please fill in all the fields");
    }
}

function resetForm() {
    document.getElementById('degree').value = '';
    document.getElementById('year').value = '';
    document.getElementById('regno').value = '';
    document.getElementById('university').value = '';
}

function addNewRow(degree, year, regno, university) {
    let tableinner = document.getElementById("table");
    let rowCount = tableinner.rows.length;
    let row = tableinner.insertRow(rowCount);

    row.insertCell(0).innerHTML = rowCount;
    row.insertCell(1).innerHTML = degree;
    row.insertCell(2).innerHTML = year;
    row.insertCell(3).innerHTML = regno;
    row.insertCell(4).innerHTML = university;

    let actionsCell = row.insertCell(5);

    // Create edit button
    let editbtn = document.createElement("button");
    editbtn.innerHTML = "Edit";
    actionsCell.appendChild(editbtn);
    editbtn.addEventListener("click", function () {
        editEntry(row);
    });

    // Create delete button
    let deletebtn = document.createElement("button");
    deletebtn.innerHTML = "Delete";
    deletebtn.className = "delete-button";
    actionsCell.appendChild(deletebtn);
    deletebtn.addEventListener("click", function() {
        deleteRow(row);
    });
}

function editEntry(row) {
    text.style.display = "block";
    document.getElementById('degree').value = row.cells[1].innerHTML;
    document.getElementById('year').value = row.cells[2].innerHTML;
    document.getElementById('regno').value = row.cells[3].innerHTML;
    document.getElementById('university').value = row.cells[4].innerHTML;
    submitBtn.innerHTML = "Save Changes";
    currentEditingRow = row;
}

function deleteRow(row) {
    const table = document.getElementById('table');
    row.parentNode.removeChild(row); // Remove the row
    updateRowNumbers(); // Update the row numbers after deletion

    // Check if only the header row remains
    if (table.rows.length <= 1) {
        sub.style.display = "none"; // Hide the table if no data rows are left
    }
}

function updateRowNumbers() {
    const table = document.getElementById("table");

    // Start from 1 assuming the first row is the header row
    for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerHTML = i;
    }
}
