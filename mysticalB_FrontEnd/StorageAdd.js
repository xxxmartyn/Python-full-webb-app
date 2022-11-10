const url = 'http://127.0.0.1:5000/savedetailsProduct/'

function sendPost(){
    const data = JSON.stringify({
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        piece:document.getElementById("piece").value,
        description:document.getElementById("description").value,
        imgRoute:document.getElementById("imgRoute").value
      });
      
      navigator.sendBeacon(url, data);
      console.log(data);
    }