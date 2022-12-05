import App from "../App"
import Game from "../components/Game"
import Stats from "../components/Stats"

const routes = [
    {
        path: '/',
        element: <App />
    },
    {
        path: '/stats',
        element: <Stats />
    },
    {
        path: '/game',
        element: <Game />
    }
]

export default routes