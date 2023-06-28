export interface ToastEvent {
  type: EventTypes
  title: string
  message: string
}

export enum EventTypes {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error'
}
