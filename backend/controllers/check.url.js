// controllers/checkAccessibility.js
import puppeteer from 'puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';
import validator from 'validator';
import { createResult } from '../models/resultModel.js';
import { connectDB } from '../db.js';

export const checkAccessibility = async (req, res) => {
  try {
    await connectDB();
    const { url } = req.body;

    if (!url || !validator.isURL(url, { require_protocol: true })) {
      return res.status(400).json({ error: 'Valid URL with protocol (e.g., https://) is required' });
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 }).catch((err) => {
      throw new Error(`Failed to load URL: ${err.message}`);
    });

    const axe = new AxePuppeteer(page).withRules([
      'color-contrast',
      'image-alt',
      'link-name',
      'aria-roles',
    ]);
    const results = await axe.analyze();

    const violations = results.violations.map((v) => ({
      id: v.id,
      description: v.description,
      impact: v.impact,
      helpUrl: v.helpUrl,
    }));

    const result = await createResult({ url, violations });

    await browser.close();

    res.status(200).json({
      id: result.id,
      url: result.url,
      violations: result.violations,
      timestamp: result.timestamp,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  } catch (error) {
    console.error('Error in checkAccessibility:', error);
    res.status(500).json({ error: `Failed to check accessibility: ${error.message}` });
  }
};