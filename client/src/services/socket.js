import io from 'socket.io-client';

const SOCKET_URL = 'https://ghostzzz-io-uno.onrender.com';

class SocketService {
    constructor() {
        this.socket = null;
    }

    connect() {
        this.socket = io(SOCKET_URL, {
            transports: ['polling', 'websocket'],
            forceNew: true
        });

        return new Promise((resolve) => {
            this.socket.on('connect', () => {
                console.log('🎮 Connected to Ghostzzz UNO Server!');
                resolve();
            });
        });
    }

    createRoom(playerName) {
        this.socket.emit('createRoom', { playerName });
    }

    joinRoom(roomId, playerName) {
        this.socket.emit('joinRoom', { roomId, playerName });
    }

    playCard(cardId, chosenColor = null) {
        this.socket.emit('playCard', { cardId, chosenColor });
    }

    drawCard() {
        this.socket.emit('drawCard');
    }

    sendMessage(message) {
        this.socket.emit('sendMessage', { message });
    }

    // Event listeners
    onRoomCreated(callback) { this.socket.on('roomCreated', callback); }
    onRoomJoined(callback) { this.socket.on('roomJoined', callback); }
    onGameUpdate(callback) { this.socket.on('gameUpdate', callback); }
    onChatMessage(callback) { this.socket.on('chatMessage', callback); }
    onPlayerJoined(callback) { this.socket.on('playerJoined', callback); }
    onGameStarted(callback) { this.socket.on('gameStarted', callback); }
    onError(callback) { this.socket.on('error', callback); }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

export default new SocketService();
