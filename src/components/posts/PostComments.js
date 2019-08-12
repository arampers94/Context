import React, { Component } from 'react';
import { Feed, Icon, Header } from 'semantic-ui-react';

class PostComments extends Component {
  render() {
    const { comment, userFirstName, userLastName, datePosted } = this.props;

    return (
      <Feed.Event>
        <Feed.Label>
          <Icon name="user circle" />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            {userFirstName} {userLastName}
            <Feed.Date>3 hours ago</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>{comment}</Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    )
  }
}

export default PostComments;