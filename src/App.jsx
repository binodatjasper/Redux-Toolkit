import { Provider } from "react-redux"
import { ToastContainer } from 'react-toastify';
import store from './store/store';
import Post from './components/Post';

function App() {
    return (
        <Provider store={store}>
            <header>
                <h1>CRUD App with Redux Toolkit</h1>
            </header>
            <div className="container">
                <Post />
            </div>
            <footer>
                <p>Copyright {new Date().getFullYear()} - React with Redux Toolkit App. Deveoped by: Binod Raj Dhami</p>
            </footer>
            <ToastContainer />
        </Provider>
    )
}

export default App
