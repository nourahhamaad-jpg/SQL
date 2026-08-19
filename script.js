document.addEventListener("DOMContentLoaded", function () {
    loadUsers();

    document.getElementById("userForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const age = document.getElementById("age").value.trim();

        fetch("submit.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "name=" + encodeURIComponent(name) + "&age=" + encodeURIComponent(age)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    addRowToTable(data);
                    document.getElementById("userForm").reset();
                } else {
                    alert("خطأ: " + data.error);
                }
            })
            .catch(err => console.error("Error:", err));
    });

    document.getElementById("usersTableBody").addEventListener("click", function (e) {
        if (e.target.classList.contains("toggle-btn")) {
            const button = e.target;
            const id = button.getAttribute("data-id");

            button.disabled = true;

            fetch("toggle.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: "id=" + encodeURIComponent(id)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const row = document.getElementById("row-" + data.id);
                        const statusCell = row.querySelector(".status-cell");
                        statusCell.textContent = data.status;
                    } else {
                        alert("خطأ: " + data.error);
                    }
                })
                .catch(err => console.error("Error:", err))
                .finally(() => {
                    button.disabled = false;
                });
        }
    });
});

function loadUsers() {
    fetch("get_records.php")
        .then(response => response.json())
        .then(users => {
            const tbody = document.getElementById("usersTableBody");
            tbody.innerHTML = "";
            users.forEach(user => addRowToTable(user));
        })
        .catch(err => console.error("Error:", err));
}

function addRowToTable(user) {
    const tbody = document.getElementById("usersTableBody");
    const row = document.createElement("tr");
    row.id = "row-" + user.id;
    row.innerHTML =
        "<td>" + user.id + "</td>" +
        "<td>" + user.name + "</td>" +
        "<td>" + user.age + "</td>" +
        "<td class=\"status-cell\">" + user.status + "</td>" +
        "<td><button class=\"toggle-btn\" data-id=\"" + user.id + "\">Toggle</button></td>";
    tbody.appendChild(row);
}
