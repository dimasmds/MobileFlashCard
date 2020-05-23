import React from 'react';
import {
  Platform,
  AsyncStorage,
} from 'react-native';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'MobileFlashcards:notification';


const createNotification = () => ({
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
});

export const setNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        registerForPushNotificationsAsync();
      }
    });
};

const registerForPushNotificationsAsync = async () => {
  const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  if (Platform.OS === 'android') {
    await Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
    await Notifications.cancelAllScheduledNotificationsAsync();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(20);
    tomorrow.setMinutes(0);

    Notifications.scheduleLocalNotificationAsync(createNotification(), {
      time: tomorrow,
      repeat: 'day',
    });

    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
  }
};

export const clearNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync);
};
