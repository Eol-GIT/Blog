function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function toggleButtonsAndInputs(val){
    const buttons = document.querySelectorAll('button');
    const inputs = document.querySelectorAll('input');
    buttons.forEach(function(button) {
        button.disabled = val;
    });
    inputs.forEach(function(input) {
        input.disabled = val;
    });
}
