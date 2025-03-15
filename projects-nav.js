let carouselIndex = 0;
let carouselHeaders = ["Game Projects", "Web Projects"];
let carouselNames = ["Game Projects", "Web Projects"];
let carouselIcons = ["fa-solid fa-gamepad", "fa-solid fa-window-maximize"];

$(document).ready(function () {   
    carouselIndex = getCarouselIndex();

    carouselScrollHandler();
    assignCarouselNavEvents();
    scrollToCarousel(carouselIndex);
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
    const carouselView = document.getElementById("carousel-view");
    const carousels = carouselView.children;

    const windowWidth = $(window).width();
    // How far away from the screen edge to trigger our scroll
    const distanceFromEdge = 200;

    // Get the mouse position while it's over our element
    $(".projectCarousel").on("mousemove", function (e) {
        const mouseX = e.pageX;
        // If it gets within x distance from the left, scroll left
        if (mouseX < distanceFromEdge) {
            carousels[carouselIndex].scrollLeft -= 40;
        }

        // If it gets within x distance from the right, scroll right
        if (mouseX > windowWidth - distanceFromEdge) {
            carousels[carouselIndex].scrollLeft += 40;
        }
    });
}

function getCarouselIndex() {
    // is localStorage available?
    if (typeof window.localStorage != 'undefined') {
        // retrieve
        let i = localStorage.getItem('carouselIndex');
        //if null set to 0
        if (!i) {
            i = 0;
        };
        //if out of range, reset to 0
        if (i < 0 || i > maximumCarouselIndex()) {
            console.log(i);
            i = 0;           
        }
        updateLocalStorage(i);
        return parseInt(i);
    }
    return 0;
}

function assignCarouselNavEvents() {
    const carouselDownButton = document.getElementById("carousel-chevron-down");
    const carouselUpButton = document.getElementById("carousel-chevron-up");

    carouselDownButton.onclick = () => { carouselDown(); }
    carouselUpButton.onclick = () => { carouselUp(); }
}

function carouselDown() {
    carouselIndex += 1;
    updateLocalStorage(carouselIndex);
    scrollToCarousel(carouselIndex);
}

function carouselUp() {
    carouselIndex -= 1;
    updateLocalStorage(carouselIndex);
    scrollToCarousel(carouselIndex);
}

function updateLocalStorage(newIndex) {
    // is localStorage available?
    if (typeof window.localStorage != 'undefined') {
        localStorage.setItem('carouselIndex', newIndex.toString());
        console.log("updating carousel Index to " + newIndex);
    }
}

function scrollToCarousel(index) {
    const carouselView = document.getElementById("carousel-view");
    const carousels = carouselView.children;
    
    //carouselView.scroll(0, carousels[index].getBoundingClientRect().top);
    setTimeout(() => {
        carousels[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }, 100);

    carousels[index].scrollLeft = 0;

    setCarouselHeader();
    chevronToggleCheck();
    setChevronNames();
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
        carouselUpButton.style.display = "flex";
    }

    //If index is maximum, we can't go any further down.
    if (carouselIndex == maximumCarouselIndex()) {
        carouselDownButton.style.display = "none";
    }
    else {
        carouselDownButton.style.display = "flex";
    }
}

function maximumCarouselIndex() {
    const carouselView = document.getElementById("carousel-view");
    const carousels = carouselView.children;

    return carousels.length - 1;
}

function setChevronNames() {
    const chevronUpName = document.getElementById("chevron-up-name");
    const chevronDownName = document.getElementById("chevron-down-name");

    if (carouselIndex > 0) {
        chevronUpName.textContent = carouselNames[carouselIndex - 1];
    }

    if (carouselIndex < maximumCarouselIndex()) {
        chevronDownName.textContent = carouselNames[carouselIndex + 1];
    }
}