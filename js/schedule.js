fetch(
  `https://statsapi.web.nhl.com/api/v1/schedule?teamId=10&season=20242025=${year}`
)
  .then((res) => res.json()) // Parse response as JSON
  .then((data) => {
    // If no game dates are returned, exit
    if (!data.dates) return;

    // Loop through each game date
    data.dates.forEach((d) => {
      // Loop through each game on that date
      d.games.forEach((g) => {
        const tr = document.createElement("tr"); // create a new table row

        // Determine if the Mets are the home team
        const isHome = g.teams.home.team.id === 121;

        // Get opponent name (depends on home/away)
        const opponent = isHome
          ? g.teams.away.team.name
          : g.teams.home.team.name;

        // Format the game time to readable 12hr format in Eastern Time
        const gameTime = new Date(g.gameDate).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "America/New_York",
        });

        // Set row HTML
        tr.innerHTML = `
            <td>${d.date}</td>
            <td>${opponent}</td>
            <td>${g.venue.name}</td>
            <td>${isHome ? "Home" : "Away"}</td>
            <td>${gameTime}</td>
          `;

        // Add the row to the table body
        tbody.appendChild(tr);
      });
    });
  })
  .catch((err) => {
    // Log any errors to the console
    console.error("Schedule load error", err);
  });
