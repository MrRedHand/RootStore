import {makeAutoObservable} from "mobx";
import {TWebsocketMessagesStore} from "@store/RootStore/utils/types";

const websocketMessagesStore : TWebsocketMessagesStore = makeAutoObservable({
  messages : [],
  updateMessages(message) {
    websocketMessagesStore.messages = message
  }
})

export default websocketMessagesStore