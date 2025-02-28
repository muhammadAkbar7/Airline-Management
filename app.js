// Citation for the following code: 
// Date: 02/27/2025
// Following app.js setup, database connection, routes, and get methods are based on the startup 
// activity 2 from CS340, largely using the same dependencies and syntax to set up the connection and express middleware. 
// Source URL: https://canvas.oregonstate.edu/courses/1987790/assignments/9888486?module_item_id=25022943


// app.js (updated with routes for all entities)
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const { clear } = require('console');

const app = express();
const port = 2900;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public', {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
  }
}));

// Database connection
const db = mysql.createConnection({
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_akbarmu',
    password: 'tFZkFp1gRFu4',
    database: 'cs340_akbarmu'
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// General Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Citation for the following code: 
// Date: 02/27/2025
// Following get and post methods are based on the code descibed in the nodejs starter app. 
// The methods described are similar in syntax/function, but handwritten to accomodate the specific database and queries. 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// ROUTES ENTITY
app.get('/api/routes', (req, res) => {
    const query = `
        SELECT routeId, originAirport, destinationAirport, distanceKilometers, durationSeconds
        FROM Routes
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching routes:', err);
            res.status(500).send('Error fetching routes');
            return;
        }
        
        res.json(results);
    });
});

app.post('/api/routes', (req, res) => {
    const { originAirport, destinationAirport, distanceKilometers, durationSeconds } = req.body;
    
    const query = `
        INSERT INTO Routes (originAirport, destinationAirport, distanceKilometers, durationSeconds)
        VALUES (?, ?, ?, ?)
    `;
    
    db.query(query, [originAirport, destinationAirport, distanceKilometers, durationSeconds], (err, result) => {
        if (err) {
            console.error('Error adding route:', err);
            res.status(500).send('Error adding route');
            return;
        }
        
        res.json({ id: result.insertId, message: 'Route added successfully' });
    });
});

app.post('/api/routes/update', (req, res) => {
    const { routeId, originAirport, destinationAirport, distanceKilometers, durationSeconds } = req.body;
    
    const query = `
        UPDATE Routes
        SET originAirport = ?, destinationAirport = ?, distanceKilometers = ?, durationSeconds = ?
        WHERE routeId = ?
    `;
    
    db.query(query, [originAirport, destinationAirport, distanceKilometers, durationSeconds, routeId], (err) => {
        if (err) {
            console.error('Error updating route:', err);
            res.status(500).send('Error updating route');
            return;
        }
        
        res.json({ message: 'Route updated successfully' });
    });
});

app.post('/api/routes/delete', (req, res) => {
    const { routeId } = req.body;
    
    const query = `
        DELETE FROM Routes
        WHERE routeId = ?
    `;
    
    db.query(query, [routeId], (err) => {
        if (err) {
            console.error('Error deleting route:', err);
            res.status(500).send('Error deleting route');
            return;
        }
        
        res.json({ message: 'Route deleted successfully' });
    });
});

// FLIGHTS ENTITY
app.get('/api/flights', (req, res) => {
    const query = `
        SELECT flightId, departureAt, routeId, aircraftId, flightStatus
        FROM Flights
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching flights:', err);
            res.status(500).send('Error fetching flights');
            return;
        }
        
        res.json(results);
    });
});

app.post('/api/flights', (req, res) => {
    const { departureAt, routeId, aircraftId, flightStatus } = req.body;
    
    const query = `
        INSERT INTO Flights (departureAt, routeId, aircraftId, flightStatus)
        VALUES (?, ?, ?, ?)
    `;
    
    db.query(query, [departureAt, routeId, aircraftId, flightStatus], (err, result) => {
        if (err) {
            console.error('Error adding flight:', err);
            res.status(500).send('Error adding flight');
            return;
        }
        
        res.json({ id: result.insertId, message: 'Flight added successfully' });
    });
});

app.post('/api/flights/update', (req, res) => {
    const { flightId, departureAt, routeId, aircraftId, flightStatus } = req.body;
    
    const query = `
        UPDATE Flights
        SET departureAt = ?, routeId = ?, aircraftId = ?, flightStatus = ?
        WHERE flightId = ?
    `;
    
    db.query(query, [departureAt, routeId, aircraftId, flightStatus, flightId], (err) => {
        if (err) {
            console.error('Error updating flight:', err);
            res.status(500).send('Error updating flight');
            return;
        }
        
        res.json({ message: 'Flight updated successfully' });
    });
});

app.post('/api/flights/delete', (req, res) => {
    const { flightId } = req.body;
    
    const query = `
        DELETE FROM Flights
        WHERE flightId = ?
    `;
    
    db.query(query, [flightId], (err) => {
        if (err) {
            console.error('Error deleting flight:', err);
            res.status(500).send('Error deleting flight');
            return;
        }
        
        res.json({ message: 'Flight deleted successfully' });
    });
});

// AIRCRAFT ENTITY
app.get('/api/aircraft', (req, res) => {
    const query = `
        SELECT aircraftId, model, capacity, aircraftStatus
        FROM Aircraft
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching aircraft:', err);
            res.status(500).send('Error fetching aircraft');
            return;
        }
        
        res.json(results);
    });
});

app.post('/api/aircraft', (req, res) => {
    const { model, capacity, aircraftStatus } = req.body;
    
    const query = `
        INSERT INTO Aircraft (model, capacity, aircraftStatus)
        VALUES (?, ?, ?)
    `;
    
    db.query(query, [model, capacity, aircraftStatus], (err, result) => {
        if (err) {
            console.error('Error adding aircraft:', err);
            res.status(500).send('Error adding aircraft');
            return;
        }
        
        res.json({ id: result.insertId, message: 'Aircraft added successfully' });
    });
});

app.post('/api/aircraft/update', (req, res) => {
    const { aircraftId, model, capacity, aircraftStatus } = req.body;
    
    const query = `
        UPDATE Aircraft
        SET model = ?, capacity = ?, aircraftStatus = ?
        WHERE aircraftId = ?
    `;
    
    db.query(query, [model, capacity, aircraftStatus, aircraftId], (err) => {
        if (err) {
            console.error('Error updating aircraft:', err);
            res.status(500).send('Error updating aircraft');
            return;
        }
        
        res.json({ message: 'Aircraft updated successfully' });
    });
});

app.post('/api/aircraft/delete', (req, res) => {
    const { aircraftId } = req.body;
    
    const query = `
        DELETE FROM Aircraft
        WHERE aircraftId = ?
    `;
    
    db.query(query, [aircraftId], (err) => {
        if (err) {
            console.error('Error deleting aircraft:', err);
            res.status(500).send('Error deleting aircraft');
            return;
        }
        
        res.json({ message: 'Aircraft deleted successfully' });
    });
});

// SEATS ENTITY
app.get('/api/seats', (req, res) => {
    const query = `
        SELECT seatId, aircraftId, seatNumber, seatClass
        FROM Seats
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching seats:', err);
            res.status(500).send('Error fetching seats');
            return;
        }
        
        res.json(results);
    });
});

app.post('/api/seats', (req, res) => {
    const { aircraftId, seatNumber, seatClass } = req.body;
    
    const query = `
        INSERT INTO Seats (aircraftId, seatNumber, seatClass)
        VALUES (?, ?, ?)
    `;
    
    db.query(query, [aircraftId, seatNumber, seatClass], (err, result) => {
        if (err) {
            console.error('Error adding seat:', err);
            res.status(500).send('Error adding seat');
            return;
        }
        
        res.json({ id: result.insertId, message: 'Seat added successfully' });
    });
});

app.post('/api/seats/update', (req, res) => {
    const { seatId, aircraftId, seatNumber, seatClass } = req.body;
    
    const query = `
        UPDATE Seats
        SET aircraftId = ?, seatNumber = ?, seatClass = ?
        WHERE seatId = ?
    `;
    
    db.query(query, [aircraftId, seatNumber, seatClass, seatId], (err) => {
        if (err) {
            console.error('Error updating seat:', err);
            res.status(500).send('Error updating seat');
            return;
        }
        
        res.json({ message: 'Seat updated successfully' });
    });
});

app.post('/api/seats/delete', (req, res) => {
    const { seatId } = req.body;
    
    const query = `
        DELETE FROM Seats
        WHERE seatId = ?
    `;
    
    db.query(query, [seatId], (err) => {
        if (err) {
            console.error('Error deleting seat:', err);
            res.status(500).send('Error deleting seat');
            return;
        }
        
        res.json({ message: 'Seat deleted successfully' });
    });
});

// PASSENGERS ENTITY
app.get('/api/passengers', (req, res) => {
    const query = `
        SELECT passengerId, name, emailAddress, phoneNumber
        FROM Passengers
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching passengers:', err);
            res.status(500).send('Error fetching passengers');
            return;
        }
        
        res.json(results);
    });
});

app.post('/api/passengers', (req, res) => {
    const { name, emailAddress, phoneNumber } = req.body;
    
    const query = `
        INSERT INTO Passengers (name, emailAddress, phoneNumber)
        VALUES (?, ?, ?)
    `;
    
    db.query(query, [name, emailAddress, phoneNumber], (err, result) => {
        if (err) {
            console.error('Error adding passenger:', err);
            res.status(500).send('Error adding passenger');
            return;
        }
        
        res.json({ id: result.insertId, message: 'Passenger added successfully' });
    });
});

app.post('/api/passengers/update', (req, res) => {
    const { passengerId, name, emailAddress, phoneNumber } = req.body;
    
    const query = `
        UPDATE Passengers
        SET name = ?, emailAddress = ?, phoneNumber = ?
        WHERE passengerId = ?
    `;
    
    db.query(query, [name, emailAddress, phoneNumber, passengerId], (err) => {
        if (err) {
            console.error('Error updating passenger:', err);
            res.status(500).send('Error updating passenger');
            return;
        }
        
        res.json({ message: 'Passenger updated successfully' });
    });
});

app.post('/api/passengers/delete', (req, res) => {
    const { passengerId } = req.body;
    
    const query = `
        DELETE FROM Passengers
        WHERE passengerId = ?
    `;
    
    db.query(query, [passengerId], (err) => {
        if (err) {
            console.error('Error deleting passenger:', err);
            res.status(500).send('Error deleting passenger');
            return;
        }
        
        res.json({ message: 'Passenger deleted successfully' });
    });
});

// BOOKINGS ENTITY
app.get('/api/bookings', (req, res) => {
    const query = `
        SELECT b.bookingId, b.flightId, b.seatId, b.passengerId, p.name, f.departureAt, s.seatNumber 
        FROM Bookings b
        LEFT JOIN Passengers p ON b.passengerId = p.passengerId
        LEFT JOIN Flights f ON b.flightId = f.flightId
        LEFT JOIN Seats s ON b.seatId = s.seatId
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            res.status(500).send('Error fetching bookings');
            return;
        }
        
        res.json(results);
    });
});

app.post('/api/bookings', (req, res) => {
    const { flightId, seatId, passengerId } = req.body;
    
    const query = `
        INSERT INTO Bookings (flightId, seatId, passengerId)
        VALUES (?, ?, ?)
    `;
    
    db.query(query, [flightId, seatId, passengerId], (err, result) => {
        if (err) {
            console.error('Error adding booking:', err);
            res.status(500).send('Error adding booking');
            return;
        }
        
        res.json({ id: result.insertId, message: 'Booking added successfully' });
    });
});

app.post('/api/bookings/update', (req, res) => {
    const { bookingId, flightId, seatId, passengerId } = req.body;
    
    const query = `
        UPDATE Bookings
        SET flightId = ?, seatId = ?, passengerId = ?
        WHERE bookingId = ?
    `;
    
    db.query(query, [flightId, seatId, passengerId, bookingId], (err) => {
        if (err) {
            console.error('Error updating booking:', err);
            res.status(500).send('Error updating booking');
            return;
        }
        
        res.json({ message: 'Booking updated successfully' });
    });
});

app.post('/api/bookings/delete', (req, res) => {
    const { bookingId } = req.body;
    
    const query = `
        DELETE FROM Bookings
        WHERE bookingId = ?
    `;
    
    db.query(query, [bookingId], (err) => {
        if (err) {
            console.error('Error deleting booking:', err);
            res.status(500).send('Error deleting booking');
            return;
        }
        
        res.json({ message: 'Booking deleted successfully' });
    });
});

// EMPLOYEES ENTITY
app.get('/api/employees', (req, res) => {
    const query = `
        SELECT employeeId, employeeName, jobRole, phoneNumber
        FROM Employees
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching employees:', err);
            res.status(500).send('Error fetching employees');
            return;
        }
        
        res.json(results);
    });
});

app.post('/api/employees', (req, res) => {
    const { employeeName, jobRole, phoneNumber } = req.body;
    
    const query = `
        INSERT INTO Employees (employeeName, jobRole, phoneNumber)
        VALUES (?, ?, ?)
    `;
    
    db.query(query, [employeeName, jobRole, phoneNumber], (err, result) => {
        if (err) {
            console.error('Error adding employee:', err);
            res.status(500).send('Error adding employee');
            return;
        }
        
        res.json({ id: result.insertId, message: 'Employee added successfully' });
    });
});

app.post('/api/employees/update', (req, res) => {
    const { employeeId, employeeName, jobRole, phoneNumber } = req.body;
    
    const query = `
        UPDATE Employees
        SET employeeName = ?, jobRole = ?, phoneNumber = ?
        WHERE employeeId = ?
    `;
    
    db.query(query, [employeeName, jobRole, phoneNumber, employeeId], (err) => {
        if (err) {
            console.error('Error updating employee:', err);
            res.status(500).send('Error updating employee');
            return;
        }
        
        res.json({ message: 'Employee updated successfully' });
    });
});

app.post('/api/employees/delete', (req, res) => {
    const { employeeId } = req.body;
    
    const query = `
        DELETE FROM Employees
        WHERE employeeId = ?
    `;
    
    db.query(query, [employeeId], (err) => {
        if (err) {
            console.error('Error deleting employee:', err);
            res.status(500).send('Error deleting employee');
            return;
        }
        
        res.json({ message: 'Employee deleted successfully' });
    });
});

// ASSIGNMENTS ENTITY
app.get('/api/assignments', (req, res) => {
    const query = `
        SELECT a.assignmentId, a.flightId, a.employeeId, e.employeeName, e.jobRole
        FROM Assignments a
        LEFT JOIN Employees e ON a.employeeId = e.employeeId
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching assignments:', err);
            res.status(500).send('Error fetching assignments');
            return;
        }
        
        res.json(results);
    });
});

app.post('/api/assignments', (req, res) => {
    const { flightId, employeeId } = req.body;
    
    const query = `
        INSERT INTO Assignments (flightId, employeeId)
        VALUES (?, ?)
    `;
    
    db.query(query, [flightId, employeeId], (err, result) => {
        if (err) {
            console.error('Error adding assignment:', err);
            res.status(500).send('Error adding assignment');
            return;
        }
        
        res.json({ id: result.insertId, message: 'Assignment added successfully' });
    });
});

app.post('/api/assignments/update', (req, res) => {
    const { assignmentId, flightId, employeeId } = req.body;
    
    const query = `
        UPDATE Assignments
        SET flightId = ?, employeeId = ?
        WHERE assignmentId = ?
    `;
    
    db.query(query, [flightId, employeeId, assignmentId], (err) => {
        if (err) {
            console.error('Error updating assignment:', err);
            res.status(500).send('Error updating assignment');
            return;
        }
        
        res.json({ message: 'Assignment updated successfully' });
    });
});

app.post('/api/assignments/delete', (req, res) => {
    const { assignmentId } = req.body;
    
    const query = `
        DELETE FROM Assignments
        WHERE assignmentId = ?
    `;
    
    db.query(query, [assignmentId], (err) => {
        if (err) {
            console.error('Error deleting assignment:', err);
            res.status(500).send('Error deleting assignment');
            return;
        }
        
        res.json({ message: 'Assignment deleted successfully' });
    });
});

// Get available flights for dropdowns
app.get('/api/flights-list', (req, res) => {
    const query = `
        SELECT f.flightId, f.departureAt, r.originAirport, r.destinationAirport
        FROM Flights f
        JOIN Routes r ON f.routeId = r.routeId
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching flights list:', err);
            res.status(500).send('Error fetching flights list');
            return;
        }
        
        res.json(results);
    });
});

// Get available seats for dropdowns
app.get('/api/seats-list', (req, res) => {
    const query = `
        SELECT s.seatId, s.seatNumber, s.seatClass, a.model
        FROM Seats s
        JOIN Aircraft a ON s.aircraftId = a.aircraftId
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching seats list:', err);
            res.status(500).send('Error fetching seats list');
            return;
        }
        
        res.json(results);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
