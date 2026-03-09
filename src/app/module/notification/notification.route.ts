import { Router } from 'express';
import { notificationController } from './notification.controller.js';
import auth from '@app/middleware/auth.js';
import { USER_ROLE } from '../users/user.constants.js';

const router: Router = Router();

router.patch(
  '/',
  auth(
    USER_ROLE.dj,
    USER_ROLE.user,
    USER_ROLE.admin,
    USER_ROLE.merchant,
    USER_ROLE.sub_admin,
    USER_ROLE.organizer,
    USER_ROLE.super_admin,
  ),
  notificationController.readNotification,
);
router.delete(
  '/',
  auth(
    USER_ROLE.dj,
    USER_ROLE.user,
    USER_ROLE.admin,
    USER_ROLE.merchant,
    USER_ROLE.sub_admin,
    USER_ROLE.organizer,
    USER_ROLE.super_admin,
  ),
  notificationController.deleteNotification,
);
router.get(
  '/',
  auth(
    USER_ROLE.dj,
    USER_ROLE.user,
    USER_ROLE.admin,
    USER_ROLE.merchant,
    USER_ROLE.sub_admin,
    USER_ROLE.organizer,
    USER_ROLE.super_admin,
  ),
  notificationController.getNotification,
);

export const notificationRoutes = router;
