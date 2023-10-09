// Middleware to check authentication
const authenticate = (request, response, next) => {
    const authHeader = request.headers.authorization;

    // Check if the Authorization header is present
    if (!authHeader) {
        return response.status(401).send('Unauthorized: Missing Authorization header');
    }

    // Extract the key and secret from the Authorization header
    const [key, secret] = authHeader.split(' ');

    // Check if the key and secret match the expected values
    if (key === process.env.KEY && secret === process.env.SECRET) {
        // Authentication successful
        next();
    } else {
        // Authentication failed
        return response.status(401).send('Unauthorized: Invalid key or secret');
    }
};

// Middleware to check origin and header
const checkHeader = (request, response, next) => {
    const requiredHeader = 'Same-Origin';

    // Check if the request is from the allowed domain
    if (request.get('Request-Origin-Header') === requiredHeader) {
        next(); // Continue to the next middleware or route handler
    } else {
        response.status(403).send('Forbidden'); // Not allowed
    }
};

module.exports = {
    authenticate,
    checkHeader,
};
