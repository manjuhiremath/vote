let totalVotes = 0;
const voteCounts = {
  Suresh: 0,
  Deepank: 0,
  Abhik: 0,
};

function updateResults() {
  document.getElementById("totalVotes").textContent = totalVotes;
  document.getElementById("votesSuresh").textContent = voteCounts.Suresh;
  document.getElementById("votesDeepank").textContent = voteCounts.Deepank;
  document.getElementById("votesAbhik").textContent = voteCounts.Abhik;
}

function addVoterToUI(candidate, voterName) {
  const voterList = document.getElementById(`voters${candidate}`);
  const voterItem = document.createElement("div");
  voterItem.className = "voter-list-item";
  voterItem.textContent = voterName;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.marginLeft = "10px";

  deleteButton.addEventListener("click", () => {
    voterList.removeChild(voterItem);
    voteCounts[candidate]--;
    totalVotes--;
    updateResults();
  });

  voterItem.appendChild(deleteButton);
  voterList.appendChild(voterItem);
}

document.getElementById("voteButton").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const selectedCandidate = document.getElementById("vote").value;

  if (!username) {
    alert("Please enter your name to vote!");
    return;
  }

  voteCounts[selectedCandidate]++;
  totalVotes++;

  updateResults();

  addVoterToUI(selectedCandidate, username);

  document.getElementById("username").value = "";

  alert(`Thank you, ${username}, for voting for ${selectedCandidate}!`);
});

updateResults();
