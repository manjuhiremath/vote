const crudBaseURL = "https://crudcrud.com/api/620ac9c9f78d40e7a9850fa46f4e0787/votes"; 
let totalVotes = 0;
const voteCounts = {
    Suresh: 0,
    Deepank: 0,
    Abhik: 0,
};

async function fetchVotes() {
    try {
        const response = await fetch(crudBaseURL);
        if (!response.ok) throw new Error("Failed to fetch votes");
        const votesData = await response.json();

        totalVotes = 0;
        voteCounts.Suresh = 0;
        voteCounts.Deepank = 0;
        voteCounts.Abhik = 0;

        document.getElementById("votersSuresh").innerHTML = "";
        document.getElementById("votersDeepank").innerHTML = "";
        document.getElementById("votersAbhik").innerHTML = "";

        votesData.forEach((vote) => {
            voteCounts[vote.candidate]++;
            totalVotes++;
            addVoterToUI(vote.candidate, vote.name, vote._id);
        });

        updateResults();
    } catch (error) {
        console.error("Error fetching votes:", error);
    }
}

function updateResults() {
    document.getElementById("totalVotes").textContent = totalVotes;
    document.getElementById("votesSuresh").textContent = voteCounts.Suresh;
    document.getElementById("votesDeepank").textContent = voteCounts.Deepank;
    document.getElementById("votesAbhik").textContent = voteCounts.Abhik;
}

async function addVoteToCrud(voterName, candidate) {
    try {
        const response = await fetch(crudBaseURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: voterName, candidate }),
        });
        if (!response.ok) throw new Error("Failed to save vote");
        const newVote = await response.json();
        return newVote._id;
    } catch (error) {
        console.error("Error adding vote to CrudCrud:", error);
    }
}

async function deleteVoteFromCrud(voteId) {
    try {
        const response = await fetch(`${crudBaseURL}/${voteId}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete vote");
    } catch (error) {
        console.error("Error deleting vote from CrudCrud:", error);
    }
}

function addVoterToUI(candidate, voterName, voteId) {
    const voterList = document.getElementById(`voters${candidate}`);
    const voterItem = document.createElement("div");
    voterItem.className = "voter-list-item";
    voterItem.textContent = voterName;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";

    deleteButton.addEventListener("click", async () => {
        voterList.removeChild(voterItem);
        voteCounts[candidate]--;
        totalVotes--;
        updateResults();
        await deleteVoteFromCrud(voteId); 
    });

    voterItem.appendChild(deleteButton);
    voterList.appendChild(voterItem);
}

document.getElementById("voteButton").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const selectedCandidate = document.getElementById("vote").value;

    if (!username) {
        alert("Please enter your name to vote!");
        return;
    }

    voteCounts[selectedCandidate]++;
    totalVotes++;

    const voteId = await addVoteToCrud(username, selectedCandidate); 
    updateResults();

    addVoterToUI(selectedCandidate, username, voteId);

    document.getElementById("username").value = "";

    alert(`Thank you, ${username}, for voting for ${selectedCandidate}!`);
});

fetchVotes();