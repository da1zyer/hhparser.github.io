myStorage = window.sessionStorage;
sessionStorage.setItem("token", 0)

async function signup(){
    email = document.getElementById("signup_form_email").value;
    login = document.getElementById("signup_form_login").value;
    password = document.getElementById("signup_form_pass").value;
    let info = {
        email: email,
        login: login,
        password: password
    };
    const response = await fetch("http://localhost:8000/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(info)
      });
    const result = await response.json();
    if (result == "Already Exist"){
        alert("Такой пользователь уже существует")
    }
    else{
        try {
            if(result["detail"][0]["type"] == "value_error"){
                alert("Неправильно введен Email");
            }
        }
        catch (err){
            sessionStorage.setItem("start", Date.now());
            token = result["access_token"];
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("time", result["time"] * 1000);
            sessionStorage.setItem("email", result["email"]);
            let response = await fetch('http://localhost:8000/getuserid?email='+result["email"]);
            let text = await response.json();
            sessionStorage.setItem("user_id", text[0]);
            window.location.href = "vacancies.html";
        }
    }
};
const button = document.querySelector('#signup_button');
button.addEventListener("click", signup);
