import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "name", "output" ]

    connect() {
        console.log('hi stimulus')
    }

  greet() {
    this.outputTarget.textContent =
      `Hello, ${this.nameTarget.value}!`
  }
}
