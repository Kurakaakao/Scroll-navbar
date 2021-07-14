// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();
// ********** close links ************
const links = document.querySelector(".links");
const linksCont = document.querySelector(".links-container");
const navToggle = document.querySelector(".nav-toggle");

navToggle.addEventListener("click", function() {
    //linksCont.classList.toggle("show-links"); Very static solution, has no scaling. Not recommendable
    const contHeight = linksCont.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    if (contHeight === 0) {
        linksCont.style.height = `${linksHeight}px`;
    } else {
        linksCont.style.height = 0;
    }
});

// ********** fixed navbar ************
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function() {
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;
    if (scrollHeight > navHeight) {
        navbar.classList.add("fixed-nav");
    } else {
        navbar.classList.remove("fixed-nav");
    }

    if (scrollHeight > 300) {
        topLink.classList.add("show-link");
    } else {
        topLink.classList.remove("show-link");
    }
});
// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach(function(link) {
    link.addEventListener("click", function(e) {
        // Prevent default
        e.preventDefault();
        const hrefID = e.currentTarget.getAttribute("href").slice(1);   // Slice(1) removes first letter in the string and passes the rest (skips # from #href value)
        const element = document.getElementById(hrefID);                // Fetch the document of slices href value

        const navHeight = navbar.getBoundingClientRect().height;
        const contHeight = linksCont.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains("fixed-nav");
        let pos = element.offsetTop - navHeight;                                    // pos = creates an offset, so the title gets shown on position change
        if (!fixedNav) {
            pos = pos - navHeight;
        }
        if (navHeight > 82) {
            pos = pos + contHeight;
        }

        window.scrollTo({
            left: 0, 
            top: pos,
        });
        linksCont.style.height = 0; // Hides links bar when a link has been clicked
    });
});