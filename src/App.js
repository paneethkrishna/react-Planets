import { useEffect, useState } from 'react';
import './App.css';

function App() {
  let [query, setQuery] = useState([])
  const [blogs, setBlogs] = useState(null);
  useEffect(()=>{
    fetch('https://assignment-machstatz.herokuapp.com/planet')
    .then(res =>{
       return res.json();
    })
    .then((data)=>{
        setBlogs(data)
    });
},[])

const handleClick = (name,id)=>{
  // setQuery(name)
  // console.log(query);
  setQuery([...new Set(query), {
    name,id
  }])
  // console.log(query);
}


  return (
    <div className="App">
      <div className="outer">
        <div className="container">
          <div className="card shadow-lg p-5 mb-5 mt-5 bg-white rounded">
            <div className="row">
              <div className="col">
                <h2 className="text-center">
                  Planets
                  
                </h2>
                <span className="text-grey">*click + to add to Favoutite</span>
                { blogs && blogs.map((blog) => (
                  <div className="blog-preview" key={blog.id}>
                <p>{blog.name} <span className="float-right point" onClick={()=>handleClick(blog.name, blog.id)}>+</span></p>
                 </div>          
                 ))}
              </div>
              <div className="col text-center">
                <h2>Favourite</h2>
                { query.map((que) => (
                  <div className="blog-preview" key={que.id}>
                <p>{que.name} <span className="float-right point">-</span></p>
                 </div>          
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
