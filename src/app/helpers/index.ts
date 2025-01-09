import EventEmitter2 from 'eventemitter2'

export function randomRoomID() {
  return Math.floor(Math.random() * 9999999).toString()
}

export function inheritEvents(a: EventEmitter2, b: EventEmitter2) {
  b.on('*', function (this: any, ...args: any[]) {
    a.emit(this.event, ...args)
  })
}

export function deserialize<T = any>(object: any, Classe: { new (obj: any): any }): T {
  if (!object) return object
  if (Array.isArray(object)) {
    return object.map((object) => deserialize(object, Classe)) as any
  }

  if (object instanceof Classe) return object
  return new Classe(object)
}
