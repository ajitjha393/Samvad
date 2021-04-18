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

const logout = async () => await client.logout()

const main = async () => {
	const auth = await login()

	console.log('User is authenticated', auth)

	await logout()
}
main()

const loginHTML = `
    
<main class="login container">
	<div class="row">
		<div class="col-12 col-6-tablet push-3-tablet text-center heading">
			<h1 class="font-100">Log In or Signup</h1>
		</div>
	</div>
	<div class="row">
		<div class="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop">
			<form class="form">
				<fieldset>
					<input type="email" name="email" placeholder="email" class="block" />
                </fieldset>
                <fieldset>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        class="block"
                    />
                </fieldset>
			</form>
		</div>
	</div>
</main>

`

const showLogin = () => {
	document.getElementById('app').innerHTML = loginHTML
}

showLogin()
