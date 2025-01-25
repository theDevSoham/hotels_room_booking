import React, { useState } from "react";
import "./App.css"; // Add a CSS file for styles if needed

type Floors = { [key: number]: number[] };

type Result = {
  bestRooms: number[];
  travelTime: number;
} | string | null;

const App: React.FC = () => {
  const initialFloors: Floors = {
    1: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
    2: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210],
    3: [301, 302, 303, 304, 305, 306, 307, 308, 309, 310],
    4: [401, 402, 403, 404, 405, 406, 407, 408, 409, 410],
    5: [501, 502, 503, 504, 505, 506, 507, 508, 509, 510],
    6: [601, 602, 603, 604, 605, 606, 607, 608, 609, 610],
    7: [701, 702, 703, 704, 705, 706, 707, 708, 709, 710],
    8: [801, 802, 803, 804, 805, 806, 807, 808, 809, 810],
    9: [901, 902, 903, 904, 905, 906, 907, 908, 909, 910],
    10: [1001, 1002, 1003, 1004, 1005, 1006, 1007],
  };

  const [floors, setFloors] = useState<Floors>(initialFloors);
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [numRooms, setNumRooms] = useState<number>(1);
  const [result, setResult] = useState<Result>(null);

  const calculateTravelTime = (rooms: number[]): number => {
    const floors = [...new Set(rooms.map((room) => Math.floor(room / 100)))];
    const horizontalTime = Math.max(...rooms) % 100 - Math.min(...rooms) % 100;
    const verticalTime = (Math.max(...floors) - Math.min(...floors)) * 2;
    return horizontalTime + verticalTime;
  };

  const findBestRooms = (numRooms: number): { bestRooms: number[] | null; minTime: number } => {
    let bestRooms: number[] | null = null;
    let minTime = Infinity;

    // Check single floor combinations
    Object.entries(floors).forEach(([_, rooms]) => {
      if (rooms.length >= numRooms) {
        for (let i = 0; i <= rooms.length - numRooms; i++) {
          const selectedRooms = rooms.slice(i, i + numRooms);
          const time = calculateTravelTime(selectedRooms);
          if (time < minTime) {
            minTime = time;
            bestRooms = selectedRooms;
          }
        }
      }
    });

    // Check multi-floor combinations if single floor is not enough
    if (!bestRooms) {
      const allRooms: number[] = [];
      Object.values(floors).forEach((rooms) => allRooms.push(...rooms));

      for (let i = 0; i <= allRooms.length - numRooms; i++) {
        const selectedRooms = allRooms.slice(i, i + numRooms);
        const time = calculateTravelTime(selectedRooms);
        if (time < minTime) {
          minTime = time;
          bestRooms = selectedRooms;
        }
      }
    }

    return { bestRooms, minTime };
  };

  const bookRooms = () => {
    const { bestRooms, minTime } = findBestRooms(numRooms);
    if (!bestRooms) {
      setResult("Not enough rooms available");
      return;
    }

    setSelectedRooms(bestRooms);
    const updatedFloors: Floors = { ...floors };
    bestRooms.forEach((room) => {
      const floor = Math.floor(room / 100);
      updatedFloors[floor] = updatedFloors[floor].filter((r) => r !== room);
    });

    setFloors(updatedFloors);
    setResult({ bestRooms, travelTime: minTime });
  };

  const resetRooms = () => {
    setFloors(initialFloors);
    setSelectedRooms([]);
    setResult(null);
  };

  const randomizeRooms = () => {
    const updatedFloors: Floors = { ...initialFloors };
    const allRooms: number[] = [];

    Object.keys(updatedFloors).forEach((floor) => {
      updatedFloors[Number(floor)] = updatedFloors[Number(floor)].filter(() => {
        const isSelected = Math.random() > 0.5;
        if (isSelected) {
          allRooms.push(Number(floor) * 100 + allRooms.length + 1);
        }
        return isSelected;
      });
    });

    setFloors(updatedFloors);
    setSelectedRooms(allRooms.slice(0, numRooms));
    setNumRooms(allRooms.length);
    setResult(null);
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Hotel Room Reservation System</h1>
      <div className="flex space-x-4 mb-4">
        <input
          type="number"
          min="1"
          max="5"
          value={numRooms}
          onChange={(e) => setNumRooms(Number(e.target.value))}
          className="px-5 py-3 border rounded"
          placeholder="No of Rooms"
        />
        <button
          onClick={bookRooms}
          className="px-5 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Book
        </button>
        <button
          onClick={resetRooms}
          className="px-5 py-3 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
        <button
          onClick={randomizeRooms}
          className="px-5 py-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Random
        </button>
      </div>
      <div className="container">
        <div className="grid grid-cols-11 gap-2">
          <div />
          <div />
          <div />
          <div />
          <div className="col-span-1 flex items-center justify-center border">Stairs</div>
          <div className="col-span-10 grid grid-cols-10 gap-2">
            {Object.entries(initialFloors).map(([floor, rooms]) => (
              <React.Fragment key={floor}>
                {rooms.map((room) => (
                  <div
                    key={room}
                    className={`h-10 w-10 border flex items-center justify-center ${selectedRooms.includes(room) ? "bg-green-300" : "bg-gray-200"
                      }`}
                  >
                    {room}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          {typeof result === "string" ? (
            <p>{result}</p>
          ) : (
            <div>
              <p className="mb-2 font-medium">Booked Rooms: {result.bestRooms.join(", ")}</p>
              <p className="font-medium">Total Travel Time: {result.travelTime} minutes</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
