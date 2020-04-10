import express from 'express';
import Category from '../models/Category';
import verifyToken from './verifyToken';
import Item from '../models/Item';
import { removeTrimmedVideo } from '../actions/removeFile';

const CategoriesRoute = express.Router();

CategoriesRoute.get('/categories', async (req, res) => {
  const categories = await Category.find();

  res.json(categories);
});

CategoriesRoute.delete('/categories/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  if (req.user.status !== 'moderator') return false;

  const dbCat = await Category.findById(id);
  const { name } = dbCat;

  dbCat.items.forEach(async (item) => {
    const dbItem = await Item.findById(item.id);

    if (dbItem.videos.length) {
      dbItem.videos.forEach((video) => {
        removeTrimmedVideo(video.url);
      });
    }
  });

  await Item.deleteMany({ category: name });
  await Category.deleteOne({ _id: id });

  console.log(`${req.user.name} deleted category ${name}`);

  res.json('deleted');
});

export default CategoriesRoute;
