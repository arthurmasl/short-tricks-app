import express from 'express';
import Item from '../models/Item';
import Category from '../models/Category';
import verifyToken from './verifyToken';
import { removeTrimmedVideo } from '../actions/removeFile';

const ItemsRoute = express.Router();

ItemsRoute.get('/item', async (req, res) => {
  const { _id } = req.body;
  const item = await Item.findById({ _id });

  res.json(item);
});

ItemsRoute.get('/items/:category', async (req, res) => {
  const { category } = req.params;

  try {
    const dbCategory = await Category.findOne({ name: category });

    if (dbCategory) {
      const itemsArr = dbCategory.items.map((i) => i.id);

      const items = await Item.find().where('_id').in(itemsArr).exec();

      res.json({ items, category: dbCategory });
    }
  } catch (error) {
    console.log(error);
  }
});

ItemsRoute.post('/item/like', verifyToken, async (req, res) => {
  const { user } = req;
  const { id } = req.body;

  const item = await Item.findById(id);

  if (!user.likes.includes(id)) {
    await user.likes.push(id);
    user.save();

    item.likes += 1;
    await item.save();
    console.log(`${user.name} liked item ${id}`);
  } else {
    user.likes = user.likes.filter((lid) => lid !== id);
    await user.save();

    item.likes -= 1;
    await item.save();
    console.log(`${user.name} disliked item ${id}`);
  }

  res.json({ user, item });
});

ItemsRoute.delete('/items/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  if (req.user.status !== 'moderator') return false;

  const item = await Item.findById(id);

  const { name, category, videos } = item;

  const dbCategory = await Category.findOne({ name: category });

  const newItems = dbCategory.items.filter((i) => String(i.id) !== String(id));
  dbCategory.items = newItems;
  await dbCategory.save();

  videos.forEach((video) => removeTrimmedVideo(video.url));

  await item.deleteOne({ _id: id });

  console.log(
    `${req.user.name} deleted item ${name} from category ${category}`
  );

  res.json('deleted');
});

export default ItemsRoute;
