const READER = 'reader_';

export function loadReader(key) {
    return JSON.parse(window.localStorage.getItem(READER + key) || '[]')
}

export function saveReader(key, val) {
    window.localStorage.setItem(READER + key, JSON.stringify(val));
}