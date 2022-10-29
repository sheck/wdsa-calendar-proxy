import type { VercelRequest, VercelResponse } from "@vercel/node"

export default function handler(
  _request: VercelRequest,
  response: VercelResponse
) {
  run(response)
}

async function run(response: VercelResponse) {
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
