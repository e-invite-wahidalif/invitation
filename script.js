getWishes();

function getWishes() {
    fetch("https://script.google.com/macros/s/AKfycbyzP2HAbW6uRkNY7nFdfYIXZdLYTplcz0v6rTyLZrgAPpyvgn7janNIEWRv5_dyHCnyiA/exec", {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        $('#totalGuests').html('');

        $('#totalGuests').append('<h2>'+data['totalGuests']+'</h2>');

        $('#wishlists').html('');

        for(var wish in data['wishes']) {
            $('#wishlists').append('<h2>'+data['wishes'][wish]+'</h2>');
        }
        
        console.log(data['wishes']);
    })
    .catch(error => console.error(error));
}

document.getElementById("rsvpForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var form = event.target;
    var formData = new FormData(form);
    
    fetch("https://script.google.com/macros/s/AKfycbyzP2HAbW6uRkNY7nFdfYIXZdLYTplcz0v6rTyLZrgAPpyvgn7janNIEWRv5_dyHCnyiA/exec", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        form.reset();
        getWishes();
    })
    .catch(error => console.error(error));
});

document.addEventListener("DOMContentLoaded", function() {
    var decreaseButton = document.getElementById("decreaseGuests");
    var increaseButton = document.getElementById("increaseGuests");
    var guestsInput = document.getElementById("guests");

    decreaseButton.addEventListener("click", function() {
        var currentGuests = parseInt(guestsInput.value);
        if (currentGuests > 0) {
            guestsInput.value = currentGuests - 1;
        }
    });

    increaseButton.addEventListener("click", function() {
        var currentGuests = parseInt(guestsInput.value);
        if (currentGuests < 4) {
            guestsInput.value = currentGuests + 1;
        }
    });
});

function updateWishes() {
    fetch("https://script.google.com/macros/s/AKfycbyzP2HAbW6uRkNY7nFdfYIXZdLYTplcz0v6rTyLZrgAPpyvgn7janNIEWRv5_dyHCnyiA/exec?action=getWishes")
    .then(response => response.json())
    .then(data => {
        var wishesList = document.getElementById("wishesList");
        wishesList.innerHTML = "";
        data.forEach(wish => {
            var li = document.createElement("li");
            li.textContent = wish;
            wishesList.appendChild(li);
        });
    })
    .catch(error => console.error(error));
}

function updateTotalGuests() {
    fetch("https://script.google.com/macros/s/AKfycbyzP2HAbW6uRkNY7nFdfYIXZdLYTplcz0v6rTyLZrgAPpyvgn7janNIEWRv5_dyHCnyiA/exec?action=getTotalGuests")
    .then(response => response.text())
    .then(data => {
        document.getElementById("totalGuests").textContent = data;
    })
    .catch(error => console.error(error));
}