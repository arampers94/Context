import React from 'react';
import { Grid } from 'semantic-ui-react';
import Feed from '../layout/Feed';
import PostDetails from '../posts/PostDetails';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Click a post to view',
      authorFirstName: '',
      authorLastName: '',
      content: '',
      createdAt: '',
      rating: 0,
      isDisabled: true
    }

    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {

    Events.scrollEvent.register('begin', function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function () {
      console.log("end", arguments);
    });

  }

  scrollToTop() {
    scroll.scrollToTop();
  }
  scrollTo() {
    scroller.scrollTo('scroll-to-element', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }
  scrollToWithContainer() {

    let goToContainer = new Promise((resolve, reject) => {

      Events.scrollEvent.register('end', () => {
        resolve();
        Events.scrollEvent.remove('end');
      });

      scroller.scrollTo('scroll-container', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });

    });

    goToContainer.then(() =>
      scroller.scrollTo('scroll-container-second-element', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        containerId: 'scroll-container'
      }));
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  onClickPost = (title, authorFirstName, authorLastName, content, createdAt, rating) => {
    // console.log('Home method invoked');
    this.setState({
      title: title,
      authorFirstName: authorFirstName,
      authorLastName: authorLastName,
      content: content,
      createdAt: createdAt,
      rating: rating,
      isDisabled: false
    });
  }

  render() {
    const { posts } = this.props;
    const post = this.state;
    return (
      <div id='space-home' className='ui container fluid'>

        <Grid columns={2}>
          <Grid.Row>

            <Grid.Column>
              <article>
                <Element name="posts">
                  <Feed posts={posts} onClickPost={this.onClickPost} />
                </Element>
              </article>
            </Grid.Column>
            <Grid.Column>
              <Element name="details">
                <PostDetails post={post} />
              </Element>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('LOGGING STATE OF HOME PAGE');
  console.log(state);
  return {
    posts: state.firestore.ordered.posts
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'posts', orderBy: ['createdAt', 'desc'] }
  ])
)(Home)