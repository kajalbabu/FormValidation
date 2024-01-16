// const entries=[];
// var user_count=0;

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode < 48 || charCode > 57) {
      return false;
    }
    return true;
  }

  function allowOnlyLetters(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode !== 32) {
      return false;
    }
    return true;
  }

    function formSubmission() {
      let table = document.getElementById("my_table");
      let row = table.insertRow();
      let c1 = row.insertCell(0);
      let c2 = row.insertCell(1);
      let c3 = row.insertCell(2);
      let c4 = row.insertCell(3);
      c1.innerText = document.getElementById("user_name").value;
      c2.innerText = document.getElementById("user_mail").value;
      c3.innerText = document.getElementById("user_phone").value;
      c4.innerHTML = document.getElementById("user_age").value;
      // const user_obj={}
      // user_obj.name = document.getElementById("user_name").value;
      // user_obj.mail = document.getElementById("user_mail").value;
      // user_obj.phone = document.getElementById("user_phone").value;
      // user_obj.age = document.getElementById("user_age").value; 
    // if(user_count<5){
    //   let table = document.getElementById("my_table");
    //   let row = table.insertRow();
    //   let c1 = row.insertCell(0);
    //   let c2 = row.insertCell(1);
    //   let c3 = row.insertCell(2);
    //   let c4 = row.insertCell(3);
    //   c1.innerHTML=user_obj.name;
    //   c2.innerHTML=user_obj.mail;
    //   c3.innerHTML=user_obj.phone;
    //   c4.innerHTML=user_obj.age;
    // } 
    // if(user_count==5){
    //   event.preventDefault()
    //   var element=document.getElementById("pagination")
    //   element.classList.add("display_pagination");

    // }
    // user_count++;
    // entries.push(user_obj);
   
        //document.getElementById("user_form").reset();
    }
    
    // function displayUser(){
    //   // localStorage.setItem("userData",entries)
    //   //window.location.href="newPage.html";

    //   entries.map((user)=>{
    //   let table = document.getElementById("my_table");
    //   let row = table.insertRow();
    //   let c1 = row.insertCell(0);
    //   let c2 = row.insertCell(1);
    //   let c3 = row.insertCell(2);
    //   let c4 = row.insertCell(3);
    //   c1.innerText = user.name;
    //   c2.innerText = user.mail;
    //   c3.innerText = user.phone;
    //   c4.innerHTML = user.age;
    //     })
    //   window.location.href="newPage.html";
    // }
  
    document.getElementById("user_age").addEventListener("change", function() {
      let v = parseInt(this.value);
      if (v < 18){
        alert("Age should be greater than 17.");
        this.value = "";
      } 
      if (v > 120){
        alert("Age should be less than 120.");
        this.value = "";
      } 
    });

      // function goBack(){
      //   window.location.href="index.html";
      // }

   