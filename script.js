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
        if (checkRow(children, 0) || checkRow(children, 3) || checkRow(children, 6)){
            console.log("winner");
        } else if (checkColumn(children, 0) || checkColumn(children, 1) || checkColumn(children, 2)){
            console.log("winner");
        } else if (children[0][0]?.nodeValue != undefined && children[0][0]?.nodeValue === children[4][0]?.nodeValue && children[4][0]?.nodeValue === children[8][0]?.nodeValue){
            console.log("winner");
        } else if (children[2][0]?.nodeValue != undefined && children[2][0]?.nodeValue === children[4][0]?.nodeValue && children[4][0]?.nodeValue === children[6][0]?.nodeValue){
            console.log("winner");
        } else if(isTableFull(children)) {
            console.log("tie");
        }
    }

    const checkRow = (children, n) => {
        return children[n][0]?.nodeValue != undefined && children[n][0]?.nodeValue === children[n + 1][0]?.nodeValue && children[n + 1][0]?.nodeValue === children[n + 2][0]?.nodeValue
    }

    const checkColumn = (children, n) => {
        return children[n][0]?.nodeValue != undefined && children[n][0]?.nodeValue === children[n + 3][0]?.nodeValue && children[n + 3][0]?.nodeValue === children[n + 6][0]?.nodeValue
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


