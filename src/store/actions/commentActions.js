export const postComment = (postId, comment, userFirstName, userLastName) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    firestore.collection('posts').doc(postId).update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        comment: comment,
        userFirstName: userFirstName,
        userLastName: userLastName,
        datePosted: new Date()
      })
    }).then(() => {
      dispatch({ type: 'POST_COMMENT', comment })
    }).catch((err) => {
      dispatch({ type: 'POST_COMMENT_ERR', err })
    })
  }
}

export const getComments = (postId) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('posts').doc(postId).get().then((doc) => {
      console.log('GOT DOC');
      console.log(doc.data());
      dispatch({ type: 'GET_COMMENTS', doc });
    }).catch((err) => {
      dispatch({ type: 'GET_COMMENTS_ERR', err });
    })
  }
}