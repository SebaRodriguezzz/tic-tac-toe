const table = document.getElementById('table');

const gameboard = (() => {
    let content = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];

    return {
        content
    }
})();

const renderContent = (() => {
    let i = 0;
    let text;
    let child;
    for (let row of table.rows){
        for (let cell of row.cells){
            text = document.createTextNode(gameboard.content[i]);
            child = cell.appendChild(text);
            cell.classList.add("mark");
            i++;
        }
    }
})();
