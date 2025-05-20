document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("rosterGrid");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");

  if (!grid) return;

  const render = (list) => {
    grid.innerHTML = "";
    list.forEach((p, index) => {
      const col = document.createElement("div");
      col.className = "col-6 col-lg-2";
      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${p.photo}" class="card-img-top" alt="${p.firstName} ${
        p.lastName
      }">
          <div class="card-body text-center">
            <h5 class="card-title mb-1">${p.firstName} ${p.lastName}</h5>
            <div class="badge badge-position badge-pos-${p.position}">${
        p.position
      }</div>
            <p class="small text-muted mb-0">Age ${p.age}</p>
            <p class="small mb-0">Height: ${p.height}</p>
            <p class="small mb-0">Weight: ${p.weight} lbs</p>
            <p class="small text-muted">Draft: ${p.draftPosition}</p>
            <button 
              class="btn btn-sm btn-outline-primary mt-2" 
              data-bs-toggle="collapse" 
              data-bs-target="#moreInfo-${index}"
              aria-expanded="false" 
              aria-controls="moreInfo-${index}">
              More Info
            </button>
            <div id="moreInfo-${index}" class="collapse mt-2">
              <p class="small">Fun Fact: ${p.funFact || "Loves the game!"}</p>
            </div>
          </div>
        </div>
      `;
      grid.appendChild(col);
    });
  };

  const applyFilters = () => {
    const term = searchInput.value.trim().toLowerCase();
    let filtered = players.filter((p) =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(term)
    );

    const [key, dir] = sortSelect.value.split("-");
    filtered.sort((a, b) => {
      if (key === "age") {
        return dir === "asc" ? a.age - b.age : b.age - a.age;
      }
      const A = (
        key === "firstName"
          ? a.firstName
          : key === "lastName"
          ? a.lastName
          : a.position
      ).toLowerCase();
      const B = (
        key === "firstName"
          ? b.firstName
          : key === "lastName"
          ? b.lastName
          : b.position
      ).toLowerCase();
      return dir === "asc" ? A.localeCompare(B) : B.localeCompare(A);
    });

    render(filtered);
  };

  searchInput.addEventListener("input", applyFilters);
  sortSelect.addEventListener("change", applyFilters);

  render(players);
});
