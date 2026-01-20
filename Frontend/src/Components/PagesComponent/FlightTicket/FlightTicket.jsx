import "./FlightTicket.css";

import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";

export default function FlightBooking() {

    const [tripType, setTripType] = useState("oneway");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departDate, setDepartDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [passengers, setPassengers] = useState("1 Traveller, Economy");
    const [fare, setFare] = useState("");
    const [nonStop, setNonStop] = useState(false);

    const swapCities = () => {
        setFrom(to);
        setTo(from);
    };

    const handleSearch = () => {
        if (!from || !to || !departDate) {
            alert("Please fill From, To and Departure Date");
            return;
        }

        console.log({
            tripType,
            from,
            to,
            departDate,
            returnDate,
            passengers,
            fare,
            nonStop
        });

        alert("Flight search initiated (API integration later)");
    };



   function FlightOffers() {
    return (
        <div className="flight-offers-wrapper">

            {/* My Bookings */}
            <div className="my-bookings-card">
                <span>🧳 My Bookings</span>
                <span className="arrow">→</span>
            </div>

            {/* Top Offers */}
            <h3>Best offers for you</h3>
            <div className="flight-offers-container">

                <div className="flight-offer-card">
                    <img src="./public/FlightOffer/flight_img1.png" alt="Offer" />
                    <div className="overlay">
                        <p className="title">Winter Carnival</p>
                        <p>Save up to 15%</p>
                        <button>Book Flight Tickets →</button>
                    </div>
                </div>

                <div className="flight-offer-card">
                    <img src="./public/FlightOffer/flight_img2.png" alt="Offer" />
                    <div className="overlay">
                        <p className="title">Winter Escapes</p>
                        <p>Flat 15% off</p>
                        <button>Book Now →</button>
                    </div>
                </div>

                <div className="flight-offer-card">
                    <img src="./public/FlightOffer/flight_img3.png" alt="Offer" />
                    <div className="overlay">
                        <p className="title">Travel Pass</p>
                        <p>Just ₹899</p>
                        <button>Get Pass →</button>
                    </div>
                </div>

            </div>

            {/* Special Fare Offers */}
            <h3>Special Fares Offers</h3>
            <div className="special-fare-container">

                <div className="fare-card">
                    <img src="./public/FlightOffer/flight_img4.png" alt="Student" />
                    <p>Student</p>
                </div>

                <div className="fare-card">
                    <img src="./public/FlightOffer/flight_img5.png" alt="Armed Forces" />
                    <p>Armed Forces</p>
                </div>

                <div className="fare-card">
                    <img src="./public/FlightOffer/flight_img6.png" alt="Senior Citizen" />
                    <p>Senior Citizen</p>
                </div>

            </div>
        </div>
    );
}

    return (
        <>

            <div className="flight-wrapper">
                <h2>Book Flight Tickets</h2>

                <div className="flight-card">

                    {/* Trip Type */}
                    <div className="trip-type">
                        <label>
                            <input
                                type="radio"
                                checked={tripType === "oneway"}
                                onChange={() => setTripType("oneway")}
                            />
                            One Way
                        </label>

                        <label>
                            <input
                                type="radio"
                                checked={tripType === "round"}
                                onChange={() => setTripType("round")}
                            />
                            Round Trip
                        </label>
                    </div>

                    {/* From To */}
                    <div className="from-to">
                        <input
                            type="text"
                            placeholder="From"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        />

                        <button className="swap-btn" onClick={swapCities}>
                            <ArrowLeftRight size={18} />
                        </button>

                        <input
                            type="text"
                            placeholder="To"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </div>

                    {/* Dates */}
                    <div className="date-row">
                        <div>
                            <label>Departure</label>
                            <input
                                type="date"
                                value={departDate}
                                onChange={(e) => setDepartDate(e.target.value)}
                            />
                        </div>

                        {tripType === "round" && (
                            <div>
                                <label>Return</label>
                                <input
                                    type="date"
                                    value={returnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                />
                            </div>
                        )}

                        <div>
                            <label>Passengers & Class</label>
                            <select
                                value={passengers}
                                onChange={(e) => setPassengers(e.target.value)}
                            >
                                <option>1 Traveller, Economy</option>
                                <option>2 Travellers, Economy</option>
                                <option>1 Traveller, Business</option>
                            </select>
                        </div>
                    </div>

                    {/* Special Fares */}
                    <div className="special-fares">
                        <span>Special Fares (optional)</span>
                        <button onClick={() => setFare("Student")}>Student</button>
                        <button onClick={() => setFare("Armed Forces")}>Armed Forces</button>
                        <button onClick={() => setFare("Senior Citizen")}>Senior Citizen</button>
                    </div>

                    {/* Non-stop */}
                    <div className="non-stop">
                        <input
                            type="checkbox"
                            checked={nonStop}
                            onChange={() => setNonStop(!nonStop)}
                        />
                        <label>Show Non-stop flights only</label>
                    </div>

                    {/* Search */}
                    <button className="search-flight-btn" onClick={handleSearch}>
                        Search Flights
                    </button>

                </div>
            </div>
            <FlightOffers/>
        </>
    );
}
