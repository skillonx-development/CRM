import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import proposalRoutes from './routes/proposalRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import techProposalsRoutes from './routes/techProposalsRoutes.js';
import teachersRoute from './routes/teachersRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import institutionRoutes from "./routes/institutionRoutes.js"
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import stateDistrictRoutes from './routes/stateDistrictRoutes.js';
import exportRoutes from './routes/exportRoutes.js';
import csvImportRoutes from './routes/csvImportRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://skillonxcrm.netlify.app',
  'https://www.skillonxcrm.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// File upload serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes) //protected routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/tech/resources', resourceRoutes);
app.use('/api/tech-proposals', techProposalsRoutes);
app.use('/api/teachers', teachersRoute);
app.use('/api/invoice', invoiceRoutes)
app.use("/api/institution", institutionRoutes);
app.use('/api/state-districts', stateDistrictRoutes);
app.use('/api/export',exportRoutes);
app.use('/api/csv', csvImportRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
