import { Application } from "@hotwired/stimulus"
import "mapkick/bundle"
import GeolocationController from "./geolocation_controller"
const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application
Stimulus.register("geolocation", GeolocationController)

export { application }