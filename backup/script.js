const container = document.getElementById("groupsContainer");

groups.forEach((group) => {
  const groupBox = document.createElement("div");

  groupBox.classList.add("group-box");

  const teamsHTML = group.teams
    .map(
      (team) => `
      
      <tr>

        <td class="team-name">
          <img
            class="flag"
            src="${team.flag}"
            alt="${team.name}"
          >

          ${team.name}
        </td>

        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>

      </tr>
    
    `,
    )
    .join("");

  const matchesHTML = group.matches
    .map(
      (match) => `
      
      <div class="match">

        <div class="match-info">
          ${match.date}
          <span class="dot">•</span>
          ${match.time}
          <span class="dot">•</span>
          ${match.location}
        </div>

        <p>
          ${match.home}
          <strong> X </strong>
          ${match.away}
        </p>

      </div>
    
    `,
    )
    .join("");

  groupBox.innerHTML = `
    
    <h2>${group.name}</h2>

    <table>

      <thead>

        <tr>
          <th>Seleção</th>
          <th>PTS</th>
          <th>VIT</th>
          <th>EMP</th>
          <th>DER</th>
          <th>GP</th>
          <th>GC</th>
          <th>SG</th>
        </tr>

      </thead>

      <tbody>

        ${teamsHTML}

      </tbody>

    </table>

    <div class="matches">

      ${matchesHTML}

    </div>
  
  `;

  container.appendChild(groupBox);
});

const groupsContainer = document.querySelector(".groups-container");

const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");

rightBtn.addEventListener("click", () => {
  groupsContainer.scrollLeft += 650;
});

leftBtn.addEventListener("click", () => {
  groupsContainer.scrollLeft -= 650;
});
