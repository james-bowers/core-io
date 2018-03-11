default: up

up:
	npm start --prefix ./backend-server-system & make datastore & npm run dev --prefix ./browser-client

datastore:
	gcloud beta emulators datastore start --no-store-on-disk --host-port=":9000" --no-legacy

test:
	npm run test --prefix ./backend-server-system && npm run test --prefix ./browser-client && npm run test --prefix ./cli