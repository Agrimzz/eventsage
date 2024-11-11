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
    description: string
    info: string
    location: string
    imageUrl: string
    prevImageUrl: string
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

export type DeleteEventParams = {
  id: string
  path: string
}

export type GetAllEventsParams = {
  query: string
  category: string
  limit: number
  page: number
}
export type GetEventsByUserParams = {
  id: string
  limit: number
  page: number
}

export type Organizer = {
  _id: string
  username: string
  email: string
  image: string
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
  views: number
  ticketDate: string
  organizer: Organizer
  createdAt: string
  updatedAt: string
}

export type CreateOrderParams = {
  tid: string
  eventId: string
  buyerId: string
  totalAmount: string
}

export type GetOrdersByEventParams = {
  eventId: string
  searchString: string
}

export type GetOrdersByUserParams = {
  userId: string
  limit?: number
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
