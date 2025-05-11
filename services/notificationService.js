import {app_id} from '../keys';
import {user_id} from '../keys';
import {api_key} from '../keys';

export async function scheduleNotification(task) {
    try {
        const notificationObj = {
            contents: { en: task.title + '\n' + task.description },
            send_after: task.reminderDate.toISOString(),
        };

        const response = await fetch('https://api.onesignal.com/notifications?c=push', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Key ${api_key}`,
            },
            body: JSON.stringify({
                app_id: app_id,
                target_channel: 'push',
                include_player_ids: [user_id],
                ...notificationObj,
            }),
        });

        const responseData = await response.json();
        return responseData.id;
    } catch (error) {
        console.error('Помилка при створенні сповіщення:', error);
        return null;
    }
}


export async function cancelNotification(notificationId) {
    try {
        const response = await fetch(`https://api.onesignal.com/notifications/${notificationId}?app_id=${app_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Key ${api_key}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Помилка при скасуванні сповіщення:', error);
    }
}
