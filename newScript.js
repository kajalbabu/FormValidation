 entries=localStorage.getItem("userData")
 entries.map((user)=>{
      let table = document.getElementById("my_table");
      let row = table.insertRow();
      let c1 = row.insertCell(0);
      let c2 = row.insertCell(1);
      let c3 = row.insertCell(2);
      let c4 = row.insertCell(3);
      c1.innerText = user.name;
      c2.innerText = user.mail;
      c3.innerText = user.phone;
      c4.innerHTML = user.age;
        })