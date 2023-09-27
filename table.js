const tableBody = document.getElementById('table-body');

// Function to confirm user deletion
function confirmDelete(userId) {
    if (confirm("Confirm delete?")) {
        // If the user confirms, call a function to delete the user
        deleteUser(userId);
    }
}

// Function to delete a user
function deleteUser(userId) {
    // Send a DELETE request to the server to delete the user
    fetch(`/deleteUser/${userId}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                // User deleted successfully, remove the row from the table
                const rowToDelete = document.getElementById(`user-row-${userId}`);
                if (rowToDelete) {
                    rowToDelete.remove();
                }
            } else {
                // Display an error message if the user was not found
                alert(data.error);
            }
        })
        .catch(error => console.error(error));
}

fetch('/getUsers')
  .then(response => response.json())
  .then(data => {
    // Iterate over each user object
    data.forEach(user => {
      // Create a new row for each user
      const row = document.createElement('tr');
      row.id = `user-row-${user._id}`; // Add a unique ID to the row

      // Create and populate cells for username, email, and address
      const usernameCell = document.createElement('td');
      usernameCell.textContent = user.username;

      const emailCell = document.createElement('td');
      emailCell.textContent = user.email;

      const addressCell = document.createElement('td');
      addressCell.textContent = user.address;

      // Create a cell for the delete button
      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => confirmDelete(user._id)); // Pass the user ID to confirmDelete
      deleteCell.appendChild(deleteButton);

      // Append cells to row
      row.appendChild(usernameCell);
      row.appendChild(emailCell);
      row.appendChild(addressCell);
      row.appendChild(deleteCell); // Add the delete button cell to the row

      // Append row to table body
      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error(error));
