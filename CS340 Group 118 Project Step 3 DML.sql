-- Project Group 118: Jack Mustonen, Katherine Pillsbury, Muhammed Akbar
-- Project Name: Fly Anywhere Airlines Flight Database

/*-----------------------*/
/*Select Statements Below*/
/*-----------------------*/

-- Selects all values from Flights
SELECT 
      flightId
    , departureAt
    , routeId
    , aircraftId
    , flightStatus
FROM Flights;
    
-- Selects information from the Routes table. 
SELECT 
      routeId
    , originAirport
    , destinationAirport
    , distanceKilometers
    , durationSeconds
FROM Routes;

-- Selects information from the Seats table
SELECT 
      seatId
    , seatNumber
    , seatClass
    , aircraftId
FROM Seats;

-- Selects information from the Aircraft table
SELECT 
      aircraftId
    , model
    , capacity
    , aircraftStatus
FROM Aircraft;

-- Selects information from the Assignments table
SELECT 
      assignmentId
    , flightId
    , employeeId
FROM Assignments;

-- Selects enhanced information from the Assignments table with employee details
SELECT 
      a.assignmentId
    , a.flightId
    , a.employeeId
    , e.employeeName
    , e.jobRole
FROM Assignments a
LEFT JOIN Employees e ON a.employeeId = e.employeeId;

-- Selects information from the Employees table
SELECT 
      employeeId
    , employeeName
    , jobRole
    , phoneNumber
FROM Employees;

-- Selects information from the Passengers table
SELECT 
      passengerId
    , name
    , emailAddress
    , phoneNumber
FROM Passengers;

-- Selects information from the Bookings table
SELECT 
      bookingId
    , flightId
    , seatId
    , passengerId
FROM Bookings;

-- Selects enhanced information from the Bookings table
SELECT 
      b.bookingId
    , b.flightId
    , b.seatId
    , b.passengerId
    , p.name
    , f.departureAt
    , s.seatNumber 
FROM Bookings b
LEFT JOIN Passengers p ON b.passengerId = p.passengerId
LEFT JOIN Flights f ON b.flightId = f.flightId
LEFT JOIN Seats s ON b.seatId = s.seatId;

-- Selects available flights with route information
SELECT 
      f.flightId
    , f.departureAt
    , r.originAirport
    , r.destinationAirport
FROM Flights f
JOIN Routes r ON f.routeId = r.routeId;

-- Selects available seats with aircraft information
SELECT 
      s.seatId
    , s.seatNumber
    , s.seatClass
    , a.model
FROM Seats s
JOIN Aircraft a ON s.aircraftId = a.aircraftId;

/*-----------------------*/
/*Insert Statements Below*/
/*-----------------------*/

-- Insert Flights Data from Form
INSERT INTO Flights (departureAt, routeId, aircraftId, flightStatus) 
VALUES (?, ?, ?, ?);

-- Insert Aircraft Data from Form
INSERT INTO Aircraft (model, capacity, aircraftStatus) 
VALUES (?, ?, ?);

-- Insert Routes Data from Form
INSERT INTO Routes (originAirport, destinationAirport, distanceKilometers, durationSeconds) 
VALUES (?, ?, ?, ?);

-- Insert Seats Data from Form
INSERT INTO Seats (aircraftId, seatNumber, seatClass) 
VALUES (?, ?, ?);

-- Insert Passengers Data from Form
INSERT INTO Passengers (name, emailAddress, phoneNumber) 
VALUES (?, ?, ?);

-- Insert Employees Data from Form
INSERT INTO Employees (employeeName, jobRole, phoneNumber) 
VALUES (?, ?, ?);

-- Insert Bookings Data from Form
INSERT INTO Bookings (flightId, seatId, passengerId) 
VALUES (?, ?, ?);

-- Insert Assignments Data from Form
INSERT INTO Assignments (flightId, employeeId) 
VALUES (?, ?);

/*-----------------------*/
/*Update Statements Below*/
/*-----------------------*/

-- Update Flights Data from Form
UPDATE Flights 
SET departureAt = ?, routeId = ?, aircraftId = ?, flightStatus = ?
WHERE flightId = ?;

-- Update Aircraft Data from Form
UPDATE Aircraft 
SET model = ?, capacity = ?, aircraftStatus = ?
WHERE aircraftId = ?;

-- Update Routes Data from Form
UPDATE Routes 
SET originAirport = ?, destinationAirport = ?, distanceKilometers = ?, durationSeconds = ?
WHERE routeId = ?;

-- Update Seats Data from Form
UPDATE Seats 
SET aircraftId = ?, seatNumber = ?, seatClass = ?
WHERE seatId = ?;

-- Update Passengers Data from Form
UPDATE Passengers 
SET name = ?, emailAddress = ?, phoneNumber = ?
WHERE passengerId = ?;

-- Update Employees Data from Form
UPDATE Employees 
SET employeeName = ?, jobRole = ?, phoneNumber = ?
WHERE employeeId = ?;

-- Update Bookings Data from Form
UPDATE Bookings
SET flightId = ?, seatId = ?, passengerId = ?
WHERE bookingId = ?;

-- Update Assignments Data from Form
UPDATE Assignments
SET flightId = ?, employeeId = ?
WHERE assignmentId = ?;

/*-----------------------*/
/*Delete Statements Below*/
/*-----------------------*/

-- Delete Flight Data from Selection
DELETE FROM Flights
WHERE flightId = ?;

-- Delete Aircraft Data from Selection
DELETE FROM Aircraft
WHERE aircraftId = ?;

-- Delete Routes Data from Selection
DELETE FROM Routes 
WHERE routeId = ?;

-- Delete Seats Data from Selection
DELETE FROM Seats
WHERE seatId = ?;

-- Delete Passengers Data from Selection
DELETE FROM Passengers
WHERE passengerId = ?;

-- Delete Employees Data from Selection
DELETE FROM Employees 
WHERE employeeId = ?;

-- Delete Bookings Data from Selection
DELETE FROM Bookings
WHERE bookingId = ?;

-- Delete Assignments Data from Selection
DELETE FROM Assignments
WHERE assignmentId = ?;