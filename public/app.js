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

const login = async (credentials) => {
	try {
		if (!credentials) {
			await client.reAuthenticate()
		} else {
			await client.authenticate({
				strategy: 'local',
				...credentials,
			})
		}

		console.log('Signup / login Succesful. Go to chat window now ...')

		// Show chat messages
	} catch (err) {
		// show Login Page

		showLogin(err)
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

				<button
					type="button"
					id="login"
					class="button button-primary block signup"
				>
					Login
				</button>

				<button
					type="button"
					id="signup"
					class="button button-primary block signup"
				>
					Sign Up and Login
				</button>
				<a class="button button-primary block" href="/oauth/github"
					>Login with Github</a
				>
			</form>
		</div>
	</div>
</main>


`

const chatHTML = `

<main class="flex flex-column">
<header class="title-bar flex flex-row flex-center">
    <div class="title-wrapper block center-element">
        <img
            class="logo"
            src="http://feathersjs.com/img/feathers-logo-wide.png"
            alt="Feathers Logo"
        />
        <span class="title">Chat</span>
    </div>
</header>
</main>


`

const showLogin = (err) => {
	if (document.querySelectorAll('#login').length && err) {
		document
			.querySelector('.heading')
			.insertAdjacentElement(
				'beforeend',
				`<p>There was an error : ${err.message} </p>`
			)
	} else {
		document.getElementById('app').innerHTML = loginHTML
	}
}

showLogin()

const getCredentials = () => {
	const user = {
		email: document.querySelector('[name="email"]').value,
		password: document.querySelector('[name="password"]').value,
	}

	return user
}

const addEventListener = (selector, event, handler) => {
	document.addEventListener(event, async (ev) => {
		if (ev.target.closest(selector)) {
			handler(ev)
		}
	})
}

addEventListener('#signup', 'click', async () => {
	const credentials = getCredentials()

	await client.service('users').create(credentials)

	await login(credentials)
})
