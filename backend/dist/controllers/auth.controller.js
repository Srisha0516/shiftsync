"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenEndpoint = exports.employeeSignup = exports.inviteEmployee = exports.login = exports.registerManager = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const supabase_1 = require("../config/supabase");
const env_1 = require("../config/env");
const email_service_1 = require("../services/email.service");
const generateTokens = (userId, role, businessId) => {
    const accessToken = jsonwebtoken_1.default.sign({ userId, role, businessId }, env_1.config.jwt.accessSecret, { expiresIn: '15m' });
    const refreshToken = jsonwebtoken_1.default.sign({ userId, role, businessId }, env_1.config.jwt.refreshSecret, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};
const registerManager = async (req, res) => {
    try {
        const { email, password, full_name, business_name } = req.body;
        // Hash password
        const password_hash = await bcrypt_1.default.hash(password, 10);
        // Insert into Supabase
        // 1. Create Business First (or User First? User needs business_id, Business needs manager_id)
        // We'll create user first, then business, then update user.
        const userId = (0, uuid_1.v4)();
        const businessId = (0, uuid_1.v4)();
        // Insert Business
        const { error: bizErr } = await supabase_1.supabase.from('businesses').insert({
            id: businessId,
            name: business_name,
            manager_id: userId
        });
        if (bizErr)
            throw bizErr;
        // Insert User
        const { error: userErr } = await supabase_1.supabase.from('users').insert({
            id: userId,
            business_id: businessId,
            email,
            password_hash,
            full_name,
            role: 'manager'
        });
        if (userErr)
            throw userErr;
        const { accessToken, refreshToken } = generateTokens(userId, 'manager', businessId);
        res.status(201).json({ message: 'Manager registered successfully', accessToken, refreshToken });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.registerManager = registerManager;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data: user, error } = await supabase_1.supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();
        if (error || !user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isValid = await bcrypt_1.default.compare(password, user.password_hash);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const { accessToken, refreshToken } = generateTokens(user.id, user.role, user.business_id);
        res.json({ accessToken, refreshToken, user: { id: user.id, role: user.role, name: user.full_name } });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.login = login;
const inviteEmployee = async (req, res) => {
    try {
        const { email } = req.body;
        const manager = req.user;
        const inviteToken = jsonwebtoken_1.default.sign({ email, businessId: manager.businessId, role: 'employee' }, env_1.config.jwt.accessSecret, { expiresIn: '48h' });
        const inviteLink = `${env_1.config.frontendUrl}/signup?token=${inviteToken}`;
        await (0, email_service_1.sendEmail)(email, 'You are invited to ShiftSync', `Join your team by clicking: ${inviteLink}`);
        res.json({ message: 'Invite sent successfully', inviteLink });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.inviteEmployee = inviteEmployee;
const employeeSignup = async (req, res) => {
    try {
        const { token, password, full_name } = req.body;
        const decoded = jsonwebtoken_1.default.verify(token, env_1.config.jwt.accessSecret);
        const password_hash = await bcrypt_1.default.hash(password, 10);
        const userId = (0, uuid_1.v4)();
        const { error: userErr } = await supabase_1.supabase.from('users').insert({
            id: userId,
            business_id: decoded.businessId,
            email: decoded.email,
            password_hash,
            full_name,
            role: decoded.role
        });
        if (userErr)
            throw userErr;
        const { accessToken, refreshToken } = generateTokens(userId, decoded.role, decoded.businessId);
        res.status(201).json({ message: 'Account created successfully', accessToken, refreshToken });
    }
    catch (error) {
        res.status(500).json({ error: 'Invalid or expired invite token' });
    }
};
exports.employeeSignup = employeeSignup;
const refreshTokenEndpoint = async (req, res) => {
    const { token } = req.body;
    if (!token)
        return res.status(401).json({ error: 'Token required' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.config.jwt.refreshSecret);
        const payload = generateTokens(decoded.userId, decoded.role, decoded.businessId);
        res.json(payload);
    }
    catch (err) {
        res.status(403).json({ error: 'Invalid refresh token' });
    }
};
exports.refreshTokenEndpoint = refreshTokenEndpoint;
