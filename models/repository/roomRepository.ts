import Room from '~/models/entity/room'
import firebase, { firestore } from '~/plugins/firebase'
import CollectionReference = firebase.firestore.CollectionReference
import DocumentSnapshot = firebase.firestore.DocumentSnapshot
import { CollectionResponse } from '~/models/repository/collectionResponse'
export default class RoomRepository {
  readonly limit = 2
  private roomsCollection: CollectionReference<Room>

  constructor() {
    this.roomsCollection = firestore.collection('rooms').withConverter<Room>({
      fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, _: firebase.firestore.SnapshotOptions): Room {
        const data = snapshot.data({ serverTimestamps: 'estimate' })
        return new Room(snapshot.id, data.roomName as string, data.createdAt)
      },
      toFirestore(modelObject: Room): firebase.firestore.DocumentData {
        const data = Object.assign({ ...modelObject })
        return data
      }
    })
  }

  /**
   * firestoreからroomの一覧を取得する
   * @param limit
   * @param startAtSnapshot
   */
  async fetchRooms(
    {
      limit = this.limit,
      startAtSnapshot = undefined
    }: {
      limit?: number
      startAtSnapshot?: DocumentSnapshot
    } = {}): Promise<CollectionResponse<Room>> {
    let query = this.roomsCollection.limit(limit + 1).orderBy('createdAt', 'desc')
    if (startAtSnapshot) {
      query = query.startAt(startAtSnapshot)
    }
    const snapshots = await query.get()
    const snapshotLength = snapshots.docs.length
    const hasMore = snapshotLength === limit + 1
    const rooms = snapshots.docs.map(document => {
      return document.data()
    })
    if (hasMore) {
      rooms.pop()
    }
    const lastSnapshot = hasMore ? snapshots.docs[snapshotLength - 1] : null
    return {
      results: rooms,
      nextSnapshot: lastSnapshot
    }
  }
}
