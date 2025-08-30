const API_URL = "https://localhost:7083/api/students";
const API_KEY = "SuperSecretKey123!";

// Handle form submit
document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = parseInt(document.getElementById("age").value, 10);

  try {
    const response = await fetch(`${API_URL}/insert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apiKey": API_KEY
      },
      body: JSON.stringify({ name, age })
    });

    if (!response.ok) throw new Error("Failed to insert student");

    const result = await response.json();
    alert(result.message);

    document.getElementById("studentForm").reset();
    fetchStudents();

  } catch (error) {
    alert("Insert failed: " + error.message);
  }
});

// Fetch all students
async function fetchStudents() {
  try {
    const response = await fetch(`${API_URL}/all`, {
      headers: { "apiKey": API_KEY }
    });

    if (!response.ok) throw new Error("Failed to fetch students");

    const students = await response.json();
    const tableBody = document.getElementById("studentsTable");
    tableBody.innerHTML = "";

    students.forEach((s, i) => {
      const row = `
        <tr>
          <td>${i + 1}</td>
          <td>${s.name}</td>
          <td>${s.age}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  } catch (error) {
    alert("Fetch failed: " + error.message);
  }
}
