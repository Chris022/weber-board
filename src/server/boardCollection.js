const Board = require('./board');

class BoardCollection {

    constructor(){
        this.boards = [];
    }

    createNewRoom(roomName) {
        if(!this.boards.map(x => x.name).includes(roomName)){
            console.log("Created room: " + roomName)
            this.boards.push(new Board(roomName));
            return 1;
        }
        return 0;
    }

    getRoomById(socketID){
        return this.boards.filter(board => Object.keys(board.sockets).includes(socketID))[0]
    }

    getRoomByName(name){
        return this.boards.filter(board => board.name==name)[0]
    }


}
module.exports = BoardCollection;
