import React from 'react';
import {AsyncStorage} from 'react-native';
import {Notifications} from 'expo';

import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'MobileFlashcard:notifications';
const CHANNEL_KEY = 'Reminder';

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync,
  );
};

function createNotification() {
  return {
    title: 'Seems busy right?',
    body: 'Don\'t forget to practice today!',
    ios: {
      sound: true,
    },
    android: {
      channelId: 'General',
      sticky: false,
      color: 'blue',
    },
  };
}

function createChannel() {
  return {
    name: 'default',
    sound: true,
    priority: 'max',
    vibrate: [0, 250, 250, 250],
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
          if (status === 'granted') {
            Notifications.createChannelAndroidAsync(CHANNEL_KEY, createChannel())
              .then(() => {
                Notifications.cancelAllScheduledNotificationsAsync();

                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(20);
                tomorrow.setMinutes(0);

                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  },
                );

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              })
              .catch(err => {
                console.log('err', err);
              });
          }
        });
      }
    });
}
