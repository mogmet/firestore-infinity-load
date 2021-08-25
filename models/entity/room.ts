import firebase from 'firebase'

export default class Room {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    readonly id: string,
    readonly roomName: string,
    readonly createdAt: firebase.firestore.Timestamp
    ) {
  }
}
