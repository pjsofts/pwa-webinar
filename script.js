const todos = [];
function add() {
  const task = document.getElementById("task").value;
  todos.push(task);
  render();
}

function render() {
  const list = document.getElementById("todos");
  list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo;
    list.appendChild(li);
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        // console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function subscribe() {
  navigator.serviceWorker.ready.then(function (registration) {
    registration.pushManager
      .subscribe({
        userVisibleOnly: true, // Ensure that every push has a visible notification
        applicationServerKey: urlBase64ToUint8Array(
          "BB4GUgHL5_Goi7U2QqaFs2mHK4hIn2emVf3CgqzjMZH8Nf7MIqyhdLwmoSzq_xXu73XhFz-9G9Q0Tpn-z1Z74k4"
        ),
      })
      .then(function (subscription) {
        console.log("User is subscribed:", subscription);

        // Send subscription object to your server to send push notifications
        // sendSubscriptionToServer(subscription);
      })
      .catch(function (error) {
        console.error("Failed to subscribe the user: ", error);
      });
  });
}

function askNotificationPermission() {
  if ("Notification" in window && navigator.serviceWorker) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        // You can now subscribe the user for push notifications
        subscribe();
      } else {
        console.log("Notification permission denied.");
      }
    });
  }
}

askNotificationPermission();

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent the mini-infobar from appearing
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;

  // Optionally, show your custom install button or UI
  showInstallPromotion();

  // Automatically trigger the prompt (optional, not recommended for UX)
  setTimeout(() => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    }
  }, 3000); // Delay to allow users to engage with your site first
});

function showInstallPromotion() {
  // Logic to show a custom button or banner for installing the PWA
  const installButton = document.getElementById("install-btn");
  installButton.style.display = "block";

  installButton.addEventListener("click", () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    }
  });
}

document.getElementById("name").textContent = localStorage.getItem("name");

localStorage.setItem("name", "John Doe");
