import httpStatus from 'http-status';
import type { Request, Response } from 'express';
import catchAsync from '@app/utils/catchAsync.js';
import sendResponse from '@app/utils/sendResponse.js';
import { followersService } from './followers.service.js';

const createFollowers = catchAsync(async (req: Request, res: Response) => {
  req.body['followerId'] = req.user.userId;
  const result = await followersService.createFollowers(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result?.message,
    data: result,
  });
});

const getMyFollowers = catchAsync(async (req: Request, res: Response) => {
  req.query['followerId'] = req?.user?.userId;
  const result = await followersService.getAllFollowers(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All followers fetched successfully',
    data: result,
  });
});

const getMyFollowing = catchAsync(async (req: Request, res: Response) => {
  req.query['followingId'] = req?.user?.userId;
  const result = await followersService.getAllFollowers(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All followers fetched successfully',
    data: result,
  });
});

export const followersController = {
  createFollowers,
  getMyFollowers,
  getMyFollowing,
};
