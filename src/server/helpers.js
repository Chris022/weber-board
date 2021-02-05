exports.getRooms = (socket) => {
    let rooms = {...socket.rooms};
    delete rooms[socket.id]
    return Object.values(rooms)
}