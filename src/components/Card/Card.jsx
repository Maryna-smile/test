import React, { Component } from 'react';
import css from './Card.module.css';
import logo from '../images/Logo.png';
import { ReactComponent as Elipse } from '../images/Ellipse.svg';
import picture from '../images/picture.png';

export class Card extends Component {
  state = {
    followers: JSON.parse(localStorage.getItem(this.props.user.user)) ?? this.props.user.followers,
    isFollowing: JSON.parse(localStorage.getItem(this.props.user.id)) ?? this.props.user.isFollowing ?? false
  };

  componentDidUpdate(_, prevState) {
    if (this.state.isFollowing !== prevState.isFollowing) {
      localStorage.setItem(
        `${this.props.user.id}`,
        JSON.stringify(this.state.isFollowing)
      );
      localStorage.setItem( `${this.props.user.user}`,
      JSON.stringify(this.state.followers))
    }
  }

  handleFollowingState = () => {
    this.setState(prevState => {
      if (prevState.isFollowing) {
        return {
          followers: prevState.followers - 1,
          isFollowing: !prevState.isFollowing,
        };
      }
      return {
        followers: prevState.followers + 1,
        isFollowing: !prevState.isFollowing,
      };
    });
  };

  render() {
    const { user, tweets, avatar } = this.props.user;
    const { isFollowing, followers } = this.state;
    return (
      <li className={css.item}>
        <img className={css.logo} src={logo} alt="logo" />
        <img className={css.picture} src={picture} alt="hearts" />
        <div className={css.before}>
          <Elipse className={css.elipse} />
        </div>
        <img className={css.avatar} src={avatar} alt={user} />
        <p className={css.tweets}> {tweets} tweets</p>
        <p className={css.followers}>
          {' '}
          {new Intl.NumberFormat('en').format(followers)} followers
        </p>
        <button
          className={isFollowing ? css.activeButton : css.button}
          onClick={this.handleFollowingState}
        >
          {isFollowing ? 'following' : 'follow'}
        </button>
      </li>
    );
  }
}
