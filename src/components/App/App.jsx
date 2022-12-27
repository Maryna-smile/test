import React, { Component } from 'react';
import users from '../users.json';

import css from './App.module.css';
import {Card} from '../Card/Card';

export class App extends Component {
 

  render() {
    return (
      <div>
        <ul className={css.list}>
          {users.map((user) => (
           <Card key={user.id} user={user}/>
          ))}
        </ul>
      </div>
    );
  }
}
