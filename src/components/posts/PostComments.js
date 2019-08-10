import React, { Component } from 'react';
import { Feed, Icon, Header } from 'semantic-ui-react';

class PostComments extends Component {
  render() {
    return (
      <div id="comments" className="ui container">
        <Feed size='medium'>
          <Header as='h3'>3 Comments</Header>
          <Feed.Event>
            <Feed.Label>
              <Icon name="user circle" />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                Amar Rampersaud
                  <Feed.Date>3 hours ago</Feed.Date>
              </Feed.Summary>
              <Feed.Extra text>Hey, that sounds really interesting!</Feed.Extra>
            </Feed.Content>
          </Feed.Event>
          <Feed.Event>
            <Feed.Label>
              <Icon name="user circle" />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                Ethan Klein
                  <Feed.Date>2 hours ago</Feed.Date>
              </Feed.Summary>
              <Feed.Extra text>That's dope</Feed.Extra>
            </Feed.Content>
          </Feed.Event>
          <Feed.Event>
            <Feed.Label>
              <Icon name="user circle" />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                Felix Kjellberg
                  <Feed.Date>20 minutes ago</Feed.Date>
              </Feed.Summary>
              <Feed.Extra text>Brofist!</Feed.Extra>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </div>
    )
  }
}

export default PostComments;