const url = "http://127.0.0.1:5000/viewProduct/";
var id = "viewMain";

async function generator(url, id) {
    var request = await new XMLHttpRequest()

request.open('GET', url, true)
request.onload = function () {
  var data = JSON.parse(this.response)
view(data, request, id);

}

request.send()
  }

  function view(data, request, id){
      if(id == "viewMain"){
    if (request.status >= 200 && request.status < 400) {
         data.forEach((query) => {
          console.log(request.status);
          var storage = query.piece > 0 ? "Raktáron" : "Nincs Raktáron";
          var div = document.createElement("div");
          var mainContainer = document.getElementById(id);
          div.innerHTML = "<div class='Container'> <h3>"+query.name+"</h3>  <p>"+query.description+"</p>  <p>Ár: "+query.price+" Ft/kg</p> <p>"+storage+"</p> <img src='"+query.imgRoute+"' alt=''> </div>"
          //div.appendChild(nameP)
          mainContainer.appendChild(div)
        })
      } else {
        console.log('error')
      }}
  }

async function generate_html(){
await generator(url, id);
}

generate_html();