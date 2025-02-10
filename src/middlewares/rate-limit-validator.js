import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50, 
    message: {
        success: false,
        message: "Demasiadas solicitudes, por favor intente nuevamente más tarde."
    }
});

export default apiLimiter;