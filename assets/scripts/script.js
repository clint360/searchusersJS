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

function shouldResolve() {
  return Math.random() < 0.95;
}

function searchUsers(name, age) {
  return new Promise((resolve, reject) => {
setTimeout(() => {
if (shouldResolve()) {
  resolve (
users.filter(
  (user) => 
  (!name || compareNames(user.name, name)) && (!age || user.age === age)
)
  );
} else {
  reject([]);
}
}, 3000);
  });
}

function loading() {
  return `<div class="loader">
  <div class="loader-inner">
    <div class="loader-line-wrap">
      <div class="loader-line"></div>
    </div>
    <div class="loader-line-wrap">
      <div class="loader-line"></div>
    </div>
    <div class="loader-line-wrap">
      <div class="loader-line"></div>
    </div>
    <div class="loader-line-wrap">
      <div class="loader-line"></div>
    </div>
    <div class="loader-line-wrap">
      <div class="loader-line"></div>
    </div>
  </div>
</div>`
}

function renderMessage(message) {
  return `<div style = "color: red">${message}</div>`
}

usersContainer.innerHTML = displayUsers(users);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  usersContainer.innerHTML = loading();
    searchUsers(e.target.name.value, +e.target.age.value)
    .then((result)=> {
      usersContainer.innerHTML = displayUsers(result);
    })
    .catch((e) => {
      usersContainer.innerHTML = renderMessage("Error Loading, Please try again"
      );
    });
    });
 

