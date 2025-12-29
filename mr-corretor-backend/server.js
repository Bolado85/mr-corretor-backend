const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const leadsFile = './data/leads.json';
const usersFile = './data/users.json';

app.post('/api/leads', (req, res) => {
  const leads = fs.existsSync(leadsFile) ? JSON.parse(fs.readFileSync(leadsFile)) : [];
  leads.push({ ...req.body, date: new Date() });
  fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
  res.json({ success: true });
});

app.get('/api/leads', (req, res) => {
  const leads = fs.existsSync(leadsFile) ? JSON.parse(fs.readFileSync(leadsFile)) : [];
  res.json(leads);
});

app.post('/api/auth/bootstrap', (req, res) => {
  fs.writeFileSync(usersFile, JSON.stringify([req.body], null, 2));
  res.json({ success: true });
});

app.post('/api/auth/login', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile));
  const user = users.find(u => u.email === req.body.email && u.password === req.body.password);
  res.json({ success: !!user });
});

app.listen(10000, () => console.log('Backend rodando'));
