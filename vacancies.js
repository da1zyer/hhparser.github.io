var elements = document.getElementsByClassName("header_item");
var user = document.getElementById("user");
if (sessionStorage.getItem("token") != 0){
    elements[3].style.display = "none";
    elements[4].style.display = "none";
    user.style.display = "block";
    user.style.width = "555px"
    user.innerHTML = sessionStorage.getItem("email");
}
if (Date.now() - sessionStorage.getItem("start") >= sessionStorage.getItem("time")){
    sessionStorage.setItem("token", 0)
    sessionStorage.setItem("time", 0)
    sessionStorage.removeItem("user_id")
    sessionStorage.removeItem("email")
    elements[3].style.display = "block";
    elements[4].style.display = "block";
    user.style.display = "none";
    user.innerHTML = "";
}

function check_form(el){
    if (el.value == ""){
        el.style.transition = "0.6s"
        el.style.backgroundColor = "#a11a27"
        el.style.transition = "1.2s"
        setTimeout(function() {el.style.backgroundColor = "white"}, 500)
        return true
    }
    return false
}

async function get_vacancies(){
    var flag = 0
    text = document.getElementById("vac_text");
    salary = document.getElementById("vac_salary");
    zp = document.getElementById("vac_zp");
    exp = document.getElementById("vac_exp");
    if (check_form(text)){
        flag = 1
    }
    if (check_form(salary)){
        flag = 1
    }
    if (flag == 1){
        return 0
    }
    if (salary.value == 0){
        salary = 1
    }
    else{
        salary = salary.value
    }
    let info = {
        text: text.value,
        salary: salary,
        experience: exp.value,
        only_with_salary: zp.value,
        user_id: sessionStorage.getItem("user_id")
    };
    find_button = document.getElementById("vac_search");
    find_button.innerHTML = "Подождите";
    const response = await fetch("http://127.0.0.1:8000/vacancies", {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(info)
      });
    const result = await response.json();
    if (result == "done"){
        var done = document.getElementById("vac_done");
        find_button.innerHTML = "Найти"
        var op = 0;
        while (op <= 1) {
            (function(_op) {
                setTimeout(function() { done.style.opacity = _op; }, 60 + op * 600);
            })(op);
        op += 0.1;
        }
        setTimeout(function(){done.style.opacity=0}, 3000);
    }
}
const button = document.querySelector('#vac_search');
button.addEventListener("click", get_vacancies);