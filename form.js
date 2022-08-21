//login Script
let users = [];

(() => {

  let item = localStorage.getItem("users");
  if (item) users = JSON.parse(item);

  let loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    window.location.href = "./dashboard.html"
    return;
  }
})()

function toggleShowPassword() {

  let type = document.getElementById("password").attributes.type.value;
  // console.log("type", type);

  if (type === "password") {
    document.getElementById("password").setAttribute("type", "text");
    document.getElementById("showPasswordButton").innerHTML = `<i class="fa-solid fa-eye-slash"></i>`
  } else {
    document.getElementById("password").setAttribute("type", "password");
    document.getElementById("showPasswordButton").innerHTML = `<i class="fa-solid fa-eye"></i>`
  }
}

function doLogin(e) {
  e.preventDefault();
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  let isFound = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      isFound = true;

      if (users[i].password === password) {
        document.querySelector("#result").innerText = "Login Successful";
        localStorage.setItem("loggedInUser", JSON.stringify(users[i]));
        window.location.href = "./dashboard.html"
        break;
      } else {
        document.querySelector("#error").innerText = "Incorrect password";
        return;
      }
    }
  }
  if (!isFound) {
    document.querySelector("#error").innerText = "User not Found";
    return;
  }
  e.target.reset();
}

//Sign up Script
function doSignup(e) {
  e.preventDefault();

  let firstName = document.querySelector("#firstName").value;
  let lastName = document.querySelector("#lastName").value;
  let gender = document.querySelector("#gender").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let rePassword = document.querySelector("#rePassword").value;

  setTimeout(() => {
    document.querySelector("#result").innerText = "";
    document.querySelector("#error").innerText = "";
  }, 5000);

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      document.querySelector("#error").innerText = "This Email is Already Exist";
      return;
    }
  }

  if (password !== rePassword) {
    document.querySelector("#error").innerText = "Password and Repeat Password doesn`t Match"
    return;
  }

  let newUser = {
    firstName,
    lastName,
    gender,
    email,
    password,
    rePassword,
  }

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  document.querySelector("#result").innerText = "Signup Successful";


  e.target.reset();
}
