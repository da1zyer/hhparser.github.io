
async function login(){
    email = document.getElementById("login_form_email").value;
    password = document.getElementById("login_form_pass").value;
    let info = {
        email: email,
        password: password
    };
    const response = await fetch("http://127.0.0.1:8000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(info)
      });
    const result = await response.json();
    if (result == "error"){
        alert("Неправильный email или пароль")
    }
    else{
        try {
            if(result["detail"][0]["type"] == "value_error"){
                alert("Неправильно введен Email");
            }
        }
        catch (err){
            sessionStorage.setItem("start", Date.now())
            token = result["access_token"];
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("time", result["time"] * 1000);
            sessionStorage.setItem("email", result["email"]);
            let response = await fetch('http://127.0.0.1:8000/getuserid?email='+result["email"]);
            let text = await response.json();
            sessionStorage.setItem("user_id", text[0]);
            window.location.href = "vacancies.html";
        }
    }
}
const button_2 = document.getElementById("login_button");
button_2.addEventListener("click", login);