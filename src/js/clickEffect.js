(function() {
    
    function printMousePos(event) {
        let position = {
            x: event.clientX,
            y: event.clientY
        };
        fillPrint(40, position);
    };
    
    function fillPrint(_cnt, _position) {
        let wrapper = document.querySelector(".wrapper");
        let originSpan = document.createElement("span");
        
        console.log('x:', _position.x, "Y: ", _position.y);
        
        originSpan.setAttribute("style", `left: ${_position.x}; top:${_position.y}`);
        wrapper.appendChild(originSpan);
        originSpan.className = "origin";
        
        for( let i=0; i < _cnt;i++) {
            let span = document.createElement("span");
            span.className = "sparkle";
            let randomX = Math.floor(Math.random(_position.x) * (window.outerWidth)),
                randomY = Math.floor(Math.random(_position.y) * (window.outerHeight)),
                randomDot = Math.floor(Math.random()*40);
            span.setAttribute("style",
                    `left: ${randomX}px;top: ${randomY}px;
                            background: rgb(
                                ${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}
                            );
                            width: ${randomDot}px;
                            height: ${randomDot}px;
                            `);
            wrapper.appendChild(span);
            setTimeout(() => {
                wrapper.removeChild(span);
            },1000);
        }
        setTimeout( () => {
            wrapper.removeChild(originSpan ? originSpan : '');
        },1000)
    }
    
    function addEvent() {
        document.addEventListener("click", printMousePos);
    }
    
    function init() {
        addEvent();
    }
    
    init();
})();