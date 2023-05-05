const gameboard = (() => {
    table = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
    const showTable = () => {
        for (let i = 0; i < table; i++) {
            console.log(table[i]);
            console.log("Hi")
            
        }
    }

    return {
        showTable
    }
})();
