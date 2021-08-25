import firebase from 'firebase'
import DocumentSnapshot = firebase.firestore.DocumentSnapshot

export interface CollectionResponse<T> {
  results: T[]
  nextSnapshot: DocumentSnapshot | null
}
