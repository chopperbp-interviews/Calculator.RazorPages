document.addEventListener("DOMContentLoaded", () => {
    updateDisplay();
    document.addEventListener("keydown", handleKeypress);
});
const calculator = {
    displayValue: '0',
    operator: null,
};
function handleKeypress(event) {
    const { key } = event;
    const element = document.querySelector(`button[value="${key}"]`);
    if (element) {
        element.classList.add('button-active');
        setTimeout(() => { element.classList.remove('button-active'); }, 100);
        element.click();
    }
}

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}
