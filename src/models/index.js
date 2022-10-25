// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



<<<<<<< HEAD
const { ChatRoom, Message, User, ChatRoomUser } = initSchema(schema);

export {
  ChatRoom,
  Message,
=======
const { Message, ChatRoom, User, ChatRoomUser } = initSchema(schema);

export {
  Message,
  ChatRoom,
>>>>>>> ce7336df17d6675739249cb234738c4937edd74c
  User,
  ChatRoomUser
};