var entries = localStorage.getItem("entries")
  ? JSON.parse(localStorage.getItem("entries"))
  : [];
var searchCol = "";
var selectCol = "Name";
var searchKey = "";
var pageData = [];
var page = 1;
var limit = 6;
//var key = 1;
var edit = false;
var editIndex = -1;
var editKey = -1;
var cPrev = -1;
sortKey = "Time";
sortDir = 0;

//Phone Number Validation
function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode < 48 || charCode > 57) {
    return false;
  }
  return true;
}

//Name Field Validaion
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

//Age Validation
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

//Add To Area of Intereset
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
}
function removeOption(selectElement, index) {
  selectElement.remove(index);
}

//Add From Area of Interest
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

//Submit Form
function formSubmission() {
  var interested = document.getElementById("areaOfInterestDest");
  if (interested.options.length < 1) {
    alert("Please select at least one interest in the destination.");
    return;
  }

  if (edit == true) {
    editFormSubmission();
  } else {
    newFormSubmission();
  }
}

//New Form
function newFormSubmission() {
  const user_obj = {};
  if (entries.length > 0) {
    const highestKey = Math.max(...entries.map((obj) => obj.key));
    user_obj.key = highestKey + 1;
    // user_obj.key = entries[0].key + 1;
  } else {
    user_obj.key = 1;
  }
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
  const t = new Date();
  user_obj.time = t.toLocaleTimeString();
  entries.unshift(user_obj);
  displayUser();
  localStorage.setItem("entries", JSON.stringify(entries));
  resetForm();
}

//Edit Form
function editFormSubmission() {
  const user_obj = {};
  user_obj.key = editKey;
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
  const t = new Date();
  user_obj.time = t.toLocaleTimeString();
  entries.splice(editIndex, 1, user_obj);
  edit = false;
  displayUser();
  localStorage.setItem("entries", JSON.stringify(entries));
  resetForm();
}

//Reset Form
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

//Show or Hide button
function toggleTableVisibility() {
  var shbutton = document.getElementById("showTableButton");
  let table = document.getElementById("table_content");
  if (table.style.display == "none") {
    table.style.display = "block";
    shbutton.innerText = "Hide";
    sortKey = "Time";
    sortDir = 0;
    resetColumnSearch();
    document.getElementById("filter_search").value = "";
    searchKey = "";
    pageData = [];
    document.getElementById("limitSelect").value = 6;
    page = 1;
    limit = 6;
    displayUser();
  } else {
    table.style.display = "none";
    shbutton.innerText = "Show";
  }
}

// Search For Filter
function setSearch() {
  searchKey = document.getElementById("filter_search").value;
  resetColumnSearch();
  displayUser();
}

//Search Column
function searchColumn(column) {
  if (selectCol != column) {
    resetColumnSearch();
  }
  selectCol = column;
  searchCol = document
    .getElementById(`${column.toLowerCase()}-column-search`)
    .value.toLowerCase();
  displayUser();
}

//No of items in a page
function changeLimit() {
  limit = document.getElementById("limitSelect").value;
  page = 1;
  resetColumnSearch();
  displayUser();
}

//Next Page button
function next() {
  console.log(selectCol);
  resetColumnSearch();
  page++;
  displayUser();
}

//Previous Page Button
function previous() {
  resetColumnSearch();
  page--;
  displayUser();
}

//Edit Button
function createEditButton(user) {
  var btn = document.createElement("button");
  btn.key = user.key;
  btn.className = "delete_button";
  btn.innerText = "Edit";
  btn.onclick = () => {
    return editRow(user);
  };
  return btn;
}

function editRow(user) {
  edit = true;
  editIndex = entries.indexOf(user);
  editKey = user.key;

  document.getElementById("user_name").value = user.name;
  document.getElementById("user_mail").value = user.mail;
  document.getElementById("user_phone").value = user.phone;
  document.getElementById("user_age").value = user.age;

  if (user.gender == "male") {
    document.getElementById("male").checked = true;
  } else {
    document.getElementById("female").checked = true;
  }
  var areaOfInterestDest = document.getElementById("areaOfInterestDest");
  var areaOfInterest = document.getElementById("areaOfInterest");
  // areaOfInterestDest.innerHTML='';
  user.interest.map((interest) => {
    addOption(areaOfInterestDest, interest, interest);
    for (var i = areaOfInterest.options.length - 1; i >= 0; i--) {
      if (interest == areaOfInterest.options[i].value) {
        removeOption(areaOfInterest, i);
      }
    }
  });
}

//Delete Button
function createDeleteButton(key) {
  var btn = document.createElement("button");
  btn.key = key;
  btn.className = "delete_button";
  btn.innerText = "Delete";
  btn.onclick = () => {
    if (confirm("Do you really want to delete?")) return deleteRow(key);
  };
  return btn;
}

function deleteRow(key) {
  entries = entries.filter((data) => {
    return data.key != key;
  });
  localStorage.setItem("entries", JSON.stringify(entries));
  displayUser();
}

//Reset Column
function resetColumnSearch() {
  document.getElementById(`${selectCol.toLowerCase()}-column-search`).value =
    "";
  searchCol = "";
}

//Filter Data
function filterData(data) {
  if (searchKey == "") {
    return data;
  } else {
    return data.filter((item) => {
      page = 1;
      return (
        item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
        item.age.toString().includes(searchKey.toLowerCase()) ||
        item.mail.includes(searchKey.toLowerCase()) ||
        item.phone.toString().includes(searchKey.toLowerCase()) ||
        item.interest
          .toString()
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        item.gender.includes(searchKey.toLowerCase())
      );
    });
  }
}

//Filter Page
function filterPage(data) {
  if (searchCol == "") {
    return data;
  } else {
    return data.filter((item) => {
      switch (selectCol) {
        case "Name":
          return item.name.toLowerCase().includes(searchCol.toLowerCase());
          break;
        case "Email":
          return item.mail.toLowerCase().includes(searchCol.toLowerCase());
          break;
        case "Phone":
          return item.phone.toLowerCase().includes(searchCol.toLowerCase());
          break;
        case "Age":
          return item.age.toLowerCase().includes(searchCol.toLowerCase());
          break;
        case "Gender":
          return item.gender.toLowerCase().startsWith(searchCol.toLowerCase());
          break;
        case "Interest":
          return item.interest
            .toString()
            .toLowerCase()
            .includes(searchCol.toString().toLowerCase());
          break;
        case "Time":
          return item.time.toLowerCase().startsWith(searchCol.toLowerCase());
          break;
        default:
          break;
      }
    });
  }
}
//Show Data in Table
function displayUser() {
  let table = document.getElementById("table_body");
  table.innerHTML = "";
  //var filteredData = filterData(entries);
  var GlobalFilteredData = filterData(entries);
  var sortedData = sortData(sortKey, sortDir, GlobalFilteredData);

  pageData = sortedData.slice(limit * (page - 1), limit * page);
  var filteredData = filterPage(pageData);
  filteredData.map((user, index) => {
    let row = table.insertRow();
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    let c5 = row.insertCell(4);
    let c6 = row.insertCell(5);
    let c7 = row.insertCell(6);
    let c8 = row.insertCell(7);
    c1.innerHTML = user.name;
    c2.innerHTML = user.mail;
    c3.innerHTML = user.phone;
    c4.innerHTML = user.age;
    c5.innerHTML = user.gender;
    c6.innerHTML = user.interest;
    c7.appendChild(createEditButton(user));
    c7.appendChild(createDeleteButton(user.key));
    c8.innerHTML = user.time;
  });
  cPrev = -1;
  let nextButton = document.getElementById("nextButton");
  let prevButton = document.getElementById("prevButton");

  if (GlobalFilteredData.length > limit * page) {
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

//Sort Array by Column
function sortArray(key) {
  if (key == sortKey) {
    if (sortDir) {
      sortDir = 0;
    } else {
      sortDir = 1;
    }
  } else {
    sortKey = key;
    sortDir = 1;
  }
  displayUser();
}

//Sorting by default
function sortData(key, dir, data) {
  switch (key) {
    case "Name":
      return data.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          if (dir) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (dir) {
            return 1;
          } else {
            return -1;
          }
        }
      });
      break;
    case "Email":
      return data.sort((a, b) => {
        if (a.mail.toLowerCase() < b.mail.toLowerCase()) {
          if (dir) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (dir) {
            return 1;
          } else {
            return -1;
          }
        }
      });
      break;
    case "Phone":
      return data.sort((a, b) => {
        if (a.phone.toString() < b.phone.toString()) {
          if (dir) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (dir) {
            return 1;
          } else {
            return -1;
          }
        }
      });
      break;
    case "Age":
      return data.sort((a, b) => {
        if (a.age < b.age) {
          if (dir) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (dir) {
            return 1;
          } else {
            return -1;
          }
        }
      });
      break;
    case "Gender":
      return data.sort((a, b) => {
        if (a.gender.toLowerCase() < b.gender.toLowerCase()) {
          if (dir) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (dir) {
            return 1;
          } else {
            return -1;
          }
        }
      });
      break;
    case "Interest":
      return data.sort((a, b) => {
        if (
          a.interest.toString().toLowerCase() <
          b.interest.toString().toLowerCase()
        ) {
          if (dir) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (dir) {
            return 1;
          } else {
            return -1;
          }
        }
      });
      break;
    case "Time":
      return data.sort((a, b) => {
        if (a.time < b.time) {
          if (dir) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (dir) {
            return 1;
          } else {
            return -1;
          }
        }
      });
      break;
    default:
      break;
  }
}

//Sorting by columns
// function sortCol(c) {
//   rows = document.getElementById("my_table").rows.length-1;
//   columns = document.getElementById("my_table").rows[0].cells.length;
//   arrTable = [...Array(rows)].map((e) => Array(columns));

//   for (ro = 0; ro < rows; ro++) {
//     for (co = 0; co < columns; co++) {
//       arrTable[ro][co] =
//         document.getElementById("my_table").rows[ro].cells[co].innerHTML;
//     }
//   }

//   th = arrTable.shift();

//   if (c !== cPrev) {
//     arrTable.sort(function (a, b) {
//       const val1 = a[c].toLowerCase();
//       const val2 = b[c].toLowerCase();
//       if (a[c] === b[c]) {
//         return 0;
//       } else {
//         return val1 > val2 ? -1 : 1;
//       }
//     });
//   } else {
//     arrTable.reverse();
//   }
//   cPrev = c;
//   arrTable.unshift(th);
//   for (ro = 0; ro < rows; ro++) {
//     for (co = 0; co < columns; co++) {
//       document.getElementById("my_table").rows[ro].cells[co].innerHTML =
//         arrTable[ro][co];
//     }

//   }
// }
