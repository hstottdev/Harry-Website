let carouselIndex = 0;
let carouselHeaders = ["Games", "Websites"];
let carouselIcons = ["fa-solid fa-gamepad", "fa-solid fa-window-maximize"];

$(document).ready(function () {
    carouselScrollHandler();
    assignCarouselVariables();
    assignCarouselNavEvents();
    scrollToCarousel(carouselIndex);
    //setInterval(updateCarouselScroll, 1000);
})

function updateCarouselScroll() {
    scrollToCarousel(carouselIndex);
}

//update carousel scroll when resizing the window
window.addEventListener('resize', function (event) {
    updateCarouselScroll();
}, true);


//handles horizontal scrolling along projects
function carouselScrollHandler() {
    const el = document.getElementsByClassName("projectCarousel");

    const windowWidth = $(window).width();
    // How far away from the screen edge to trigger our scroll
    const distanceFromEdge = 200;

    // Get the mouse position while it's over our element
    $(".projectCarousel").on("mousemove", function (e) {
        const mouseX = e.pageX;
        // If it gets within x distance from the left, scroll left
        if (mouseX < distanceFromEdge) {
            el[0].scrollLeft -= 40;
        }

        // If it gets within x distance from the right, scroll right
        if (mouseX > windowWidth - distanceFromEdge) {
            el[0].scrollLeft += 40;
        }
    });
}

function assignCarouselVariables() {
    const carouselView = document.getElementById("carousel-view");
    const carousels = carouselView.children;
    carouselIndex = 0;
}

function assignCarouselNavEvents() {
    const carouselDownButton = document.getElementById("carousel-chevron-down");
    const carouselUpButton = document.getElementById("carousel-chevron-up");

    carouselDownButton.onclick = () => { carouselDown(); }
    carouselUpButton.onclick = () => { carouselUp(); }
}

function carouselDown() {
    carouselIndex += 1;
    scrollToCarousel(carouselIndex);
}

function carouselUp() {
    carouselIndex -= 1;
    scrollToCarousel(carouselIndex);
}

function scrollToCarousel(index) {
    const carouselView = document.getElementById("carousel-view");
    const carousels = carouselView.children;

    
    //carouselView.scroll(0, carousels[index].getBoundingClientRect().top);
    carousels[index].scrollIntoView({ behavior: 'smooth'});
    carousels[index].scrollLeft = 0;
    console.log("index: " + index);
    console.log(carousels[index].getBoundingClientRect().top);

    setCarouselHeader();
    chevronToggleCheck();
}

function setCarouselHeader() {
    const carouselHeaderText = document.getElementById("carousel-header").children[0];
    //clear header first
    carouselHeaderText.textContent = "";

    //create icon
    icon = document.createElement("i");
    icon.className = carouselIcons[carouselIndex];

    //add icon and text
    carouselHeaderText.append(icon, carouselHeaders[carouselIndex]);
}

function chevronToggleCheck() {
    carouselDownButton = document.getElementById("carousel-chevron-down");
    carouselUpButton = document.getElementById("carousel-chevron-up");
    //If index is 0, we can't go any further up.
    if (carouselIndex == 0) {
        carouselUpButton.style.display = "none";
    }
    else {
        carouselUpButton.style.display = "block";
    }

    //the down button is harder, we need to figure out the maximum index first
    const carouselView = document.getElementById("carousel-view");
    const carousels = carouselView.children;
    const maximumCarouselIndex = carousels.length - 1;

    //If index is maximum, we can't go any further down.
    if (carouselIndex == maximumCarouselIndex) {
        carouselDownButton.style.display = "none";
    }
    else {
        carouselDownButton.style.display = "block";
    }

}