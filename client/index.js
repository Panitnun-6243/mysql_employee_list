//GET request
const loadTable = () => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/users");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var trHTML = "";
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["id"] + "</td>";
        trHTML +=
          "<td><img width='50px' class='avatar' src='" +
          object["avatar"] +
          "'></td>";
        trHTML += "<td>" + object["fname"] + "</td>";
        trHTML += "<td>" + object["lname"] + "</td>";
        trHTML += "<td>" + object["username"] + "</td>";
        trHTML +=
          "<td><div style='margin-right:5px;display: flex;flex-direction: row;column-gap: 10px;'><button type='button' class='btn btn-outline-info' onclick='showUserUpdateDialog(" + object['id'] + ")'>Edit</button><button type='button' class='btn btn-outline-warning' onclick='userDelete(" + object['id'] + ")'>Delete</button></div></td>";
        trHTML += "</tr>";
      }
      document.getElementById("tableData").innerHTML = trHTML;
    }
  };
};
loadTable();
//Add new member modal dialog
const showUserCreateDialog = () => {
  Swal.fire({
    title: "Add New Employee",
    html:
    '<input id="id" class="swal2-input" placeholder="ID">' +
      '<input id="fname" class="swal2-input" placeholder="First name">' +
      '<input id="lname" class="swal2-input" placeholder="Last name">' +
      '<input id="username" class="swal2-input" placeholder="Username">' +
      '<input id="email" class="swal2-input" placeholder="Email">' +
      '<input id="avatar" class="swal2-input" placeholder="Avatar link">',
    focusConfirm: false,
    preConfirm: () => {
      userCreate()
    },
  });
};
//POST request
const userCreate = () => {
  const id = document.getElementById("id").value
  const fname = document.getElementById("fname").value
  const lname = document.getElementById("lname").value
  const username = document.getElementById("username").value
  const email = document.getElementById("email").value
  const avatar = document.getElementById("avatar").value
  const xhttp =  new XMLHttpRequest()
  xhttp.open("POST", "http://localhost:3000/users/create")
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  xhttp.send(JSON.stringify({
    "id": id,
    "fname": fname,
    "lname": lname,
    "username": username,
    "email": email,
    "avatar": avatar
  }))
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      const object = JSON.parse(this.responseText);
      Swal.fire(object['message'])
      loadTable()
    }
  }
}
//Update new member modal dialog
const showUserUpdateDialog = (id) => {
  const xhttp = new XMLHttpRequest()
  xhttp.open("GET", `http://localhost:3000/users/${id}`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const object = JSON.parse(this.responseText);
      const user = object['user']
      Swal.fire({
        title: "Edit Employee Information",
        html:
          '<input id="id" class="swal2-input" placeholder="First name" value="'+ user['id'] +'" disabled>' +
          '<input id="fname" class="swal2-input" placeholder="First name" value="'+ user['fname'] +'">' +
          '<input id="lname" class="swal2-input" placeholder="Last name" value="'+ user['lname'] +'">' +
          '<input id="username" class="swal2-input" placeholder="Username" value="'+ user['username'] +'">' +
          '<input id="email" class="swal2-input" placeholder="Email" value="'+ user['email'] +'">' +
          '<input id="avatar" class="swal2-input" placeholder="Avatar link" value="'+ user['avatar'] +'">',
        focusConfirm: false,
        preConfirm: () => {
          userUpdate()
        },
      });
    }}
}
//PUT request
const userUpdate = () => {
  const id = document.getElementById("id").value
  const fname = document.getElementById("fname").value
  const lname = document.getElementById("lname").value
  const username = document.getElementById("username").value
  const email = document.getElementById("email").value
  const avatar = document.getElementById("avatar").value
  const xhttp = new XMLHttpRequest()
  xhttp.open("PUT", "http://localhost:3000/users/update")
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  xhttp.send(JSON.stringify({
    "id": id,
    "fname": fname,
    "lname": lname,
    "username": username,
    "email": email,
    "avatar": avatar
  }))
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      const object = JSON.parse(this.responseText);
      Swal.fire(object['message'])
      loadTable()
    }
  }
}
//DELETE request
const userDelete = (id) => {
  const xhttp = new XMLHttpRequest()
  xhttp.open("DELETE", "http://localhost:3000/users/delete")
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  xhttp.send(JSON.stringify({
    "id": id
  }))
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      const object = JSON.parse(this.responseText);
      Swal.fire(object['message'])
      loadTable()
    }
  }
}