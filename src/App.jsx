import './App.css';

import { Provider } from "react-redux"
import store from './store/store';

import Post from './components/Post';

function App() {
    return (
        <Provider store={store}>
            <div className="container">
                <Post />
            </div>
        </Provider>
    )
}

export default App
