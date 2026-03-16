import { Router } from 'express';
import { notificationController } from './notification.controller.js';
import { USER_ROLE } from '../users/user.constants.js';
import auth from '@app/middleware/auth.js';

const router: Router = Router();

router.patch(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.sub_admin,
    USER_ROLE.super_admin,
    USER_ROLE.user,
    USER_ROLE.organizer,
    USER_ROLE.merchant,
    USER_ROLE.dj,
  ),
  notificationController.readNotification,
);
router.delete(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.sub_admin,
    USER_ROLE.super_admin,
    USER_ROLE.user,
    USER_ROLE.organizer,
    USER_ROLE.merchant,
    USER_ROLE.dj,
  ),
  notificationController.deleteNotification,
);
router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.sub_admin,
    USER_ROLE.super_admin,
    USER_ROLE.user,
    USER_ROLE.organizer,
    USER_ROLE.merchant,
    USER_ROLE.dj,
  ),
  notificationController.getNotification,
);

export const notificationRoutes = router;
