const form = document.querySelector("form");
const usersContainer = document.querySelector("#results");

function abbr(str) {
  return str
    .split(" ")
    .map((name) => name[0])
    .join(".");
}

function random_bg_color() {
  var x = Math.floor(Math.random() * 200);
  var y = Math.floor(Math.random() * 200);
  var z = Math.floor(Math.random() * 100);
  var bgColor = "rgb(" + x + "," + y + "," + z + ")";
  return bgColor;
}

function displayUser({ name, age }) {
  return `
  <div class="searchresultcontainer">
  <div class="circle" style = "background: ${random_bg_color()}; border: 1px solid black ;">${abbr(
    name
  )}</div>
  <div class="name-age">
    <h4>${name}</h4>
    <p>${age} year${age > 1 ? "s" : ""} old</p>
  </div>
</div>
  `;
}

function displayUsers(persons) {
  return persons.map(displayUser).join("");
}

function compareNames(name, searchTerm) {
  return name.toLowerCase().includes(searchTerm.toLowerCase());
}

function searchUsers(name, age) {
  const result = [];
  for (let i = 0; i < users.length; i++) {
    let isIncluded = true;
    let user = users[i];
    if (name && !compareNames(user.name, name)) {
      isIncluded = false;
    }
    if (age && user.age !== age) {
      isIncluded = false;
    }
    if (isIncluded) {
      result.push(user);
    }
  }
  return result;
}

usersContainer.innerHTML = displayUsers(users);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  usersContainer.innerHTML = displayUsers(
    searchUsers(e.target.name.value, +e.target.age.value)
  );
});
