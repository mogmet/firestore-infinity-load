import firebase from 'firebase'
import RoomRepository from '~/models/repository/roomRepository'
import Room from '~/models/entity/room'
import DocumentSnapshot = firebase.firestore.DocumentSnapshot

export default class RoomService {
  private repository: RoomRepository
  private _rooms: Room[] = []
  private nextSnapshot: DocumentSnapshot | null = null

  get rooms(): Room[] {
    return this._rooms
  }

  get canMoreLoad(): boolean {
    return !!this.nextSnapshot
  }

  constructor() {
    this.repository = new RoomRepository()
  }

  async fetchRooms(): Promise<void> {
    const response = await this.repository.fetchRooms()
    this.nextSnapshot = response.nextSnapshot
    this._rooms = response.results
  }

  async fetchMoreRooms(): Promise<void> {
    if (!this.nextSnapshot) {
      return
    }
    const response = await this.repository
      .fetchRooms({
        startAtSnapshot: this.nextSnapshot
      })
    this.nextSnapshot = response.nextSnapshot
    this._rooms = [...this._rooms, ...response.results]
  }
}
