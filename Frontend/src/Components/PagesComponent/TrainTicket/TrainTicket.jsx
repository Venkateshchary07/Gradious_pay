import "./TrainTicket.css";

import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";

export default function TrainTicket() {

    const [tripType, setTripType] = useState("oneway");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [journeyDate, setJourneyDate] = useState("");
    const [classType, setClassType] = useState("Sleeper (SL)");
    const [quota, setQuota] = useState("");
    const [onlyConfirmed, setOnlyConfirmed] = useState(false);

    const swapStations = () => {
        setFrom(to);
        setTo(from);
    };

    const handleSearch = () => {
        if (!from || !to || !journeyDate) {
            alert("Please fill From, To and Journey Date");
            return;
        }

        console.log({
            tripType,
            from,
            to,
            journeyDate,
            classType,
            quota,
            onlyConfirmed
        });

        alert("Train search initiated (API integration later)");
    };


    function TrainOffers() {
    return (
        <div className="flight-offers-wrapper">

            <div className="my-bookings-card">
                <span>🚆 My Train Bookings</span>
                <span>→</span>
            </div>

            <h3>Best offers for you</h3>

            <div className="flight-offers-container">

                <div className="flight-offer-card">
                    <img src="./public/TrainOffer/Train_img1.png" alt="Offer" />
                    <div className="overlay">
                        <p className="title">IRCTC Specials</p>
                        <p>Save on train tickets</p>
                        <button>Book Now →</button>
                    </div>
                </div>

                <div className="flight-offer-card">
                    <img src="./public/TrainOffer/Train_img2.png" alt="Offer" />
                    <div className="overlay">
                        <p className="title">Tatkal Booking</p>
                        <p>Fast & Secure</p>
                        <button>Check Trains →</button>
                    </div>
                </div>

                <div className="flight-offer-card">
                    <img src="./public/TrainOffer/Train_img3.png" alt="Offer" />
                    <div className="overlay">
                        <p className="title">Senior Citizen</p>
                        <p>Extra benefits</p>
                        <button>View Offers →</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

    return (
        <>

            <div className="train-wrapper">
                <h2>Book Train Tickets</h2>

                <div className="train-card">

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
                            placeholder="From Station"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        />

                        <button className="swap-btn" onClick={swapStations}>
                            <ArrowLeftRight size={18} />
                        </button>

                        <input
                            type="text"
                            placeholder="To Station"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </div>

                    {/* Date & Class */}
                    <div className="date-row">
                        <div>
                            <label>Journey Date</label>
                            <input
                                type="date"
                                value={journeyDate}
                                onChange={(e) => setJourneyDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Class</label>
                            <select
                                value={classType}
                                onChange={(e) => setClassType(e.target.value)}
                            >
                                <option>Sleeper (SL)</option>
                                <option>AC 3 Tier (3A)</option>
                                <option>AC 2 Tier (2A)</option>
                                <option>AC First Class (1A)</option>
                                <option>Second Sitting (2S)</option>
                            </select>
                        </div>

                        <div>
                            <label>Quota</label>
                            <select
                                value={quota}
                                onChange={(e) => setQuota(e.target.value)}
                            >
                                <option value="">General</option>
                                <option>Ladies</option>
                                <option>Senior Citizen</option>
                                <option>Tatkal</option>
                            </select>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="non-stop">
                        <input
                            type="checkbox"
                            checked={onlyConfirmed}
                            onChange={() => setOnlyConfirmed(!onlyConfirmed)}
                        />
                        <label>Show confirmed tickets only</label>
                    </div>

                    {/* Search */}
                    <button className="search-train-btn" onClick={handleSearch}>
                        Search Trains
                    </button>

                </div>
            </div>

            <TrainOffers />

        </>
    );
}
