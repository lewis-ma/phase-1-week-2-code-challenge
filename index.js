// Retrieve necessary elements from the DOM
const voteButtons = document.querySelectorAll(".vote-btn");
const addCharacterForm = document.getElementById("addCharacterForm");
const resetFormBtn = document.getElementById("resetFormBtn");
const animalTable = document.getElementById("animalTable");

// Add event listeners to vote buttons
voteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const countCell = button.parentNode.previousElementSibling;
    const count = parseInt(countCell.textContent);
    countCell.textContent = count + 1;
    console.log(count);
  });
});

// Add event listener to the form submission
addCharacterForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission

  // Retrieve form input values
  const nameInput = document.getElementById("name");
  const imageInput = document.getElementById("image");
  const name = nameInput.value;
  const image = imageInput.value;

  // Create a new row for the added character
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${animalTable.rows.length}</td>
    <td>${name}</td>
    <td><img src="${image}" alt="${name}"></td>
    <td>0</td>
    <td><button class="vote-btn">Vote</button></td>
  `;

  // Add event listener to the vote button in the new row
  const newVoteButton = newRow.querySelector(".vote-btn");
  newVoteButton.addEventListener("click", () => {
    const countCell = newVoteButton.parentNode.previousElementSibling;
    const count = parseInt(countCell.textContent);
    countCell.textContent = count + 1;
  });

  // Append the new row to the table body
  animalTable.appendChild(newRow);

  // Reset form inputs
  nameInput.value = "";
  imageInput.value = "";
});

// Add event listener to the form reset button
resetFormBtn.addEventListener("click", () => {
  addCharacterForm.reset();
});
