import fetch from "node-fetch"

export default function handler(_request, response) {
  run(response)
}

async function run(response) {
  const calResponse = await fetch(
    "https://calendar.google.com/calendar/ical/whatcomdsa%40gmail.com/public/basic.ics"
  )
  const calText = await calResponse.text()
  // Otherwise browser will render as text
  response.setHeader("Content-Type", "text/calendar")
  // Cache for 5 minutes in the browser, and on vercel's edge cache
  response.setHeader("Cache-Control", "max-age=300, s-maxage=300")
  response.send(calText)
}
