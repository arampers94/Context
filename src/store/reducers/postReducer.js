const initState = {
  title: 'Click a post to view',
  authorFirstName: '',
  authorLastName: '',
  content: '',
  createdAt: '',
  rating: 0
}

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_POST':
      console.log('Created post', action.post);
      return state;
    case 'CREATE_POST_ERR':
      console.log('Error creating post', action.err);
      return state;
    case 'UPDATE_POST_RATING':
      console.log('Updated post with ', action.updateAmount);
      return state;
    case 'SHOW_POST_DETAILS':
      console.log('Showing post ', action.post);
      return state;
    default:
      return state;
  }
}

export default postReducer;