<<<<<<< HEAD
﻿// Display date and time in navbar
function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    document.getElementById('datetime').textContent = dateTimeString;
}
setInterval(updateDateTime, 1000);
updateDateTime();

function loadFeed(jsonPath, containerId) {
    fetch(jsonPath)
        .then(response => response.json())
        .then(posts => {
            const container = document.getElementById(containerId);
            posts.forEach(post => {
                const card = document.createElement('div');
                card.className = 'card mb-3 shadow-sm';
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${post.username}</h5>
                        <p class="card-text">${post.content}</p>
                        <p class="card-text"><small class="text-muted">${post.timestamp}</small></p>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error loading feed:", error);
        });
}
// Assuming Firebase Firestore is used to fetch user data and recent activities
const db = firebase.firestore();

// Fetch User Data
import { getDatabase, ref, push, update } from "firebase/database";

function writeNewPost(userId, username, title, body) {
    const db = getDatabase();
    const postListRef = ref(db, 'posts');
    const newPostRef = push(postListRef);
    update(newPostRef, {
        author: username,
        uid: userId,
        body: body,
        title: title,
    });
}

// Fetch Recent Activities
function getRecentActivities(userId) {
    db.collection('activities')
        .where('userId', '==', userId)
        .orderBy('timestamp', 'desc')
        .limit(5)
        .get()
        .then(snapshot => {
            const activitiesList = document.getElementById('activitiesList');
            activitiesList.innerHTML = ''; // Clear previous activities
            snapshot.forEach(doc => {
                const activity = doc.data();
                const li = document.createElement('li');
                li.innerHTML = `Posted a new update on <a href="#">${activity.platform}</a>`;
                activitiesList.appendChild(li);
            });
        })
        .catch(err => {
            console.log("Error fetching activities:", err);
        });
}

// Auth observer
auth.onAuthStateChanged(user => {
    if (!user) return location.href = 'profile.html';

    // Fetch user data and recent activities from Firestore
    const userId = user.uid;
    navUser.textContent = user.displayName || 'User';
    userName.textContent = user.displayName || 'User';
    getUserData(userId);
    getRecentActivities(userId);

    // avatar precedence: firebase photoURL → UI-Avatars
    navAvatar.src = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=007bff&color=fff&size=64`;
});
=======
﻿// Display date and time in navbar
function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    document.getElementById('datetime').textContent = dateTimeString;
}
setInterval(updateDateTime, 1000);
updateDateTime();

function loadFeed(jsonPath, containerId) {
    fetch(jsonPath)
        .then(response => response.json())
        .then(posts => {
            const container = document.getElementById(containerId);
            posts.forEach(post => {
                const card = document.createElement('div');
                card.className = 'card mb-3 shadow-sm';
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${post.username}</h5>
                        <p class="card-text">${post.content}</p>
                        <p class="card-text"><small class="text-muted">${post.timestamp}</small></p>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error loading feed:", error);
        });
}
// Assuming Firebase Firestore is used to fetch user data and recent activities
const db = firebase.firestore();

// Fetch User Data
import { getDatabase, ref, push, update } from "firebase/database";

function writeNewPost(userId, username, title, body) {
    const db = getDatabase();
    const postListRef = ref(db, 'posts');
    const newPostRef = push(postListRef);
    update(newPostRef, {
        author: username,
        uid: userId,
        body: body,
        title: title,
    });
}

// Fetch Recent Activities
function getRecentActivities(userId) {
    db.collection('activities')
        .where('userId', '==', userId)
        .orderBy('timestamp', 'desc')
        .limit(5)
        .get()
        .then(snapshot => {
            const activitiesList = document.getElementById('activitiesList');
            activitiesList.innerHTML = ''; // Clear previous activities
            snapshot.forEach(doc => {
                const activity = doc.data();
                const li = document.createElement('li');
                li.innerHTML = `Posted a new update on <a href="#">${activity.platform}</a>`;
                activitiesList.appendChild(li);
            });
        })
        .catch(err => {
            console.log("Error fetching activities:", err);
        });
}

// Auth observer
auth.onAuthStateChanged(user => {
    if (!user) return location.href = 'profile.html';

    // Fetch user data and recent activities from Firestore
    const userId = user.uid;
    navUser.textContent = user.displayName || 'User';
    userName.textContent = user.displayName || 'User';
    getUserData(userId);
    getRecentActivities(userId);

    // avatar precedence: firebase photoURL → UI-Avatars
    navAvatar.src = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=007bff&color=fff&size=64`;
});
>>>>>>> 5f85b853791a9fa436df4ac7a04582cd2b4408d1
