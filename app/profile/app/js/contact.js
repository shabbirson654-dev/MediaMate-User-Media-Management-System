



if (sessionStorage.getItem("user") == null) {

   window.location.replace("../../index.html");



} else {

   var current_user = sessionStorage.getItem("user");

   // add new contact coding



   var profile_pic = document.getElementById("profile_pic");

   var url = localStorage.getItem(current_user + "image");

   profile_pic.style.backgroundImage = "url(" + url + ")";

   profile_pic.style.backgroundSize = "cover";

   profile_pic.style.backgroundPosition = "center";

   var add_icon = document.getElementById("new_contact");

   add_icon.onclick = function () {

      var bg = document.getElementById("contact_bg");

      bg.style.display = "block";

   }

   var close = document.getElementById("close");

   close.onclick = function () {//close contact box

      var bg = document.getElementById("contact_bg");

      bg.style.display = "none";

   }



   // add contact in local storage

   var add = document.getElementById("add");

   add.onclick = function () {

      var c_name = document.getElementById("c_name");

      var c_num = document.getElementById("c_num");

      if (c_name.value != "" && c_num.value != "") {

         var new_contact = { name: c_name.value, number: c_num.value };

         var json_text = JSON.stringify(new_contact);

         localStorage.setItem(current_user + "_contact" + c_name.value, json_text);



      } else {

         window.alert("please enter name and phone number");

         return false;



      }

   }



   function all_contact() {

      var i;

      for (i = 0; i < localStorage.length; i++) {

         var all_keys = localStorage.key(i);

         if (all_keys.match(sessionStorage.getItem("user") + "_contact")) {

            var json_txt = localStorage.getItem(all_keys);

            var obj = JSON.parse(json_txt);





            var contact_box = document.createElement("DIV");

            contact_box.setAttribute("id", "contact");

            var name_p = document.createElement("P");

            name_p.setAttribute("class", "contact_name");



            var tool = document.createElement("DIV");

            tool.setAttribute("id", "tool");

            var edit = document.createElement("IMG");

            edit.setAttribute("src", "images/ad.png");
            edit.setAttribute("width", "37");

            edit.setAttribute("class", "ed");





            var del = document.createElement("IMG");





            del.setAttribute("src", "images/del.png");
            del.setAttribute("width", "37");

            del.setAttribute("class", "dele");

            var line = document.createElement("HR");

            line.setAttribute("color", "brown");

            line.setAttribute("width", "75%");

            line.setAttribute("size", "1");



            var num_p = document.createElement("P");

            name_p.innerHTML += obj.name;

            tool.appendChild(edit);

            tool.appendChild(del);

            num_p.innerHTML += obj.number;

            contact_box.appendChild(name_p);

            contact_box.appendChild(tool);

            contact_box.appendChild(line);

            contact_box.appendChild(num_p);

            var all_contact_box = document.getElementById("all_contact_box");

            all_contact_box.appendChild(contact_box);





         } else {



         }

      }

   }

   all_contact();

   var search = document.getElementById("search");

   search.oninput = function () {

      var all_contact_name = document.getElementsByClassName("contact_name");

      var i;

      for (i = 0; i < all_contact_name.length; i++) {

         if (all_contact_name[i].innerHTML.toUpperCase().match(search.value.toUpperCase())) {



            all_contact_name[i].parentElement.style.display = "block";

         } else {

            all_contact_name[i].parentElement.style.display = "none";

         }

      }

   }





   function del() {



      var del = document.getElementsByClassName("dele");

      var i;

      for (i = 0; i < del.length; i++) {

         del[i].onclick = function () {

            var parent = this.parentElement.parentElement;

            var p_ele = parent.getElementsByClassName("contact_name")[0];

            var username = p_ele.innerHTML;





            localStorage.removeItem(current_user + "_contact" + username);

            parent.className = "animate__animated animate__bounceOut";

            setTimeout(function () {

               parent.remove();

            }, 1000);







         }

      }

   }

   del();



   function edit() {

      var edit_icon = document.getElementsByClassName("ed");

      var i;

      for (i = 0; i < edit_icon.length; i++) {

         edit_icon[i].onclick = function () {

            var parent = this.parentElement.parentElement;

            var para = parent.getElementsByTagName("P");

            var name = para[0].innerHTML;

            var number = para[1].innerHTML;

            var c_name = document.getElementById("c_name");

            var c_num = document.getElementById("c_num");

            var add_btn = document.getElementById("new_contact");

            c_name.value = name;

            var c_heading = document.getElementById("c_heading");

            c_heading.innerHTML = "Edit Contact";

            var add = document.getElementById("add");

            add.innerHTML = "Update";

            var close = document.getElementById("close");

            close.style.display = "none";

            c_num.value = number;

            add_btn.click();

            localStorage.removeItem(current_user + "_contact" + name);

         }

      }

   }

   edit();

}