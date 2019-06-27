if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('./service-worker.js', { scope: './' })
    .then(function(registration) {
      console.log("Service Worker Registered");
    })
    .catch(function(err) {
      console.log("Service Worker Failed to Register", err);
    })

}



// Function to perform HTTP request
var get = function(url) {
  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var result = xhr.responseText
                result = JSON.parse(result);
                resolve(result);
            } else {
                reject(xhr);
            }
        }
    };
    
    xhr.open("GET", url, true);
    xhr.send();

  }); 
};


get('https://api.nasa.gov/planetary/apod? api_key = jRv2Ckzg3H3IF8ibZ5Hft7Lb4O24FPYVWV7voqby')
  .then(function(response) {
    // There is an issue with the image being pulled from the API, so using a different one instead
    document.getElementsByClassName('targetImage')[0].src = "https://apod.nasa.gov/apod/image/1906/NoctilucentNetherlands_Simmering_1080.jpg";

  })
  .catch(function(err) {
    console.log("Error", err);
  })



