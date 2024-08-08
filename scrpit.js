const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error("No support for service worker!")
    }

    if (!('Notification' in window)) {
        throw new Error("No support for notification API");
    }

    if (!('PushManager' in window)) {
        throw new Error("No support for Push API")
    }
}

const registerSW = async () => {
    const registration = await navigator.serviceWorker.register('sw.js');
    return registration;
}

const requestNotificationPermission = async () => {
    if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
    } else if (Notification.permission === 'granted') {
        new Notification('Notifications are already enabled.');
    } else {
        alert('Notifications have been denied.');
    }

}

const main = async () => {
    checkPermission()
    await requestNotificationPermission()
    await registerSW()
}
