document.addEventListener("DOMContentLoaded", function () {
  // Retrieve entries from local storage
  const storedEntries = localStorage.getItem("userEntries");

  if (storedEntries) {
      const entries = JSON.parse(storedEntries);

      // Display user details on the new page
      const contentDiv = document.getElementById("content");

      entries.forEach((user) => {
          const userDiv = document.createElement("div");
          userDiv.innerHTML = `
              <p>Name: ${user.name}</p>
              <p>Email: ${user.mail}</p>
              <p>Phone: ${user.phone}</p>
              <p>Age: ${user.age}</p>
          `;

          contentDiv.appendChild(userDiv);
      });
  }
});
