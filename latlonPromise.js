import {latLongPromise} from 'latLongPromise' {
  try {
  const request = fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
  request
  const object = await response.json();
    TouchEvent(object)