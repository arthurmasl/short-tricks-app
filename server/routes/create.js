import express from 'express';

import Item from '../models/Item';
import Category from '../models/Category';
import verifyToken from './verifyToken';
import { createVideo } from '../actions/createVideo';

const CreateRoute = express.Router();

const colors = ['#fdeff0', '#F5F4EF', '#F3EDED', '#E0E3FF'];

CreateRoute.post('/create', verifyToken, async (req, res) => {
  if (!req.user) res.status(400).send('invalid token');

  const { start, end, videoId, originalVideo, category, name } = req.body;

  const trimmedVideoId = await createVideo({ start, end, videoId });

  const item = new Item({
    videos: [{ url: trimmedVideoId, originalVideo }],
    category: category.trim().toLowerCase(),
    name: name.trim().toLowerCase(),
    start,
    end,
    likes: 0,
  });

  const savedItem = await item.save();

  let dbCategory = await Category.findOne({ name: savedItem.category });

  if (!dbCategory) {
    const cat = await Category.find();

    const newCategory = new Category({
      name: savedItem.category,
      items: [{ id: savedItem._id, name: savedItem.name }],
      // color: colors[Math.ceil(Math.random() * (colors.length - 1))],
      color: colors[cat.length % colors.length],
    });

    newCategory.save();
  } else {
    dbCategory.items.push({ id: savedItem._id, name: savedItem.name });
    dbCategory.save();
  }

  console.log(`${videoId}: item created`);

  res.json(savedItem);
});

export default CreateRoute;
