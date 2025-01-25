# Hotel Room Reservation System

A React-based interactive hotel room reservation system that dynamically assigns, highlights, and tracks room bookings while ensuring usability with visual feedback for the user. The application also allows resetting room statuses and randomizing room availability.

---

## Features

- *Dynamic Room Selection*: Displays floors and rooms in a grid, allowing selection of the optimal set of rooms based on input.
- *Room Highlighting*: Booked rooms are displayed in green to differentiate them from available rooms.
- *Random Availability*: Randomizes room availability while updating the input field to reflect the number of available rooms.
- *Reset Functionality*: Resets the grid to its initial state with all rooms available.
- *Travel Time Calculation*: Calculates the total travel time to access the selected rooms based on the room configuration.

---

## Project Structure


src/
|-- components/
|   |-- App.tsx      # Main component for hotel room reservation
|-- styles/
|   |-- App.css      # CSS styles for the application
|-- index.tsx        # Entry point for React application


---

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   bash
   git clone https://github.com/theDevSoham/hotels_room_booking.git
   

2. Navigate to the project directory:
   bash
   cd hotel-reservation-system
   

3. Install dependencies:
   bash
   npm install
   # or
   yarn install
   

4. Start the development server:
   bash
   npm start
   # or
   yarn start
   

5. Open the application in your browser:
   
   http://localhost:5173
   

---

## Usage

### Booking Rooms
1. Enter the desired number of rooms to book in the input field.
2. Click the "Book" button to select the best rooms based on travel time.
3. Booked rooms will be highlighted in green.

### Resetting Rooms
- Click the "Reset" button to return all rooms to their initial state.

### Randomizing Room Availability
1. Click the "Random" button to simulate random availability of rooms.
2. The number input field will update to reflect the number of available rooms.
3. Randomly available rooms will be highlighted for selection.

---

## CSS Customization

The App.css file contains the following key classes for styling:

- .room - Styles individual room blocks.
- .room.selected - Styles selected (booked) rooms.
- .room.unavailable - Styles unavailable rooms.
- .container - Defines the grid and layout.

---

## Future Enhancements

- Add user authentication for personalized room booking.
- Integrate a backend system to track real-time bookings.
- Expand features to handle room-specific details (e.g., size, type).
- Provide a detailed travel time breakdown.

---

## Contributions

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature:
   bash
   git checkout -b feature-name
   
3. Commit your changes:
   bash
   git commit -m "Add feature-name"
   
4. Push your changes:
   bash
   git push origin feature-name
   
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

For any inquiries or feedback, please contact [sohamdas673@gmail.com](mailto:your.email@example.com).

---