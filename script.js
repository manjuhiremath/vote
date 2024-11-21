// Initial vote counts
let totalVotes = 0;
const voteCounts = {
  Suresh: 0,
  Deepank: 0,
  Abhik: 0,
};

// Update results on the UI
function updateResults() {
  document.getElementById("totalVotes").textContent = totalVotes;
  document.getElementById("votesSuresh").textContent = voteCounts.Suresh;
  document.getElementById("votesDeepank").textContent = voteCounts.Deepank;
  document.getElementById("votesAbhik").textContent = voteCounts.Abhik;
}

// Add a voter to the UI under the selected candidate
function addVoterToUI(candidate, voterName) {
  const voterList = document.getElementById(`voters${candidate}`);
  const voterItem = document.createElement("div");
  voterItem.className = "voter-list-item";
  voterItem.textContent = voterName;

  // Add delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.marginLeft = "10px";

  // Delete voter logic
  deleteButton.addEventListener("click", () => {
    voterList.removeChild(voterItem);
    voteCounts[candidate]--;
    totalVotes--;
    updateResults();
  });

  voterItem.appendChild(deleteButton);
  voterList.appendChild(voterItem);
}

// Handle vote button click
document.getElementById("voteButton").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const selectedCandidate = document.getElementById("vote").value;

  if (!username) {
    alert("Please enter your name to vote!");
    return;
  }

  // Increment votes
  voteCounts[selectedCandidate]++;
  totalVotes++;

  // Update the results
  updateResults();

  // Add the voter name below the candidate
  addVoterToUI(selectedCandidate, username);

  // Clear username input
  document.getElementById("username").value = "";

  // Show a confirmation message
  alert(`Thank you, ${username}, for voting for ${selectedCandidate}!`);
});

// Initialize results on page load
updateResults();
