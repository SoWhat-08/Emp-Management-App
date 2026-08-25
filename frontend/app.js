const API = '/api/employees';

async function load() {
    try {
        const response = await fetch(API);

        if (!response.ok) {
            throw new Error('Failed to load employees');
        }

        const data = await response.json();

        document.querySelector('#rows').innerHTML = data.map(employee => `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.email}</td>
                <td>
                    <button class="delete" onclick="removeEmp(${employee.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        document.querySelector('#msg').textContent =
            'Unable to load employees';
        console.error(error);
    }
}

document.querySelector('#form').addEventListener('submit', async event => {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const department = document.querySelector('#department').value;
    const email = document.querySelector('#email').value;

    const employee = {
        name: name,
        department: department,
        email: email
    };

    try {
        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });

        if (response.ok) {
            event.target.reset();

            document.querySelector('#msg').textContent =
                'Employee added successfully';

            load();
        } else {
            const errorText = await response.text();

            document.querySelector('#msg').textContent =
                'Unable to add employee: ' + errorText;

            console.error(errorText);
        }
    } catch (error) {
        document.querySelector('#msg').textContent =
            'Unable to connect to backend';

        console.error(error);
    }
});

async function removeEmp(id) {
    try {
        const response = await fetch(API + '/' + id, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Delete failed');
        }

        load();
    } catch (error) {
        document.querySelector('#msg').textContent =
            'Unable to delete employee';

        console.error(error);
    }
}

load();
