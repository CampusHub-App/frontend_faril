import React, { useState, useEffect } from "react";
import Card from "../fragment/card";

function Cardpage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://campushub.web.id/api/events/all")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }
                return response.json();
            })
            .then((data) => {
                setEvents(data.events);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-wrap justify-around px-14 gap-y-10 relative z-10">
            {events.map((event) => (
                <Card key={event.id}>
                    <Card.Image image={event.foto_event}></Card.Image>
                    <Card.Kategori kategori={event.category_name}>
                        {event.category_name === "Webinar" ? "Khusus UB" : "Publik"}
                    </Card.Kategori>
                    <Card.Body title={event.judul}>{event.deskripsi}</Card.Body>
                    <Card.Tanggal>{new Date(event.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</Card.Tanggal>
                    <Card.Creator
                        image={event.foto_pembicara}
                        nama={event.pembicara}
                        title={event.role}
                    ></Card.Creator>
                </Card>
            ))}
        </div>
    );
}

export default Cardpage;