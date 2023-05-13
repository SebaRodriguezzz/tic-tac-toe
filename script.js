const table = document.getElementById('table');

const gameboard = (() => {
    let content = [];

    const getContent = () => {
        return content;
    }

    const addItem = (m) => {
        return content.push(m);
    }

    const getMark = () => {
        let mark = '';
        let contentLength = parseFloat(content.length);
    
        if (contentLength % 2 === 0){
            mark = 'O'
        } else {
            mark = 'X'
        }
        addItem(mark);
    
        return mark;
    }

    function placeMark(){
        let text = document.createTextNode(getMark());
        this.appendChild(text);
        this.classList.add("mark");
        this.removeEventListener('click', placeMark);
        checkWinner();
    }

    const addBoardListeners = (() => {
        for (let row of table.rows){
            for (let cell of row.cells){
                if (!cell.hasChildNodes()) {
                    cell.addEventListener('click', placeMark);
                }
            }
        }
    })();

    const addChildrenToArray = (array) => {
        for (let row of table.rows){
            for (let i = 0; i < row.cells.length; i++) {
                array.push(row.cells[i].childNodes);
            }
        }
    }

    const checkWinner = () => {
        let children = [];
        addChildrenToArray(children);
        if (searchWinner(children)){
            console.log("winner");
        } else if(isTableFull(children)) {
            console.log("tie");
        }
    }

    const checkRow = (children, n) => {
        const multiplier = 1;
        return children[n][0]?.nodeValue != undefined && children[n][0]?.nodeValue === children[n + multiplier][0]?.nodeValue && children[n + multiplier][0]?.nodeValue === children[n + (multiplier * 2)][0]?.nodeValue
    }

    const checkColumn = (children, n) => {
        const multiplier = 3;
        return children[n][0]?.nodeValue != undefined && children[n][0]?.nodeValue === children[n + multiplier][0]?.nodeValue && children[n + multiplier][0]?.nodeValue === children[n + (multiplier * 2)][0]?.nodeValue
    }

    const checkDiagonal = (children, n) => {
        let multiplier = 4;
        if (n > 0){
            multiplier = 2;
        }
        return children[n][0]?.nodeValue != undefined && children[n][0]?.nodeValue === children[n + multiplier][0]?.nodeValue && children[n + multiplier][0]?.nodeValue === children[n + (multiplier * 2)][0]?.nodeValue
    }

    const searchWinner = (arr) => {
        
        const searchLimit = 6;
        let result = false;
        let i = 0;

        while (i <= searchLimit && result == false) {
            if (i % 3 == 0){
                result = checkRow(arr, i);
            }
            if (i <= 2 && result == false){
                result = checkColumn(arr, i);
            }
            if (i % 2 == 0 && i <= 2 && result == false){
                result = checkDiagonal(arr, i);
            }
            i++;
        }

        return result;
    }
   
    const isTableFull = (arrayOfChildren) => {

        let found = false;
        let result = true;
        let i = 0;

        while(i < arrayOfChildren.length && found == false){
            if(arrayOfChildren[i][0] === undefined){
                found = true;
                result = false;
            }
            i++;
        }

        return result;
    }


    return {
        getContent
    }
})();


