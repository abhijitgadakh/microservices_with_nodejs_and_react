import './App.css';
import PostCreate from './PostCreate';
import PostList from './PostList';


function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Create Post</h1>
        <PostCreate />

        <hr />

        <h1>Posts</h1>
        <PostList />
      </div>
    </div>
  );
}

export default App;
