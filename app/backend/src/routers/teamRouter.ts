import * as express from 'express';
import TeamController from '../controllers/TeamController';

const router = express.Router();

router.get('/', (req, res) => TeamController.getAll(req, res));
router.get('/:id', (req, res) => TeamController.getById(req, res));

export default router;
