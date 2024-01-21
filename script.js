var entries = localStorage.getItem("entries")
  ? JSON.parse(localStorage.getItem("entries"))
  : [];
var searchKey = "";
var page = 1;
var limit = 6;
var key = 1;
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
function toggleTableVisibility() {
  let table = document.getElementById("table_content");
  console.log(table.style.display);
  if (table.style.display == "none") {
    table.style.display = "block";
    console.log("hi");
    displayUser();
  } else {
    table.style.display = "none";
  }
}

function formSubmission() {
  const user_obj = {};
  user_obj.key = key++;
  user_obj.name = document.getElementById("user_name").value;
  user_obj.mail = document.getElementById("user_mail").value;
  user_obj.phone = document.getElementById("user_phone").value;
  user_obj.age = document.getElementById("user_age").value;

  if (document.getElementById("male").checked) {
    user_obj.gender = document.getElementById("male").value;
  } else {
    user_obj.gender = document.getElementById("female").value;
  }

  var interested = document.getElementById("areaOfInterestDest");
  const result = [];
  for (var i = interested.options.length - 1; i >= 0; i--) {
    result.push(interested.options[i].value);
  }
  user_obj.interest = result;
  entries.push(user_obj);
  localStorage.setItem("entries", JSON.stringify(entries));
  displayUser();
  // document.getElementById("user_form").reset();
  // document.getElementById("areaOfInterestDest").reset();
}

function changeLimit() {
  limit = document.getElementById("limitSelect").value;
  page = 1;
  displayUser();
}

function filterData(data) {
  if (searchKey == "") {
    return data;
  } else {
    return data.filter((item) => {
      return item.name.toLowerCase().startsWith(searchKey.toLowerCase());
    });
  }
}

function displayUser() {
  let table = document.getElementById("my_table");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  var filteredData = filterData(entries);
  filteredData.map((user, index) => {
    if (index < limit * page && index >= limit * (page - 1)) {
      let row = table.insertRow();
      let c1 = row.insertCell(0);
      let c2 = row.insertCell(1);
      let c3 = row.insertCell(2);
      let c4 = row.insertCell(3);
      let c5 = row.insertCell(4);
      let c6 = row.insertCell(5);
      let c7 = row.insertCell(6);
      c1.innerHTML = user.name;
      c2.innerHTML = user.mail;
      c3.innerHTML = user.phone;
      c4.innerHTML = user.age;
      c5.innerHTML = user.gender;
      c6.innerHTML = user.interest;
      c7.appendChild(createDeleteButton(user.key));
    }
  });

  let nextButton = document.getElementById("nextButton");
  let prevButton = document.getElementById("prevButton");

  if (filteredData.length > limit * page) {
    nextButton.style.display = "block";
  } else {
    nextButton.style.display = "none";
  }

  if (page > 1) {
    prevButton.style.display = "block";
  } else {
    prevButton.style.display = "none";
  }
}

function createDeleteButton(key) {
  var btn = document.createElement("button");
  btn.key = key;
  btn.innerText = "Delete";
  btn.onclick = () => {
    return DeleteRow(key);
  };
  return btn;
}

function DeleteRow(key) {
  entries = entries.filter((data) => {
    return data.key != key;
  });
  localStorage.setItem("entries", JSON.stringify(entries));
  displayUser();
}

function next() {
  page++;
  displayUser();
}

function previous() {
  page--;
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

function resetForm() {
  document.getElementById("user_form").reset();
  resetAreaOfInterest();
}

function resetAreaOfInterest() {
  var sourceList = document.getElementById("areaOfInterestDest");
  var destinationList = document.getElementById("areaOfInterest");
  for (var i = sourceList.options.length - 1; i >= 0; i--) {
    addOption(
      destinationList,
      sourceList.options[i].value,
      sourceList.options[i].text
    );
    removeOption(sourceList, i);
  }
}

function addTo_list() {
  var sourceList = document.getElementById("areaOfInterest");
  var destinationList = document.getElementById("areaOfInterestDest");
  for (var i = sourceList.options.length - 1; i >= 0; i--) {
    if (sourceList.options[i].selected) {
      addOption(
        destinationList,
        sourceList.options[i].value,
        sourceList.options[i].text
      );
      removeOption(sourceList, i);
    }
  }
}

function addOption(selectElement, value, text) {
  var newOption = document.createElement("option");
  newOption.value = value;
  newOption.text = text;
  selectElement.add(newOption);
  // for(var i=selectElement.options.length-1;i>=0;i--){
  //   console.log(selectElement.options[i].value)
  // }
}

function removeOption(selectElement, index) {
  selectElement.remove(index);
}

function addFrom_list() {
  var sourceList = document.getElementById("areaOfInterestDest");
  var destinationList = document.getElementById("areaOfInterest");
  for (var i = sourceList.options.length - 1; i >= 0; i--) {
    if (sourceList.options[i].selected) {
      addOption(
        destinationList,
        sourceList.options[i].value,
        sourceList.options[i].text
      );
      removeOption(sourceList, i);
    }
  }
}

function setSearch() {
  searchKey = document.getElementById("filter_search").value;
  displayUser();
}
function resetSearch() {
  document.getElementById("filter_search").value = "";
  searchKey = "";
  displayUser();
}
