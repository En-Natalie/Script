const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DB_PATH = path.join(__dirname, "userStore.json");

// Initialize file if it doesn't exist
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, "[]");
}

// helper functions
function loadUsers() {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
}

function saveUsers(users: any) {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

function hashPassword(password: any) {
    return crypto.createHash("sha256").update(password).digest("hex");
}

function isPasswordStrong(password: string) {
    return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password)
    );
}

// ========== SIGN UP ==========
function signUp(username: any, password: any) {
    const users = loadUsers();

    // check username in use
    if (users.some((u: { username: any; }) => u.username === username)) {
        return "username invalid";
    }

    // check password quality
    if (!isPasswordStrong(password)) {
        return "password valid";
    }

    // hash pass and store user
    users.push({
        username,
        password: hashPassword(password)
    });

    saveUsers(users);

    return "success";
}

// ========== LOGIN ==========
function isLoginSuccessful(username: any, password: any) {
    const users = loadUsers();
    const user = users.find((u: { username: any; }) => u.username === username);

    if (!user) return false; // username not found

    const hashed = hashPassword(password);
    return hashed === user.password;
}

module.exports = { signUp, isLoginSuccessful };