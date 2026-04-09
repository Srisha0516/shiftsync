import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../config/supabase';
import { config } from '../config/env';
import { sendEmail } from '../services/email.service';

const generateTokens = (userId: string, role: string, businessId: string) => {
  const accessToken = jwt.sign({ userId, role, businessId }, config.jwt.accessSecret, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId, role, businessId }, config.jwt.refreshSecret, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

export const registerManager = async (req: Request, res: Response) => {
  try {
    const { email, password, full_name, business_name } = req.body;
    
    // Hash password
    const password_hash = await bcrypt.hash(password, 10);
    
    // Insert into Supabase
    // 1. Create Business First (or User First? User needs business_id, Business needs manager_id)
    // We'll create user first, then business, then update user.
    const userId = uuidv4();
    const businessId = uuidv4();
    
    // Insert Business
    const { error: bizErr } = await supabase.from('businesses').insert({
      id: businessId,
      name: business_name,
      manager_id: userId
    });
    
    if (bizErr) throw bizErr;

    // Insert User
    const { error: userErr } = await supabase.from('users').insert({
      id: userId,
      business_id: businessId,
      email,
      password_hash,
      full_name,
      role: 'manager'
    });

    if (userErr) throw userErr;

    const { accessToken, refreshToken } = generateTokens(userId, 'manager', businessId);

    res.status(201).json({ message: 'Manager registered successfully', accessToken, refreshToken });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
      
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = generateTokens(user.id, user.role, user.business_id);

    res.json({ accessToken, refreshToken, user: { id: user.id, role: user.role, name: user.full_name } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const inviteEmployee = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const manager = (req as any).user;
    
    const inviteToken = jwt.sign(
      { email, businessId: manager.businessId, role: 'employee' },
      config.jwt.accessSecret,
      { expiresIn: '48h' }
    );
    
    const inviteLink = `${config.frontendUrl}/signup?token=${inviteToken}`;
    
    await sendEmail(email, 'You are invited to ShiftSync', `Join your team by clicking: ${inviteLink}`);
    
    res.json({ message: 'Invite sent successfully', inviteLink });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const employeeSignup = async (req: Request, res: Response) => {
  try {
    const { token, password, full_name } = req.body;
    
    const decoded: any = jwt.verify(token, config.jwt.accessSecret);
    
    const password_hash = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    
    const { error: userErr } = await supabase.from('users').insert({
      id: userId,
      business_id: decoded.businessId,
      email: decoded.email,
      password_hash,
      full_name,
      role: decoded.role
    });

    if (userErr) throw userErr;

    const { accessToken, refreshToken } = generateTokens(userId, decoded.role, decoded.businessId);

    res.status(201).json({ message: 'Account created successfully', accessToken, refreshToken });
  } catch (error: any) {
    res.status(500).json({ error: 'Invalid or expired invite token' });
  }
};

export const refreshTokenEndpoint = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ error: 'Token required' });
  
  try {
    const decoded: any = jwt.verify(token, config.jwt.refreshSecret);
    const payload = generateTokens(decoded.userId, decoded.role, decoded.businessId);
    res.json(payload);
  } catch (err) {
    res.status(403).json({ error: 'Invalid refresh token' });
  }
};
