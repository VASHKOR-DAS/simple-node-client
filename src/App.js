import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUsers = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email }; // user make korlam
    // console.log(user);

    // server a ai object ta sent krbo
    fetch('http://localhost:5000/users', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user), // ai user object jeta create korlam seta pathabo, amra data ta body er moddhe pathaici tai server a body te pawar try korbo
    })
      .then(res => res.json())
      .then(data => {
        console.log(data); // backend theke user k console a pathiye dise
        const newUsers = [...users, data]; // ager users gulo add korlam + backend theke id object soho data ta
        setUsers(newUsers);
      })
      .catch(error => console.error(error))






    event.target.reset();
  }

  return (
    <div className="App">

      <form onSubmit={handleAddUsers}>
        <input type="text" placeholder='Name' required name='name' />
        <br />
        <input type="email" placeholder='Email' required name='email' />
        <br />
        <button>Add User</button>
      </form>

      <h2>Users: {users.length}</h2>

      <div>
        {users.map(user =>
          // db te _id tai aikhane key hisebe aita dilm
          <p key={user._id}>
            {user.name} {user.email}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
