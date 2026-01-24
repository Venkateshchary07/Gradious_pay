import "./BusTicket.css";


import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";

export default function BusBooking() {

    const [tripType, setTripType] = useState("oneway");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [seatType, setSeatType] = useState("");
    const [acOnly, setAcOnly] = useState(false);
    const [date, setDate] = useState("");

    const swapCities = () => {
        setFrom(to);
        setTo(from);
    };

    const handleSearch = () => {
        if (!from || !to || !date) {
            alert("Please fill From, To and Date");
            return;
        }

        console.log({
            tripType,
            from,
            to,
            seatType,
            acOnly,
            date
        });

        alert("Search buses (API integration later)");
    };
    function BusOffers() {
    return (
        <div className="bus-offers-wrapper">
            <h3>Best offers for you</h3>

            <div className="bus-offers-container">

                {/* Offer 1 */}
                <div className="offer-card">
                    <img src="./public/BusOffer/bus_img1.png" alt="Offer 1" />
                    <div className="offer-overlay">
                        <p className="offer-title">Winter Carnival</p>
                        <p className="offer-text">Up to 20% off on Bus tickets</p>
                        <button>Book Now →</button>
                    </div>
                </div>

                {/* Offer 2 */}
                <div className="offer-card">
                    <img src="./public/BusOffer/bus_img2.png" alt="Offer 2" />
                    <div className="offer-overlay">
                        <p className="offer-title">Winter Delights!</p>
                        <p className="offer-text">Save up to 15%</p>
                        <button>Book Bus Tickets →</button>
                    </div>
                </div>

                {/* Offer 3 */}
                <div className="offer-card">
                    <img src="./public/BusOffer/bus_img3.png" alt="Offer 3" />
                    <div className="offer-overlay">
                        <p className="offer-title">Save Big</p>
                        <p className="offer-text">Up to ₹200 off</p>
                        <button>Book Tickets →</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

    return (
        <>
           

            <div className="BusBooking-Wrapper">
                <h2>Book Bus Tickets</h2>

                <div className="BusBooking-Card">

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

                    {/* Seat Type */}
                    <div className="seat-type">
                        <span>Seat type (optional)</span>
                        <button onClick={() => setSeatType("Seater")}>Seater</button>
                        <button onClick={() => setSeatType("Sleeper")}>Sleeper</button>
                        <button onClick={() => setSeatType("Semi-Sleeper")}>Semi-Sleeper</button>
                    </div>

                    {/* AC Only */}
                    <div className="ac-only">
                        <input
                            type="checkbox"
                            checked={acOnly}
                            onChange={() => setAcOnly(!acOnly)}
                        />
                        <label>Show AC Buses only</label>
                    </div>

                    {/* Date */}
                    <div className="date-section">
                        <label>Departure Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    {/* Search */}
                    <button className="search-btn" onClick={handleSearch}>
                        Search Buses
                    </button>

                </div>
            </div>
            <BusOffers/>

        </>
    );
}
