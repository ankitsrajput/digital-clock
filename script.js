// Watch

let time = document.getElementById("time");
let dat = document.getElementById("date");

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


let clock = () => {
    let date = new Date();

    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    const ampm = hr >= 12 ? 'PM' : 'AM';
    hr = hr % 12;
    hr = hr ? hr : 12; // the hour '0' should be '12'

    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    let dt = date.getDate();
    let yr = date.getFullYear();

    time.innerHTML = String(hr).padStart(2, '0') + ":" + String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0') + " " + ampm;

    dat.innerHTML = `${dt} ${month}, ${yr}, ${day}`;
}

setInterval(()=>{
    // console.clear();
    clock();
}, 1000);

// Dark Mode
let darkMode = document.getElementById("dark-mode");
let body = document.body;

darkMode.addEventListener("click", ()=>{
    body.classList.toggle("dark-mode");

    if(body.classList.contains("dark-mode")){
        darkMode.innerText = "Light Mode";
    } else{
        darkMode.innerText = "Dark Mode";
    }
});

