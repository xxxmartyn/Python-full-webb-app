const url = "http://127.0.0.1:5000/viewProduct/";
var id = "view";

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
      if(id == "view"){
    if (request.status >= 200 && request.status < 400) {
         data.forEach((query) => {
          console.log(request.status);
          var div = document.createElement("tr");
            var mainContainer = document.getElementById(id);
          div.innerHTML = "<td>"+query.id+"</td><td><input id='name"+query.id+"' placeholder='"+query.name+"' value='"+query.name+"'/></td><td><input id='price"+query.id+"' placeholder='"+query.price+"' value='"+query.price+"'/></td><td><input id='piece"+query.id+"' placeholder='"+query.piece+"' value='"+query.piece+"'/></td>       <td><input id='description"+query.id+"' placeholder='"+query.description+"' value='"+query.description+"'/></td><td><input id='imgRoute"+query.id+"' placeholder='"+query.imgRoute+"' value='"+query.imgRoute+"'/></td> <td><img src='"+query.imgRoute+"' alt='' class='pics'></td>"   +"<button onclick = 'deleterecord("+query.id+")' type = 'submit' value='Submit'>Törlés</button>"+"<button onclick = 'update("+query.id+")'>Frisítés</button>" ;
          mainContainer.appendChild(div)
        })
      } else {
        console.log('error')
      }}
  }

async function generate_html(){
await generator(url, id);
}

function deleterecord(id){
  const data = JSON.stringify({
    id: parseInt(id)
  });
  
  navigator.sendBeacon("http://127.0.0.1:5000/deleteProduct/", data);
  console.log(data);
}

function update(id){
  
  const data = JSON.stringify({
    id: id,
    name: document.getElementById("name"+id).value,
    price: document.getElementById("price"+id).value,
    piece:document.getElementById("piece"+id).value,
    description:document.getElementById("description"+id).value,
    imgRoute:document.getElementById("imgRoute"+id).value
  });

  navigator.sendBeacon("http://127.0.0.1:5000/updateProduct/", data);
  console.log(data);
}

generate_html();