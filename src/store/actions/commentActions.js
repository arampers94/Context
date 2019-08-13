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