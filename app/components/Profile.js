import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import uniq from 'node-uniq';

import NewsList from './NewsList';

const capitalizeFirstLetter = (string) => {
  const stringArr = string.split(' ');
  return stringArr.map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
};

class Profile extends React.Component {
  constructor(props) {
    super(props);

    const uniqArticles = uniq(this.props.user.articles, i => i.url);

    this.state = {
      username: this.props.user.username,
      topics: this.props.user.topics,
      selectedSources: this.props.user.selectedSources,
      articles: uniqArticles,
      img: this.props.user.profileImg,
    };
  }

  render() {
    console.log(this.state.articles);
    return (
      <div id="profile">
        <div className="col-1-3">

          <div className="sidebar">
            <div className="nav">
              <nav className="nav-bar">
                <Link to="/">Home</Link>
              </nav>
            </div>
            <div className="user-info">
              <div className="user">
                <img className="profile-pic" src={this.state.img} alt={this.state.username} />
                <h4>{this.state.username}</h4>
              </div>

              {/* Favorite topics list */}
              <div className="profileTopicsList">
                <h4>Saved Topics</h4>
                {this.state.topics.map(topicString => (
                  <p key={topicString}>
                    {capitalizeFirstLetter(topicString)}
                  </p>
                ))}
              </div>

              {/* Selected Sources List */}
              <div className="profileSourcesList">
                <h4>Favorite News Sources</h4>
                {this.state.selectedSources.map(sourceObj =>
                  <p key={sourceObj.label} >{capitalizeFirstLetter(sourceObj.label)}</p>)}
              </div>
            </div>
          </div>
        </div>
        <div className="col-2-3">
          {/* Favorite News Articles */}
          <div className="profileFavoriteArticles">
            <h2>Favorites</h2>
            {/* turnary operator to show if now articles are liked */}
            {this.state.articles.length === 0 ?
              <p>Articles you like will be shown here</p> :
              <NewsList newsArticles={this.props.user.articles} />
            }
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    topics: PropTypes.arrayOf(PropTypes.string),
    selectedSources: PropTypes.arrayOf(PropTypes.object),
    profileImg: PropTypes.string,
    articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default Profile;
