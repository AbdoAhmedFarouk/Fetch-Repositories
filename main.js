let theInput = document.querySelector(".get-repos input"),
  getButton = document.querySelector(".get-button"),
  reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

function getRepos() {
  if (theInput.value == "") {
    reposData.innerHTML = "<span>Please Write A Github Username</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((res) => res.json())
      .then((repos) => {
        reposData.innerHTML = "";
        repos.forEach((repo) => {
          let mainDiv = document.createElement("div");
          let repoName = document.createTextNode(repo.name);
          mainDiv.appendChild(repoName);
          let url = document.createElement("a");
          let urlText = document.createTextNode("Visit");
          url.appendChild(urlText);
          url.href = `https://github.com/${theInput.value}/${repo.name}`;
          url.setAttribute("target", "_blank");
          mainDiv.appendChild(url);
          let starsSpan = document.createElement("span");
          let starsTxt = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );
          starsSpan.appendChild(starsTxt);
          mainDiv.appendChild(starsSpan);
          mainDiv.className = "repo-box";
          reposData.appendChild(mainDiv);
        });
      });
  }
}