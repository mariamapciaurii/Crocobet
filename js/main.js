// Get Users Name From Jsonplaceholder//

fetch('https://jsonplaceholder.typicode.com/users')
.then(function (response) {
    return response.json();
})
.then(function (data) {
    appendData(data);
})
.catch(function (err) {
    console.log('error: ' + err);
});

//Append User Names  In Buttoms//
function appendData(data) {
    let mainContainer = document.getElementById("users");

    for (var i = 0; i < data.length; i++) {
        var button = document.createElement("button");
        button.innerHTML =  data[i].name;
        button.classList.add('item');
        button.dataset.userId = data[i].id;
        // button.addEventListener('click', (event) => getUsers(event))
        mainContainer.appendChild(button);
    }
}


