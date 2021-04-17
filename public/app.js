const socket = io()
const client = feathers()

// setting up client-server conenction
client.configure(feathers.socketio(socket))

// setting up authentication storage

client.configure(
	feathers.authentication({
		storage: window.localStorage,
	})
)
