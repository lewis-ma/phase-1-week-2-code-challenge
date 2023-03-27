const characterTable = document.getElementById("character-table");
const resetButton = document.getElementById("reset-button");
const addButton = document.getElementById("add-button");
const nameInput = document.getElementById("name-input");
const imageInput = document.getElementById("image-input");

// Function to retrieve character data from the JSON server
function getCharacters() {
  fetch("http://localhost:3000/characters")
    .then(response => response.json())
    .then(data => {
      // Sort the characters in descending order based on their number of votes
      data.characters.sort((a, b) => b.votes - a.votes);
      
      // Create the table rows for each character
      let tableRows = "";
      data.characters.forEach(character => {
        tableRows += `
          <tr>
            <td>${character.id}</td>
            <td>${character.name}</td>
            <td><img src="${character.image}" alt="${character.name}" /></td>
            <td>${character.votes}</td>
          </tr>
        `;
      });

      // Update the table with the new data
      characterTable.innerHTML = `
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Picture</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      `;
    })
    .catch(error => console.error(error));
}

// Function to reset the votes to 0 for all characters
function resetVotes() {
  fetch("http://localhost:3000/characters", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      characters: [
        { id: 1, votes: 0 },
        { id: 2, votes: 0 },
        { id: 3, votes: 0 },
        { id: 4, votes: 0 },
        { id: 5, votes: 0 }
      ]
    })
  })
    .then(() => getCharacters())
    .catch(error => console.error(error));
}

// Function to add a new character
function addCharacter() {
  const name = nameInput.value;
  const image = imageInput.value;
  
  if (name && image) {
    fetch("http://localhost:3000/characters", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        image: image,
        votes: 0
      })
    })
      .then(() => {
        nameInput.value = "";
        imageInput.value = "";
        getCharacters();
      })
      .catch(error => console.error(error));
  }
}

// Event listener for the reset button
resetButton.addEventListener("click", resetVotes);

// Event listener for the add button
addButton.addEventListener("click", addCharacter);

// Get the initial character data
getCharacters();