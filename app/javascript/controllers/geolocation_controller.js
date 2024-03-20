import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input"]

  handleClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.handleSuccess.bind(this),
        this.handleError.bind(this)
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
    }
  }

  handleSuccess(position) {
    const { latitude, longitude } = position.coords
    this.sendLocationToRails(latitude, longitude)
  }

  handleError(error) {
    console.error(`Geolocation error: ${error.message}`)
  }

  sendLocationToRails(latitude, longitude) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content

    // Action with search_location_controller.rb with method POST
    fetch("/search_location", {
      // FETCH use to send HTTP request to Controller
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      // JSON.stringify Phần thân của yêu cầu chứa dữ liệu gửi đến máy chủ dưới dạng JSON.
      body: JSON.stringify({ latitude, longitude }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (data.address.state) {
          this.inputTarget.value = data.address.state
        } else if (data.address.city) {
          this.inputTarget.value = data.address.city
        }
        // AJAX IN VÀO INPUT TRONG VIEW
      })
      .catch((error) => {
        console.error("Error communicating with Rails:", error)
      })
  }
}