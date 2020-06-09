document.addEventListener('DOMContentLoaded', () => {
    criaGrid();

    const width = 10;
    const grid = document.querySelector('#grid'); 
    let squares = Array.from(document.querySelectorAll('#grid div'));
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');

    //The tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1,width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ];

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ];
    
    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ];
    
    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ];
    
    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ];

    const TheTetrominoes = [ lTetromino, zTetromino, tTetromino, oTetromino, iTetromino ];

    const startPosition = 3;
    const startRotation = 0;

    let currentPosition = startPosition;
    let currentRotation = startRotation;

    // select a random tetramino
    let tetrominoIndex = Math.floor(Math.random() * TheTetrominoes.length);

    let current = TheTetrominoes[tetrominoIndex][currentRotation];

    //draw the first rotation in the first tetromino
    function draw() {
        current.forEach( index => { 
            squares[currentPosition + index].classList.add('tetromino') 
        });
    }
    
    draw();

    function undraw() {
        current.forEach( index => {
            squares[currentPosition + index].classList.remove('tetromino');
        });
    }

    timerID = setInterval(moveDown,500);

    function control(e) {
        if(e.keyCode === 37) {
            moveLeft();
        } else if(e.keyCode === 38) {
            rotate();
        } else if(e.keyCode === 39) {
            moveRight();
        } else if(e.keyCode === 40) {
            moveDown();
        }
    }
    document.addEventListener('keyup', control);

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();

        freeze();
    }
    

    function freeze() {
        if(current.some( index => squares[currentPosition + index + width].classList.contains('taken'))) { // sem o "+ width" o tetramino sobreescreve a linha final
            current.forEach( index => squares[currentPosition + index].classList.add('taken') );
            tetrominoIndex = Math.floor(Math.random() * TheTetrominoes.length);
 
            current = TheTetrominoes[tetrominoIndex][startRotation];
            currentPosition = startPosition;
            draw();
        }
    }

    // move the tetramino
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width == 0);
        if(!isAtLeftEdge) {
            currentPosition -= 1;
        }

        if(current.some( index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition += 1;
        }

        draw();
    }

    // move the tetramino
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width == width-1);
        if(!isAtRightEdge) {
            currentPosition += 1;
        }

        if(current.some( index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -= 1;
        }

        draw();
    }

    // rotação
    function rotate() {
        undraw();
        currentRotation++;
        if(currentRotation === current.length) {
            currentRotation = 0;
        }
        current = TheTetrominoes[tetrominoIndex][currentRotation];
        draw();
    }

});


function criaGrid() {
    let rootElement = document.getElementById('grid');
    
    for(let i = 0; i < 200; i++) {
        let newDiv = document.createElement('div');
        rootElement.appendChild(newDiv);
    }

    for(let i = 0; i < 10; i++ ) {
        let newDiv = document.createElement('div');
        newDiv.className = 'taken';
        rootElement.appendChild(newDiv);
    }

}

