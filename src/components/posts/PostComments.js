import React, { Component } from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import moment from 'moment';

class PostComments extends Component {
  render() {
    const { comment, userFirstName, userLastName, datePosted } = this.props;
    const datePostedRelative = moment(datePosted.toDate()).fromNow();

    return (
      <Feed.Event>
        <Feed.Label>
          <Icon name="user circle" />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            {userFirstName} {userLastName}
            <Feed.Date>{datePostedRelative}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>{comment}</Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    )
  }
}

export default PostComments;