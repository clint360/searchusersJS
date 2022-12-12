const form = document.querySelector('form');
const usersContainer = document.querySelector('#results')

function abbr(name) {
 let str = name;
 stringArray = str.split(/(\s+)/);
 return `${stringArray[0][0]}.${stringArray[2][0]}`;
}

function displayUser({name, age}) {
  return `
  <div class="searchresultcontainer">
  <div class="circle">${abbr(name)}</div>
  <div class="name-age">
    <h4>${name}</h4>
    <p>${age} year${age > 1? "s" : ""} old</p>
  </div>
</div>
  `
}

function displayUsers(persons) {
  return persons.map(displayUser).join("")
}

function compareNames(name, searchTerm) {
  return name.toLowerCase().includes(searchTerm.toLowerCase());
}

function searchUsers (name, age) {
  const result = [];
  for(let i = 0; i < users.length; i++) {
    let isIncluded = true;
    let user = users[i]
    if(name && !compareNames(user.name, name)) {
      isIncluded = false;
    }
    if (age && user.age !==age) {
       isIncluded = false;
    }
    if(isIncluded) {
      result.push(user);
    }
  }
  return result;
}

usersContainer.innerHTML = displayUsers(users);

form.addEventListener('submit', (e) =>  {
  e.preventDefault()
  usersContainer.innerHTML = displayUsers(
    searchUsers(e.target.name.value, +e.target.age.value)
  );
});