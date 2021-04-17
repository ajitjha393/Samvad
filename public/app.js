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

const login = async () => {
	try {
		return await client.reAuthenticate()
	} catch (err) {
		return await client.authenticate({
			strategy: 'local',
			email: 'hello@feathersjs.com',
			password: 'supersecret',
		})
	}
}

const main = async () => {
	const auth = await login()

	console.log('User is authenticated', auth)
}
