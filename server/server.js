const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inventorysys'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});


//data table
app.get('/api/materials', (req, res) => {
  const sql = 'SELECT * FROM materials';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching materials:', err);
      res.status(500).send('Error fetching materials');
      return;
    }
    res.json(result);
  });
});


//For subtracting 

app.post('/api/subtract', async (req, res) => {
  const { Items, Amounts } = req.body;

  if (!Items || !Amounts || Items.length !== Amounts.length) {
    return res.status(400).json({ success: false, message: 'Invalid data' });
  }

  try {
    await db.beginTransaction();

    for (let i = 0; i < Items.length; i++) {
      const updateSql = `
        UPDATE materials
        SET Amount = Amount - ?
        WHERE ItemName = ?`;
      const updateValues = [Amounts[i], Items[i]];

      await db.query(updateSql, updateValues);
    }

    await db.commit();

    console.log('Subtracted from inventory:', Items, Amounts);
    res.status(200).json({ success: true, message: 'Subtracted from inventory successfully' });
  } catch (error) {
    await db.rollback();
    console.error('Error subtracting from inventory:', error);
    res.status(500).json({ success: false, message: 'Error subtracting from inventory' });
  }
});


//

app.post('/api/projects', async (req, res) => {
  const { ProjectName, Items, Amounts, Text } = req.body;

  if (!ProjectName || !Items || !Amounts || !Text) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    await db.beginTransaction();

    // Loop through the selected items and subtract amounts
    for (let i = 0; i < Items.length; i++) {
      const updateSql = `
        UPDATE materials
        SET Amount = Amount - ?
        WHERE ItemName = ?`;
      const updateValues = [Amounts[i], Items[i]];

      await db.query(updateSql, updateValues);
    }

    // Insert project data into the projects table
    const insertSql = `
      INSERT INTO projects (ProjectName, Text)
      VALUES (?, ?)
    `;
    const insertValues = [ProjectName, Text];

    await db.query(insertSql, insertValues);

    await db.commit();

    console.log('Project added and inventory subtracted');
    res.status(201).json({ message: 'Project added and inventory subtracted' });
  } catch (error) {
    await db.rollback();
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error creating project' });
  }
});
//editing datatable

//admin users table
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM users';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Error fetching users');
      return;
    }
    res.json(result);
  });
});

// Change the endpoint to /api/projects instead of /api/practice
app.get('/api/projects', (req, res) => {
  const sql = 'SELECT * FROM projects';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching projectsdb:', err);
      res.status(500).send('Error fetching projectsdb');
      return;
    }
    res.json(result);
  });
});

//AddMaterils

app.post('/api/materials', (req, res) => {
  const { itemname, price, amount } = req.body;

  if (!itemname || !price || !amount) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const sql = `
    INSERT INTO materials (ItemName, Price, Amount)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE Price = VALUES(Price), Amount = Amount + VALUES(Amount)
  `;
  const values = [itemname, price, amount];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding/updating material:', err);
      return res.status(500).json({ message: 'Error adding/updating material' });
    }
    console.log('Material added/updated:', result);
    res.status(201).json({ message: 'Material added/updated successfully' });
  });
});

//create projects

app.post('/api/projectsdb', (req, res) => {
  const {
    ProjectName,
    item_1,
    item_1_amount,
    item_2,
    item_2_amount,
    item_3,
    item_3_amount,
    item_4,
    item_4_amount,
    item_5,
    item_5_amount,
    item_6,
    item_6_amount,
    item_7,
    item_7_amount,
    item_8,
    item_8_amount,
  } = req.body;

  if (
    !ProjectName ||
    !item_1 ||
    !item_1_amount ||
    !item_2 ||
    !item_2_amount ||
    !item_3 ||
    !item_3_amount ||
    !item_4 ||
    !item_4_amount ||
    !item_5 ||
    !item_5_amount ||
    !item_6 ||
    !item_6_amount ||
    !item_7 ||
    !item_7_amount ||
    !item_8 ||
    !item_8_amount
  ) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const sql =
    'INSERT INTO projectsdb (ProjectName, item_1, item_1_amount, item_2, item_2_amount, item_3, item_3_amount, item_4, item_4_amount, item_5, item_5_amount, item_6, item_6_amount, item_7, item_7_amount, item_8, item_8_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    ProjectName,
    item_1,
    item_1_amount,
    item_2,
    item_2_amount,
    item_3,
    item_3_amount,
    item_4,
    item_4_amount,
    item_5,
    item_5_amount,
    item_6,
    item_6_amount,
    item_7,
    item_7_amount,
    item_8,
    item_8_amount,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding project:', err);
      return res.status(500).json({ message: 'Error adding project' });
    }
    console.log('Project added:', result);
    res.status(201).json({ message: 'Project added successfully' });
  });
});
//register

// Register endpoint
app.post('/api/users', (req, res) => {
  const { username, password } = req.body;

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  const values = [username, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.json({ success: false });
      return;
    }
    console.log('User registered:', result);
    res.json({ success: true });
  });
});

//Admin
app.get('/api/users', (req, res) => {
  // Here, you can implement logic to check if the logged-in user is an admin.
  // You can use the username or any other identifier to determine admin status.
  const username = req.query.username; // Assuming you pass the username in the query parameter

  // For demonstration purposes, let's assume 'Admin' is an admin username
  const isAdmin = username === 'Admin';

  // Return the admin status as a JSON response
  res.json({ isAdmin });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  const values = [username, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error logging in:', err);
      res.json({ success: false });
      return;
    }

    if (result.length === 1) {
      if (username === 'Admin') {
        res.json({ success: true, isAdmin: true }); // Signal that the user is an admin
      } else {
        res.json({ success: true, isAdmin: false }); // Signal that the user is not an admin
      }
    } else {
      res.json({ success: false, isAdmin: false });
    }
  });
});

app.put('/api/materials/:id', (req, res) => {
  const materialId = req.params.id;
  const newAmount = req.body.amount;

  if (!materialId || !newAmount) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const sql = 'UPDATE materials SET Amount = ? WHERE id = ?';
  const values = [newAmount, materialId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating amount:', err);
      return res.status(500).json({ message: 'Error updating amount' });
    }
    console.log('Amount updated:', result);
    res.status(200).json({ message: 'Amount updated successfully' });
  });
});

//admin users editable

app.put('/api/materials/:id', (req, res) => {
  const materialId = req.params.id;
  const { ItemName, Price, Amount } = req.body;

  if (!materialId || !ItemName || Price === undefined || Amount === undefined) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const sql = 'UPDATE materials SET ItemName = ?, Price = ?, Amount = ? WHERE id = ?';
  const values = [ItemName, Price, Amount, materialId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating material:', err);
      return res.status(500).json({ message: 'Error updating material' });
    }
    console.log('Material updated:', result);
    res.status(200).json({ message: 'Material updated successfully' });
  });
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
