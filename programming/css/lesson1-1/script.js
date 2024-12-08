function checkVisibility() {
    const elements = document.querySelectorAll('.talk');
    
    elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkVisibility);
document.addEventListener('DOMContentLoaded', checkVisibility);

const returnBtn = document.querySelector(".returnBtn").addEventListener("click", () => {
    window.location.href = "https://mysite.f5.si/programming";
})
const nextBtn = document.querySelector(".nextBtn").addEventListener("click", () => {
    window.location.href = "https://mysite.f5.si/programming/html/lesson1-2";
})
