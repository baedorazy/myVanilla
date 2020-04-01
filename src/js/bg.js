(function() {
    const body = document.querySelector("body");
    const IMG_NUMBER = 3;
    
    function handleImageLoad() {
        console.log("Finished.");
    }
    function paintImage(_num) {
        const image = new Image();
        image.src = `./dist/images/${_num + 1}.jpg`;
        image.classList.add(`bg-image`);
        body.classList.add(`bg_${_num+1}`);
        body.prepend(image);
        image.addEventListener("loadend", handleImageLoad())
    }
    
    function generatorRandom() {
        return Math.floor(Math.random() * IMG_NUMBER);
    }
    
    function init() {
        const numberRd = generatorRandom();
        paintImage(numberRd);
    }
    
    init();
})();
