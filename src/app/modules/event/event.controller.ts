import catchAsync from '@app/utils/catchAsync'
import sendResponse from '@app/utils/sendResponse'
import httpStatus from 'http-status'
import { eventService } from './event.service'

const createEvent = catchAsync(async(req,res)=>{

const result = await eventService.createEvent(req.body)

sendResponse(res,{
statusCode:httpStatus.OK,
success:true,
message:"Event created successfully",
data:result
})

})

export const eventController = {
createEvent
}