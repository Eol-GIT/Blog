var consent = getConsent() === `{"action":"accept","categories":"[\\"targeting\\"]"}`
eventBus.$on("changeConsent", (newValue) => {
    consent = newValue;
});
var a = document.getElementById('home'); 
a.href = "/#projects";
if (localStorage.getItem("theme") && localStorage.getItem("theme") === 'dark'){
    body = document.querySelector('#body');
    body.classList.add("dark-mode-body");
    document.querySelector('.fa-sun').style.display = "none";
}else {
    if (consent){
        localStorage.setItem("theme", "light");
    }
    document.querySelector('.fa-moon').style.display = "none";
}
function darkModeToggle(){
    if (localStorage.getItem("theme") === 'dark'){
        if (consent){
            localStorage.setItem("theme", "light");
        }
        body = document.querySelector('#body');
        body.classList.remove("dark-mode-body");
        document.querySelector('.fa-sun').style.display = "block";
        document.querySelector('.fa-moon').style.display = "none";
    }else {
        if (consent){
            localStorage.setItem("theme", "dark");
        }
        body = document.querySelector('#body');
        body.classList.add("dark-mode-body");
        document.querySelector('.fa-sun').style.display = "none";
        document.querySelector('.fa-moon').style.display = "block";
    }
}
function projectRedirect(url) {
    window.location.replace(url)
}

// Enable tooltips
document.addEventListener("DOMContentLoaded", function(){
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(element){
        new bootstrap.Tooltip(element, {
            delay: {show: 500, hide: 0}
        });
        return new bootstrap.Tooltip(element);
    });
});