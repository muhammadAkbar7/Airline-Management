-- Project Group 118: Jack Mustonen, Katherine Pillsbury, Muhammed Akbar
-- Project Name: Fly Anywhere Airlines Flight Database

-- Disable foreign key checks and autocommit
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

/*Drop Tables*/
DROP TABLE IF EXISTS Assignments;
DROP TABLE IF EXISTS Bookings;
DROP TABLE IF EXISTS Seats;
DROP TABLE IF EXISTS Flights;
DROP TABLE IF EXISTS Aircraft;
DROP TABLE IF EXISTS Routes;
DROP TABLE IF EXISTS Passengers;
DROP TABLE IF EXISTS Employees;

/*Create Statements Below*/

-- Create Routes Table
CREATE TABLE Routes (
    routeId INT AUTO_INCREMENT PRIMARY KEY,
    originAirport VARCHAR(4) NOT NULL,
    destinationAirport VARCHAR(4) NOT NULL,
    distanceKilometers INT NOT NULL,
    durationSeconds INT NOT NULL
);

-- Create Aircraft Table
CREATE TABLE Aircraft (
    aircraftId INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(250) NOT NULL,
    capacity INT NOT NULL,
    aircraftStatus ENUM('active', 'maintenance', 'inactive') NOT NULL
);

-- Create Flights Table
-- In Routes table, a Route cannot be deleted if one or more flights depend on it. 
-- In Aircraft table, an aircraft cannot be deleted if one or more flights depend on it. 
CREATE TABLE Flights (
    flightId INT AUTO_INCREMENT PRIMARY KEY,
    departureAt DATETIME NOT NULL,
    routeId INT,
    aircraftId INT,
    flightStatus ENUM('scheduled', 'delayed', 'cancelled', 'in progress', 'completed') NOT NULL,
    FOREIGN KEY (routeId) REFERENCES Routes(routeId) ON DELETE RESTRICT,
    FOREIGN KEY (aircraftId) REFERENCES Aircraft(aircraftId) ON DELETE RESTRICT
);

-- Create Seats Table
CREATE TABLE Seats (
    seatId INT AUTO_INCREMENT PRIMARY KEY,
    aircraftId INT NOT NULL,
    seatNumber VARCHAR(10) NOT NULL,
    seatClass ENUM('economy', 'premium', 'business', 'first class') NOT NULL,
    FOREIGN KEY (aircraftId) REFERENCES Aircraft(aircraftId) ON DELETE CASCADE
);

-- Create Passengers Table
CREATE TABLE Passengers (
    passengerId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(1000) NOT NULL,
    emailAddress VARCHAR(320) NOT NULL,
    phoneNumber VARCHAR(20)
);

-- Create Employees Table
CREATE TABLE Employees (
    employeeId INT AUTO_INCREMENT PRIMARY KEY,
    employeeName VARCHAR(1000) NOT NULL,
    jobRole ENUM('pilot', 'copilot', 'flight attendant', 'engineer', 'tarmac') NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL
);

-- Create Bookings Table
CREATE TABLE Bookings (
    bookingId INT AUTO_INCREMENT PRIMARY KEY,
    flightId INT NOT NULL,
    seatId INT NOT NULL,
    passengerId INT,
    FOREIGN KEY (flightId) REFERENCES Flights(flightId) ON DELETE CASCADE,
    FOREIGN KEY (seatId) REFERENCES Seats(seatId) ON DELETE CASCADE,
    FOREIGN KEY (passengerId) REFERENCES Passengers(passengerId) ON DELETE CASCADE
);

-- Create Assignments Table
CREATE TABLE Assignments (
    assignmentId INT AUTO_INCREMENT PRIMARY KEY,
    flightId INT NOT NULL,
    employeeId INT NOT NULL,
    FOREIGN KEY (flightId) REFERENCES Flights(flightId) ON DELETE CASCADE,
    FOREIGN KEY (employeeId) REFERENCES Employees(employeeId) ON DELETE CASCADE
);

/*Insert Statements Below*/

-- Insert Routes Sample Data
INSERT INTO Routes (originAirport, destinationAirport, distanceKilometers, durationSeconds) VALUES 
('SEA', 'LAX', 1545, 9300),
('LAX', 'SFO', 543, 3600),
('SFO', 'SEA', 1094, 7200);

-- Insert Aircraft Sample Data
INSERT INTO Aircraft (model, capacity, aircraftStatus) VALUES 
('A220', 133, 'active'),
('A220', 133, 'active'),
('747', 467, 'maintenance');

-- Insert Flights Sample Data
INSERT INTO Flights (departureAt, routeId, aircraftId, flightStatus) VALUES 
('2024-12-31 00:00:00', 1, 1, 'completed'),
('2025-01-01 00:00:00', 1, 2, 'in progress'),
('2025-01-02 00:00:00', 2, 2, 'scheduled');

-- Insert Seats Sample Data
INSERT INTO Seats (aircraftId, seatNumber, seatClass) VALUES 
(1, '1A', 'first class'),
(1, '2A', 'first class'),
(3, '10B', 'economy'), 
(2, '1B', 'first class');

-- Insert Passengers Sample Data
INSERT INTO Passengers (name, emailAddress, phoneNumber) VALUES 
('Katherine Pillsbury', 'pillsk@gmail.com', '253-867-5309'),
('Jack Mustonen', 'jackmustonen123@gmail.com', '971-303-3385'),
('Muhammad Akbar', 'muhammadakbar@gmail.com', '923-453-3451');

-- Insert Employees Sample Data
INSERT INTO Employees (employeeName, jobRole, phoneNumber) VALUES 
('Rhonda Smith', 'pilot', '347-203-1967'),
('James Wilson', 'engineer', '347-204-1969'),
('Samuel Smith', 'flight attendant', '347-352-1964');

-- Insert Bookings Sample Data
INSERT INTO Bookings (flightId, seatId, passengerId) VALUES 
(1, 1, 1),
(1, 2, 2),
(3, 3, 1);

-- Insert Assignments Sample Data
INSERT INTO Assignments (flightId, employeeId) VALUES 
(1, 1),
(1, 2),
(3, 1),
(3, 3);

-- Reenable Foreign Key Checks and Commit
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;