const redButton = document.querySelector('.button1');

redButton.addEventListener('click', () => {

    const mainButton = document.querySelector('.button1');
    const buttonsContainer = document.querySelector('.container2');
    let isExpanded = false;

    mainButton.addEventListener("click", function () {
        isExpanded = !isExpanded;
        buttonsContainer.style.display = isExpanded ? "flex" : "none";
    });
});

