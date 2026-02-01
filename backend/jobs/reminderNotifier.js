import cron from 'node-cron';
import Reminder from '../models/reminderModel.js';
import Notification from '../models/notificationModel.js';

cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    const inOneMinute = new Date(now.getTime() + 60000);

    const dueReminders = await Reminder.find({
      scheduledAt: { $lte: inOneMinute },
      notified: false,
    });

    for (const reminder of dueReminders) {
      await Notification.create({
        user: reminder.user,
        title: '🔔 Reminder',
        body: `${reminder.title} is scheduled now.`,
        plant: reminder.plant || null,
      });

      if (reminder.repeat === 'daily') {
  reminder.scheduledAt = new Date(reminder.scheduledAt.getTime() + 24 * 60 * 60 * 1000);
  reminder.notified = false;
} else if (reminder.repeat === 'weekly') {
  reminder.scheduledAt = new Date(reminder.scheduledAt.getTime() + 7 * 24 * 60 * 60 * 1000);
  reminder.notified = false;
} else {
  reminder.notified = true;
}
await reminder.save();

      console.log(`✅ Reminder notification sent for: ${reminder.title}`);
    }
  } catch (err) {
    console.error('❌ Reminder scheduler error:', err);
  }
});
