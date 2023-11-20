export default class Observer {
    _observers = []

    subscribe = (callback) => {
        this._observers.push(callback)
    }

    notify = () => {
        this._observers.forEach((callback) => callback())
    }
}