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

function create_elements(iter){
  for (let count = 0; count < iter; count++) {
    var vacancy = document.createElement("div");
    vacancy.className = "an_item";

    var an_name_el = document.createElement("div");
    var an_city_el = document.createElement("div");
    var an_salary_from_el = document.createElement("div");
    var an_salary_to_el = document.createElement("div");
    var an_url_el = document.createElement("div");
    var an_exp_el = document.createElement("div");
    var an_search_el = document.createElement("div");

    an_name_el.className = "an_item_text gr_one";
    an_city_el.className = "an_item_text gr_two";
    an_salary_from_el.className = "an_item_text gr_three";
    an_salary_to_el.className = "an_item_text gr_four";
    an_url_el.className = "an_item_text gr_five";
    an_exp_el.className = "an_item_text gr_six";
    an_search_el.className = "an_item_text gr_seven";

    an_url_url = document.createElement("a");
    an_url_url.id = "an_url_url"+count;
    an_url_url.innerHTML = "URL"
    an_url_el.appendChild(an_url_url);

    an_name_el.id = "an_name_"+count;
    an_city_el.id = "an_city_"+count;
    an_salary_from_el.id = "an_salary_from_"+count;
    an_salary_to_el.id = "an_salary_to_"+count;
    an_url_el.id = "an_url_"+count;
    an_exp_el.id = "an_exp_"+count;
    an_search_el.id = "an_search_"+count;

    vacancy.appendChild(an_name_el);
    vacancy.appendChild(an_city_el);
    vacancy.appendChild(an_salary_from_el);
    vacancy.appendChild(an_salary_to_el);
    vacancy.appendChild(an_url_el);
    vacancy.appendChild(an_exp_el);
    vacancy.appendChild(an_search_el);

    document.body.appendChild(vacancy);
  }
}


async function get_user_vacancies(){
    const response = await fetch("http://127.0.0.1:8000/getuservacs?id="+sessionStorage.getItem("user_id"), {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
          'Content-Type': 'application/json;charset=utf-8'
        },
      });
    const result = await response.json();

    create_elements(result.length)

    for (let index = 0; index < result.length; index++) {
      an_name = document.getElementById("an_name_"+index);
      an_city = document.getElementById("an_city_"+index);
      an_salary_from = document.getElementById("an_salary_from_"+index);
      an_salary_to = document.getElementById("an_salary_to_"+index);
      an_url = document.getElementById("an_url_url"+index);
      an_exp = document.getElementById("an_exp_"+index);
      an_search = document.getElementById("an_search_"+index);

      an_name.innerHTML = result[index]["name"]
      an_city.innerHTML = result[index]["city"]
      an_salary_from.innerHTML = result[index]["salary_from"]
      an_salary_to.innerHTML = result[index]["salary_to"]
      an_url.href = result[index]["url"]
      an_exp.innerHTML = result[index]["experience"]
      an_search.innerHTML = result[index]["search"]
    }
}

get_user_vacancies()