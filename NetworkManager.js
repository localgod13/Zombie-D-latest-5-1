export class NetworkManager {
    constructor() {
        this.peer = null;
        this.connection = null;
        this.connections = new Map(); // Store multiple connections for host
        this.isHost = false;
        this.roomCode = null;
        this.playerName = null;
        this.onConnectionCallback = null;
        this.onDataCallback = null;
    }

    initialize(isHost, roomCode = null, playerName = null) {
        this.isHost = isHost;
        this.roomCode = roomCode;
        this.playerName = playerName;

        // Create a new Peer instance
        this.peer = new Peer(isHost ? roomCode : undefined);

        return new Promise((resolve, reject) => {
            this.peer.on('open', (id) => {
                console.log('My peer ID is:', id);
                if (!isHost) {
                    // If we're joining, connect to the host
                    this.connectToHost(roomCode);
                } else {
                    // If we're hosting, set up connection handler
                    this.peer.on('connection', (conn) => {
                        console.log('New connection from:', conn.peer);
                        this.handleNewConnection(conn);
                    });
                }
                resolve(id);
            });

            this.peer.on('error', (err) => {
                console.error('Peer error:', err);
                reject(err);
            });
        });
    }

    handleNewConnection(conn) {
        this.connections.set(conn.peer, conn);
        
        conn.on('open', () => {
            console.log('Connection opened with:', conn.peer);
            // Send player name to host
            conn.send({ type: 'playerName', name: this.playerName });
            if (this.onConnectionCallback) {
                this.onConnectionCallback(conn.peer, this.playerName);
            }
        });

        conn.on('data', (data) => {
            console.log('Received data from:', conn.peer, data);
            if (data.type === 'playerName') {
                if (this.onConnectionCallback) {
                    this.onConnectionCallback(conn.peer, data.name);
                }
            } else if (this.onDataCallback) {
                this.onDataCallback(data, conn.peer);
            }
        });

        conn.on('close', () => {
            console.log('Connection closed with:', conn.peer);
            this.connections.delete(conn.peer);
        });
    }

    connectToHost(hostId) {
        console.log('Connecting to host:', hostId);
        this.connection = this.peer.connect(hostId);

        this.connection.on('open', () => {
            console.log('Connected to host');
            // Send player name to host
            this.connection.send({ type: 'playerName', name: this.playerName });
            if (this.onConnectionCallback) {
                this.onConnectionCallback(hostId);
            }
        });

        this.connection.on('data', (data) => {
            console.log('Received data:', data);
            if (this.onDataCallback) {
                this.onDataCallback(data);
            }
        });

        this.connection.on('close', () => {
            console.log('Connection closed');
        });
    }

    setOnConnection(callback) {
        this.onConnectionCallback = callback;
    }

    setOnData(callback) {
        this.onDataCallback = callback;
    }

    sendData(data) {
        if (this.isHost) {
            // If we're the host, send to all connected peers
            this.connections.forEach((conn) => {
                if (conn.open) {
                    conn.send(data);
                }
            });
        } else if (this.connection && this.connection.open) {
            // If we're a client, send to the host
            this.connection.send(data);
        }
    }

    disconnect() {
        if (this.isHost) {
            // Close all connections if we're the host
            this.connections.forEach((conn) => {
                conn.close();
            });
            this.connections.clear();
        } else if (this.connection) {
            // Close single connection if we're a client
            this.connection.close();
        }
        if (this.peer) {
            this.peer.destroy();
        }
    }
} 