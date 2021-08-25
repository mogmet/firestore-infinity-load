<template>
  <div>
    お部屋一覧
    <ul>
      <li v-for='room in rooms' :key='room.id'>
        {{ room.roomName }}
      </li>
      <li v-if='canMoreLoad'><button @click='onClickMoreLoad'>更に読み込む</button></li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RoomService from '~/models/service/roomService'
import Room from '~/models/entity/room'
export type DataType = {
  roomService: RoomService
}
export default Vue.extend({
  data(): DataType {
    return {
      roomService: new RoomService()
    }
  },
  computed: {
    rooms(): Room[] { return this.roomService.rooms },
    canMoreLoad(): boolean { return this.roomService.canMoreLoad }
  },
  mounted() {
    this.roomService.fetchRooms()
  },
  methods: {
    onClickMoreLoad(): void {
      this.roomService.fetchMoreRooms()
    }
  }
})
</script>
