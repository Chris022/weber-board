const Board = require('./board');

class BoardCollection {

    constructor(){
        this.boards = [];
        setInterval(this.cleanEmptyRooms.bind(this), 1000 * 60 * 5); //run every 5 minutes for emty rooms
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

    cleanEmptyRooms(){
        console.log("Cleaning: " + this.boards)
        this.boards.forEach(board => {
            if(Object.keys(board.users).length == 0){
                this.boards = this.boards.filter(b => b != board)
            }
            
        })
    }


}
module.exports = BoardCollection;
