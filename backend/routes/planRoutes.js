import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Plan from '../models/PlanModel.js';
import { isAuth } from '../Utils.js';

const planRouter = express.Router();
planRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Plan({
      planItems: req.body.planItems.map((x) => ({ ...x, course: x._id })),
      user: req.user._id,
    });

    const plan = await newplan.save();
    res.status(201).send({ message: 'New Order Created', plan });
  })
);
export default planRouter;