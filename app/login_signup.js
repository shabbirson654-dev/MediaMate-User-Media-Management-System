//start signup coding

var signup_frm = document.getElementById("signup_frm");

signup_frm.onsubmit = function () {

    var user = btoa(document.getElementById("username").value);

    var email = btoa(document.getElementById("email").value);

    var phone = btoa(document.getElementById("phone").value);

    var pass = btoa(document.getElementById("password").value);

    var user_object_data = { username: user, email: email, phone: phone, password: pass };

    var user_text_data = JSON.stringify(user_object_data);



    if (user != "" && email != "" && phone != "" && pass != "") {

        localStorage.setItem(email, user_text_data);

        var signup_btn = document.getElementById("signup_btn");

        signup_btn.style.background = "#14b129";

        signup_btn.innerHTML = "✔ Sign up Successful !";

        setTimeout(function () {



            signup_btn.style.background = "yellow";

            signup_btn.innerHTML = "Sign up";
            var warning = document.getElementById("notice");
            warning.innerHTML = " ";


            signup_frm.reset();

        }, 3000)

        return false;

    }



}

//stat email validation

var email_input = document.getElementById("email");





email_input.onchange = function () {

    var email = btoa(document.getElementById("email").value);

    var warning = document.getElementById("email_notice");

    var signup_btn = document.getElementById("signup_btn");

    if (localStorage.getItem(email) != null) {

        warning.style.display = "block";

        email_input.style.borderBottomColor = "red";

        signup_btn.disabled = true;

        signup_btn.style.background = "#ccc";

        email_input.onclick = function () {

            email_input.value = "";

            warning.style.display = "none";

            email_input.style.borderBottomColor = "#ccc";

            signup_btn.disabled = false;

            signup_btn.style.background = " yellow";

        }



    }

}

//end email validation coding
var passw = document.getElementById("password");
passw.onchange = function () {

    var capital = /[A-Z]/g;
    var small = /[a-z]/g;
    var number = /[0-9]/g;
    var special = /[!@#$%^&*(),.?":{}|<>_+\-=\[\]]/;


    var password_value = document.getElementById("password").value;
	if ((password_value.length) < 10) {
    warning.innerHTML = "Weak: Password must be at least 10 characters long.";
    warning.style.color = "red";
} 
    else if ( password_value.match(capital) && password_value.match(small) && password_value.match(number) && password_value.match(special)) {
        var warning = document.getElementById("notice");
        warning.innerHTML = "Strong Password";
        warning.style.color = "green";
    }

    else {

        var warning = document.getElementById("notice");
        warning.innerHTML = "Weak Password";
        warning.style.color = "red";
        passw.style.borderBottomColor = "red";
        var btn = document.getElementById("signup_btn");
        btn.disabled = true;

        btn.style.background = "#ccc";

        passw.onclick = function () {

            passw.value = "";

            warning.innerHTML = " ";

            passw.style.borderBottomColor = "#ccc";

            btn.disabled = false;

            btn.style.background = " yellow";

        }
    }
}



//start login coding



var login_frm = document.getElementById("login_frm");

login_frm.onsubmit = function () {

    var email = document.getElementById("login_email");

    var password = document.getElementById("login_password");

    var login_email_war = document.getElementById("login_email_warning");

    var login_password_war = document.getElementById("login_password_warning");

    if (localStorage.getItem(btoa(email.value)) == null) {



        login_email_war.style.display = "block";

        email.style.borderBottomColor = "red";

        email.onclick = function () {

            email.value = "";

            login_email_war.style.display = "none";

            email.style.borderBottomColor = "#ccc";

        }

    } else {

        var text_data = localStorage.getItem(btoa(email.value));

        var obj_data = JSON.parse(text_data);

        var correct_email = obj_data.email;

        var correct_password = obj_data.password;

        if (btoa(email.value) == correct_email) {

            if (btoa(password.value) == correct_password) {

                sessionStorage.setItem("user", btoa(email.value));

                window.location.replace("profile/pre_profile.html")

            } else {

                login_password_war.style.display = "block";

                password.style.borderBottomColor = "red";

                password.onclick = function () {

                    password.value = "";

                    login_password_war.style.display = "none";

                    password.style.borderBottomColor = "#ccc";

                }

            }

        }

    }

    return false;

}