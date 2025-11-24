require('dotenv').config();         
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { sequelize, connectDB } = require('./src/db/sequelize');
const User = require('./src/models/user.model');
const authRoutes=require('./src/routes/auth.routes');
const passport=require('passport');
require('./src/middleware/passport')(passport);
const roleMiddleware = require('./src/middleware/role.middleware');
const Doctor = require('./src/models/doctor.model');
const AvailabilitySlot = require('./src/models/availability.model');
const doctorRoutes = require('./src/routes/doctor.routes');
const availabilityRoutes = require('./src/routes/availability.routes');
const consultationRoutes = require("./src/routes/consultation.routes");
const prescriptionRoutes = require("./src/routes/prescription.routes");
const paymentRoutes=require('./src/routes/payment.routes');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");
const path=require("path");
const rateLimit=require("express-rate-limit");


const app = express();

// Middleware
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));   // detailed logs, less noisy than 'dev'
} else {
  app.use(morgan("dev"));        // colorful short logs for development
}
app.use(express.json());           // parse JSON bodies
app.use(cors({
    origin: [`https://localhost:${process.env.PORT}`],
    credentials: true,
  }));  
app.use(express.urlencoded()); 
app.use(passport.initialize());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    limit: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: "Too many requests, please try again later", //Response to return after limit is reached.
  })
);

// A simple health-check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Basic root route
app.get('/', (req, res) => {
  res.send('Amrutam Telemedicine Backend - Hello 👋');
});

// connect to DB + Sync models
connectDB().then(() => {
  sequelize.sync({ alter: true }).then(() => {
    console.log('📦 All models synchronized including Doctor & AvailabilitySlot');
  });
});

app.use('/auth',authRoutes);
app.use('/doctors', doctorRoutes);

app.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
     res.json({ message: 'You accessed a protected route!', user: req.user });
  }
);



app.get('/admin-only',passport.authenticate('jwt',{session:false}),roleMiddleware('admin'),
    (req,res)=>{
        res.json({ message: 'Welcome Admin! You can access this route.', user: req.user });
    }
)
app.get('/doctor-only',passport.authenticate('jwt',{session:false}),roleMiddleware('doctor'),
    (req,res)=>{
        res.json({ message: 'Welcome Admin! You can access this route.', user: req.user });
    }
)
app.get('/patient-only',passport.authenticate('jwt',{session:false}),roleMiddleware('patient'),
    (req,res)=>{
        res.json({ message: 'Welcome Admin! You can access this route.', user: req.user });
    }
)

app.use('/availability', availabilityRoutes);
app.use("/consultations", consultationRoutes);
app.use("/prescriptions", prescriptionRoutes);
app.use("/payments",paymentRoutes);
if (process.env.NODE_ENV === "development") {
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
app.use(require("./src/middleware/error.middleware"));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./src/views'));

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT} (env: ${process.env.NODE_ENV || 'development'})`);
});


