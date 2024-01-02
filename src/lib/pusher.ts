import PusherClient from 'pusher-js';
import { openDialog } from '../stateStores/cancelledAppointmentDialog';

export const pusherClient = new PusherClient('5d9ec44495bc6ef9c4ea', {
  cluster: 'eu',
});

const globalSubscriptions: { [key: string]: any } = {};

export const subscribeToUpdates = (userId: string) => {
  const channelName = `user-${userId}`;
  if (!globalSubscriptions[channelName]) {
    const channel = pusherClient.subscribe(channelName);
    channel.bind('appointment-cancelled', () => {
      openDialog();
    });
    globalSubscriptions[channelName] = channel;
    console.log('subscribed to', channelName);
  }
};
