const entries = [];
var x = 1;
function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode < 48 || charCode > 57) {
    return false;
  }
  return true;
}

function allowOnlyLetters(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (
    (charCode < 65 || charCode > 90) &&
    (charCode < 97 || charCode > 122) &&
    charCode !== 32
  ) {
    return false;
  }
  return true;
}

function formSubmission() {
  const user_obj = {};
  user_obj.name = document.getElementById("user_name").value;
  user_obj.mail = document.getElementById("user_mail").value;
  user_obj.phone = document.getElementById("user_phone").value;
  user_obj.age = document.getElementById("user_age").value;
  let table = document.getElementById("my_table");

  entries.push(user_obj);
  displayUser();
  console.log(entries);
  document.getElementById("user_form").reset();
}

function displayUser() {
  let table = document.getElementById("my_table");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  entries.map((user, index) => {
    if (index < 6 * x && index >= 6 * (x - 1)) {
      let row = table.insertRow();
      let c1 = row.insertCell(0);
      let c2 = row.insertCell(1);
      let c3 = row.insertCell(2);
      let c4 = row.insertCell(3);
      c1.innerHTML = user.name;
      c2.innerHTML = user.mail;
      c3.innerHTML = user.phone;
      c4.innerHTML = user.age;
    }
  });

  let nextButton = document.getElementById("nextButton");
  let prevButton = document.getElementById("prevButton");

  if (entries.length > 6 * x) {
    nextButton.style.display = "block";
  } else {
    nextButton.style.display = "none";
  }

  if (x > 1) {
    prevButton.style.display = "block";
  } else {
    prevButton.style.display = "none";
  }
}

function next() {
  x++;
  displayUser();
}

function previous() {
  x--;
  displayUser();
}

document.getElementById("user_age").addEventListener("change", function () {
  let v = parseInt(this.value);
  if (v < 18) {
    alert("Age should be greater than 17.");
    this.value = "";
  }
  if (v > 120) {
    alert("Age should be less than 120.");
    this.value = "";
  }
});

// function goBack(){
//   window.location.href="index.html";
// }

//   function displayUser() {
//     // Store entries in local storage
//     localStorage.setItem("userEntries", JSON.stringify(entries));

//     // Redirect to the new HTML page
//     window.location.href = "newPage.html";
// }
