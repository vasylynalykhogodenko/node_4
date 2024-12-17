const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const config = require('./config.json');
const db = require('./models/index')(Sequelize, config);
const express = require('express');

const app = express();

app.use(express.json());

// weapons
app.post('/weapons', async (req, res) => {
  try {
    const addWeapon = await db.weapons.create(req.body);

    res.status(201).json(addWeapon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/weapons', async (req, res) => {
  try {
    const allWeapons = await db.weapons.findAll();

    res.status(200).json(allWeapons);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/weapons/:id', async ({body, params}, res) => {
  try {
      await db.weapons.update(body, {
      where: {
        id: params.id,
      },
    });

    res.status(201).json(`Weapon id ${params.id} was succesfully updated!`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/weapons/:id', async ({params}, res) => {
  try {
      await db.weapons.destroy({
      where: {
        id: params.id,
      },
    });

    res.status(200).json(`Weapon id ${params.id} was succesfully deleted!`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// pizzas
app.post('/pizzas', async (req, res) => {
  try {
    const addPizza = await db.pizzas.create(req.body);

    res.status(201).json(addPizza);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/pizzas', async (req, res) => {
  try {
    const allPizzas = await db.pizzas.findAll();

    res.status(200).json(allPizzas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/pizzas/:id', async ({body, params}, res) => {
  try {
    const updatePizzas = await db.pizzas.update(body, {
      where: {
        id: params.id,
      },
    });

    res.status(201).json(updatePizzas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/pizzas/:id', async ({params}, res) => {
  try {
      await db.pizzas.destroy({
      where: {
        id: params.id,
      },
    });

    res.status(200).json(`Pizza with id ${params.id} was succesfully deleted!`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// turtles
app.post('/turtles', async (req, res) => {
  try {
    const addTurtle = await db.turtles.create(req.body);

    res.status(201).json(addTurtle);
  } catch (error) {
    console.error('Error creating turtle:', error);
    res.status(500).json({ error: 'Error creating turtle' });
  }
});

app.put('/turtles/:id', async ({body, params}, res) => {
  try {
      await db.turtles.update(body, {
      where: {
        id: params.id,
      },
    });

    res.status(201).json(`Turtle with id ${params.id} was succesfully updated!`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/turtles/:id', async ({params}, res) => {
  try {
      await db.turtles.destroy({
      where: {
        id: params.id,
      },
    });

    res.status(201).json(`Turtle with id ${params.id} was succesfully deleted!`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// task 1 Display all the Teenage Mutant Ninja Turtles
app.get('/turtles', async (req, res) => {
  try {
    const turtles = await db.turtles.findAll();

    res.status(200).json(turtles);
  } catch (error) {
    console.error('Error fetching turtles:', error);
    res.status(500).json({ error: 'Error fetching turtles' });
  }
});

// task 2 Display all the Teenage Mutant Ninja Turtles whose favorite pizza is "Mozzarella"
app.get('/turtles/mozzarella', async (req, res) => {
  try {
    const turtles = await db.turtles.findAll({
      where: {
        [Op.or]: [
          { firstFavoritePizzaId: { [Op.eq]: 3 } },
          { secondFavoritePizzaId: { [Op.eq]: 3 } }
        ]
      },
      include: [
        { model: db.pizzas, as: 'firstFavoritePizza' },
        { model: db.pizzas, as: 'secondFavoritePizza' },
      ]
    });

    res.status(200).json(turtles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// task 3 Display all pizzas marked as favorites without duplicates
app.get('/pizzas/favorite', async (req, res) => {
  try {
    const pizzas = await db.pizzas.findAll({
      include: [
        { model: db.turtles, as: 'firstFavoritePizza' },
        { model: db.turtles, as: 'secondFavoritePizza' },
      ],
      distinct: true,
    });

    res.status(200).json(pizzas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// task 4 Create a fifth turtle with your name and favorite color. Don't forget about weapons
app.post('/turtles', async (req, res) => {
  try {
    const addTurtle = await db.turtles.create({
      name: 'vasylyna',
      color: 'black',
      weaponId: 5,
      firstFavoritePizzaId: 1,
      secondFavoritePizzaId: 5,
    });

    res.status(201).json(addTurtle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// task 5 Update all pizzas with a calorie count greater than 3000 by adding "SUPER FAT!" to the description
app.post('/pizzas/superfat', async (req, res) => {
  try {
    const updatedCalories = await db.pizzas.update(
      {
        description: 'SUPER FAT!',
      },
      {
        where: { calories: { [Sequelize.Op.gt]: 3000 } }
      }
    );

    res.status(201).json({ message: `${updatedCalories} pizzas was succesfully updated!` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// task 6 Request the number of weapons with dps greater than 100
app.get('/weapons/highdps', async (req, res) => {
  try {
    const weapons = await db.weapons.count({
      where: {
        dps: { [Sequelize.Op.gt]: 100 }
      },
    });

    res.status(200).json(`Found ${weapons} weapons with dps greater than 100!`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// task 7 Find a pizza with id equal to 1
app.get('/pizzas/:id', async (req, res) => {
  try {
    const pizza = await db.pizzas.findOne({
      where: { id: req.params.id }
    });

    if (pizza) {
      res.status(200).json(pizza);
    } else {
      res.status(404).json({ message: 'Pizza not found' });
    }

  } catch (error) {
    console.error('Error fetching pizza:', error);
    res.status(500).json({ error: 'Error fetching pizza' });
  }
});

db.sequelize.sync({alter: true})
  .then(() => {
    console.log('Database and tables synchronized!');

    app.listen(3000, () => console.log('Server started'));
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });
