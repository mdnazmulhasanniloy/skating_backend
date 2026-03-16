

import catchAsync from './app/utils/catchAsync';
import { eventsService } from './events.service'; 
import sendResponse from './app/utils/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';


const createEvents = catchAsync(async (req: Request, res: Response) => {
 const result = await eventsService.createEvents(req.body);
  sendResponse(res, {
   statusCode: httpStatus.OK,
    success: true,
    message: 'Events created successfully',
    data: result,
  });

});

const getAllEvents = catchAsync(async (req: Request, res: Response) => {

 const result = await eventsService.getAllEvents(req.query);
  sendResponse(res, {
   statusCode: httpStatus.OK,
    success: true,
    message: 'All events fetched successfully',
    data: result,
  });

});

const getEventsById = catchAsync(async (req: Request, res: Response) => {
 const result = await eventsService.getEventsById(req.params.id);
  sendResponse(res, {
   statusCode: httpStatus.OK,
    success: true,
    message: 'Events fetched successfully',
    data: result,
  });

});
const updateEvents = catchAsync(async (req: Request, res: Response) => {
const result = await eventsService.updateEvents(req.params.id, req.body);
  sendResponse(res, {
   statusCode: httpStatus.OK,
    success: true,
    message: 'Events updated successfully',
    data: result,
  });

});


const deleteEvents = catchAsync(async (req: Request, res: Response) => {
 const result = await eventsService.deleteEvents(req.params.id);
  sendResponse(res, {
   statusCode: httpStatus.OK,
    success: true,
    message: 'Events deleted successfully',
    data: result,
  });

});

export const eventsController = {
  createEvents,
  getAllEvents,
  getEventsById,
  updateEvents,
  deleteEvents,
};