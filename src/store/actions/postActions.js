export const createPost = (post) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('posts').add({
      ...post,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date(),
      rating: 0,
      comments: []
    }).then(() => {
      dispatch({ type: 'CREATE_POST', post })
    }).catch((err) => {
      dispatch({ type: 'CREATE_POST_ERR', err })
    })
  }
}

export const updateRating = (postId, postRating, updateAmount) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const rating = postRating + updateAmount;

    firestore.collection('posts').doc(postId).update({
      rating: rating
    }).then(() => {
      dispatch({ type: 'UPDATE_POST_RATING', updateAmount })
    }).catch((err) => {
      dispatch({ type: 'UPDATE_POST_RATING_ERROR', err })
    })
  }
}

export const showPostDetails = (post) => {
  return (dispatch, getState) => {
    dispatch({ type: 'SHOW_POST_DETAILS', post })
  }
}

export const postComment = (postId, authorFirstName, authorLastName, date) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('posts').doc(postId).update({

    })
  }
}