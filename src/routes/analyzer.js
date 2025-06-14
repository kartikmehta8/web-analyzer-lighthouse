const express = require('express');
const { default: lighthouse } = require('lighthouse');
const puppeteer = require('puppeteer');

const router = express.Router();

router.post('/', async (req, res) => {
  const { url } = req.body;
  try {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--remote-debugging-port=9222'] });
    const report = await lighthouse(url, {
      port: 9222,
      output: 'html',
      logLevel: 'info',
    });

    await browser.close();
    res.render('result', { reportHtml: report.report });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to analyze the URL');
  }
});

module.exports = router;
