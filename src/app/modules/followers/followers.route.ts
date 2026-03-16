import { Router } from 'express';
import { followersController } from './followers.controller.js';
import auth from '@app/middleware/auth.js';
import { USER_ROLE } from '../users/user.constants.js';
import validateRequest from '@app/middleware/validateRequest.js';
import { followersValidation } from './followers.validation.js';

const router: Router = Router();

router.post(
  '/',
  auth(USER_ROLE.organizer, USER_ROLE.user, USER_ROLE.dj, USER_ROLE.merchant),
  validateRequest(followersValidation.createSchema),
  followersController.createFollowers,
);
router.get(
  '/my-followers',
  auth(USER_ROLE.organizer, USER_ROLE.user, USER_ROLE.dj, USER_ROLE.merchant),
  followersController.getMyFollowers,
);

router.get(
  '/my-followings',
  auth(USER_ROLE.organizer, USER_ROLE.user, USER_ROLE.dj, USER_ROLE.merchant),
  followersController.getMyFollowing,
);

export const followersRoutes = router;
