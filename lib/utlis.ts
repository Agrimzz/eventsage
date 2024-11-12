export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function formatDateTime(date: string | Date) {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  })
}

export function generateMapEmbedUrlFromLink(url: string) {
  // Regex to capture the primary latitude and longitude (either at "@..." or within "3d...4d" sections)
  const latLngRegex = /@([-.\d]+),([-.\d]+)|3d([-.\d]+)!4d([-.\d]+)/g
  let match
  let latitude = null
  let longitude = null

  // Loop through matches to get the last lat/lon pair
  while ((match = latLngRegex.exec(url)) !== null) {
    latitude = match[1] || match[3]
    longitude = match[2] || match[4]
  }

  // Check if latitude and longitude were found
  if (latitude && longitude) {
    return `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${latitude},${longitude}&t=&z=14&ie=UTF8&iwloc=B&output=embed`
  }

  return null // Return null if no coordinates were found
}
