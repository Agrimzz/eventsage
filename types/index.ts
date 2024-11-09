// ====== EVENT PARAMS
export type CreateEventParams = {
  userId: string
  event: {
    title: string
    description: string
    info: string
    location: string
    imageUrl: string
    startDateTime: Date
    endDateTime: Date
    category: string
    price: number
    ticketDate: Date
    url: string
    mapLink: string
  }
  path: string
}

export type UpdateEventParams = {
  userId: string
  event: {
    _id: string
    title: string
    imageUrl: string
    description: string
    location: string
    startDateTime: Date
    endDateTime: Date
    categoryId: string
    price: string
    isFree: boolean
    url: string
  }
  path: string
}

export type GetAllEventsParams = {
  query: string
  category: string
  limit: number
  page: number
}

export type Organizer = {
  _id: string
  username: string
  email: string
}

export type EventDetails = {
  _id: string
  title: string
  category: string
  description: string
  info: string
  imageUrl: string
  startDateTime: string
  endDateTime: string
  location: string
  mapLink: string
  url: string
  price: number
  ticketDate: string
  organizer: Organizer
  createdAt: string
  updatedAt: string
}
